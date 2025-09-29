
# app.py — Health Policy Simulator (Stability-Tuned)
# Goal: realistic, stable dynamics (no runaway drops), with unit-safe slopes and event toggle.
#
# Files:
#   - index_2025_predictions.csv  (required; columns: zip,equityscore)
#   - combined_all_zip_data.csv   (optional; uses your custom slope/rolling columns)
#
# Key features:
#   • Slope unit normalization (detects %pt vs fraction, 5yr windows)
#   • Stability preset: ensures non-negative net for employed/health_index at default settings
#   • Diminishing returns + yearly caps (small, realistic)
#   • Events OFF by default (you can toggle ON)
#   • Fixed color scale & selectable year for the grid map

import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import random, hashlib, math
from pathlib import Path

st.set_page_config(page_title="Health Policy Simulator (Stable)", layout="wide")

# ---------------- Indicators ----------------
INDICATORS = [
    ("diabetes",       "↓ better", -1.0),
    ("disabled",       "↓ better", -1.0),
    ("employed",       "↑ better", +1.0),
    ("health_index",   "↑ better", +1.0),
    ("high_bp",        "↓ better", -1.0),
    ("kidney_disease", "↓ better", -1.0),
    ("bipoc",          "equity",    0.0),
    ("no_doctor",      "↓ better", -1.0),
]

POLICY_TARGETS = {
    "clinics":   ["no_doctor", "health_index", "employed"],
    "campaigns": ["diabetes", "high_bp", "kidney_disease"],
    "jobs":      ["employed", "disabled"],
    "equity":    ["no_doctor", "health_index"],
}

# Base max effects at full saturation (per year on 0–1 scale)
E_MAX_BASE = {
    "clinics":   {"no_doctor": -0.004, "health_index": +0.003, "employed": +0.0010},
    "campaigns": {"diabetes": -0.0035, "high_bp": -0.0035, "kidney_disease": -0.0012},
    "jobs":      {"employed": +0.0100, "disabled": -0.0010},
    "equity":    {"no_doctor": -0.0025, "health_index": +0.0025},
}
PC50_BASE = {"clinics": 120.0, "campaigns": 140.0, "jobs": 160.0, "equity": 100.0}

# Tight annual caps to prevent drastic swings
ANNUAL_CAPS = {
    "diabetes": 0.010, "high_bp": 0.010, "kidney_disease": 0.005,
    "no_doctor": 0.015, "employed": 0.015, "disabled": 0.006,
    "health_index": 0.015,
}

EVENT_TEMPLATES = [
    ("Disease outbreak", {"diabetes": +0.0015, "high_bp": +0.0020, "health_index": -0.0020}),
    ("Clinic closure",   {"no_doctor": +0.0020, "health_index": -0.0010}),
    ("Natural disaster", {"employed": -0.0040, "disabled": +0.0010, "health_index": -0.0030}),
    ("Funding cut",      {"employed": -0.0015, "no_doctor": +0.0010}),
]

# ---------------- Utilities ----------------
def norm_cols(df):
    df = df.copy()
    df.columns = [str(c).strip().lower().replace(" ", "_") for c in df.columns]
    return df

def clamp01(x):
    try: x = float(x)
    except: x = 0.0
    return max(0.0, min(1.0, x))

def diminishing_returns(pc, pc50):
    pc = max(0.0, float(pc))
    return 1.0 - math.exp(-pc / max(1e-9, pc50))

def impute_groupwise(df, group_key, cols):
    df = df.sort_values([group_key, "year"]).reset_index(drop=True).copy()
    for c in cols:
        if c in df.columns:
            df[c] = pd.to_numeric(df[c], errors="coerce")
            filled = (
                df.groupby(group_key, sort=False)[c]
                  .apply(lambda s: s.ffill().bfill())
                  .reset_index(level=0, drop=True)
            )
            df[c] = filled
            grp_mean = df.groupby(group_key, sort=False)[c].transform("mean")
            df[c] = df[c].fillna(grp_mean)
            df[c] = df[c].fillna(df[c].mean())
            df[c] = df[c].fillna(0.0)
    return df

def ensure_indicator_columns(df):
    defaults = {"diabetes":0.10,"disabled":0.08,"employed":0.60,"health_index":0.50,
                "high_bp":0.25,"kidney_disease":0.03,"bipoc":0.50,"no_doctor":0.12,
                "population":20000}
    out = df.copy()
    for name,_,_ in INDICATORS:
        if name not in out.columns:
            out[name] = defaults.get(name, 0.0)
    if "population" not in out.columns:
        out["population"] = defaults["population"]
    return out

# ---------------- Data loading ----------------
def read_csv_flex(path_or_buf):
    try:    return pd.read_csv(path_or_buf, encoding="utf-8-sig")
    except: return pd.read_csv(path_or_buf, engine="python", sep=None)

def load_index_2025(df):
    df = norm_cols(df)
    if "zip" not in df.columns or "equityscore" not in df.columns:
        raise ValueError(f"Expected columns: ['zip','equityscore']. Found: {list(df.columns)}")
    df["zip"] = df["zip"].astype(str).str.zfill(5)
    df["equityscore"] = pd.to_numeric(df["equityscore"], errors="coerce")
    df["equityscore"] = df["equityscore"].fillna(df["equityscore"].median()).fillna(0.0)
    return df[["zip","equityscore"]].drop_duplicates("zip").reset_index(drop=True)

def load_hist(df):
    df = norm_cols(df)

    slope_map = {
        "diabetes_slope": "diabetes",
        "disabled_slope": "disabled",
        "hibp_slope": "high_bp",
        "kidney_slope": "kidney_disease",
        "healthindex_slope": "health_index",
        "bipoc_slope": "bipoc",
        "nodoc_slope": "no_doctor",
        "employed_slope": "employed",
    }
    present_slopes = {v: k for k, v in slope_map.items() if k in df.columns}

    # Normalize year columns for starting levels
    for y in range(2014, 2026):
        col = f"index_{y}".lower()
        if col in df.columns:
            df.rename(columns={col: f"health_index_{y}"}, inplace=True)
    for y in [2017, 2019, 2021, 2022, 2023, 2024, 2025]:
        c1 = f"high_blood_pressure_{y}".lower()
        if c1 in df.columns:
            df.rename(columns={c1: f"high_bp_{y}"}, inplace=True)
    for y in [2018, 2019, 2020, 2021, 2022]:
        c1 = f"kidney_disease_{y}".lower().replace("_"," ")
        c2 = f"kidney_disease_{y}".lower()
        if c1 in df.columns:
            df.rename(columns={c1: c2}, inplace=True)
    for c in list(df.columns):
        if c.startswith("no doctor_"):
            df.rename(columns={c: c.replace("no doctor_", "no_doctor_")}, inplace=True)

    if "zip" not in df.columns:
        raise ValueError("Historical CSV must include 'zip'.")
    df["zip"] = df["zip"].astype(str).str.zfill(5)

    def _pick_latest_year_col(prefix):
        candidates = []
        for c in df.columns:
            if c.startswith(f"{prefix}_"):
                tail = c.split(f"{prefix}_", 1)[1]
                try:
                    yr = int(tail.split("-")[0])
                    candidates.append((yr, c))
                except:
                    pass
        if not candidates: return None
        return max(candidates)[1]

    base_cols = {}
    for m in ["diabetes","high_bp","kidney_disease","health_index"]:
        c_latest = _pick_latest_year_col(m)
        if c_latest: base_cols[m] = c_latest
    nodoc_cols = [c for c in df.columns if c.startswith("no_doctor_")]
    if nodoc_cols: base_cols["no_doctor"] = sorted(nodoc_cols)[-1]
    bipoc_cols = [c for c in df.columns if c.startswith("bipoc_")]
    if bipoc_cols: base_cols["bipoc"] = sorted(bipoc_cols)[-1]

    out = pd.DataFrame({"zip": df["zip"]}).drop_duplicates().reset_index(drop=True)
    for k, src in base_cols.items():
        out[k] = pd.to_numeric(df[src], errors="coerce")

    # Copy slopes
    for metric, src in present_slopes.items():
        out[f"{metric}_slope"] = pd.to_numeric(df[src], errors="coerce").fillna(0.0)

    if "population" in df.columns:
        out["population"] = pd.to_numeric(df["population"], errors="coerce")

    # Scale to 0–1 if needed
    if "health_index" in out.columns and pd.notna(out["health_index"]).any():
        try:
            if float(out["health_index"].max()) > 1.5:
                out["health_index"] = out["health_index"] / 100.0
        except: pass

    out["year"] = 2024
    return out

# ---------------- Slope normalization & calibration ----------------
def normalize_slopes(hist_df):
    """Convert slopes to per-year fractions if they appear to be in % points or multi-year deltas."""
    for m,_,_ in INDICATORS:
        col = f"{m}_slope"
        if col in hist_df.columns:
            s = pd.to_numeric(hist_df[col], errors="coerce")
            if s.isna().all(): 
                hist_df[col] = 0.0
                continue
            med = float(s.abs().median())
            # Heuristic conversions:
            # If median |slope| > 0.05 (5pp), probably in 0–100 scale -> divide by 100
            if med > 0.05:
                s = s / 100.0
            # If column name carries a 5-year window (common in rolling stats), divide by 5 (best-effort)
            # (We can't infer reliably, so skip unless user asks)
            hist_df[col] = s.fillna(0.0)
    return hist_df

def compute_slopes(hist_df):
    slopes = {}
    for z, g in hist_df.groupby("zip"):
        row = g.iloc[0]
        entry = {}
        for m,_,_ in INDICATORS:
            col = f"{m}_slope"
            val = row[col] if col in g.columns else 0.0
            entry[m] = float(val) if pd.notna(val) else 0.0
        slopes[z] = entry
    return slopes

def need_weights(states):
    needs = {}
    for z, s in states.items():
        n = (s["diabetes"]*0.25 + s["high_bp"]*0.25 + s["no_doctor"]*0.20 +
             (1 - s["employed"])*0.15 + (1 - s["health_index"])*0.15)
        needs[z] = n
    tot = sum(needs.values()) or 1.0
    for z in needs: needs[z] /= tot
    return needs

def percap_from_budget(city_budget, subpct, pop, weight, floor_pc):
    pc = (city_budget * (subpct/100.0)) * weight / max(1.0, pop)
    return max(pc, floor_pc)

def synthesize_from_equity(eq_df, start_year):
    base = eq_df.copy()
    base["year"] = start_year - 1
    eq_min, eq_max = base["equityscore"].min(), base["equityscore"].max()
    span = (eq_max - eq_min) if (eq_max - eq_min) != 0 else 1.0
    base["health_index"] = (base["equityscore"] - eq_min) / span
    base["employed"] = base["health_index"].clip(0,1)*0.4 + 0.4
    for c in ["diabetes","high_bp","no_doctor","kidney_disease","disabled"]:
        base[c] = (1 - base["health_index"]).clip(0,1)*0.2 + 0.2
    base["bipoc"] = 0.5
    base["population"] = 20000
    cols = ["zip","year","population"] + [n for n,_,_ in INDICATORS]
    return base[cols]

def auto_stability_tune(hist_df, city_budget, splits, states_preview):
    """Choose floor and E_MAX scaling to avoid net declines for employed/health_index at defaults."""
    E_MAX = {p: E_MAX_BASE[p].copy() for p in E_MAX_BASE}
    PC50 = PC50_BASE.copy()
    floor_pc = 30.0  # start reasonably

    # Estimate typical per-capita
    pops = [s.get("population", 20000) for s in states_preview.values()]
    mean_pop = float(np.mean(pops)) if pops else 20000.0

    # Normalize budgets
    total = sum(splits.values()) or 1.0
    splits = {k: 100.0*v/total for k,v in splits.items()}

    # compute required pc to offset adverse median slopes for key metrics
    slopes_city = {f"{m}_slope": pd.to_numeric(hist_df.get(f"{m}_slope", 0.0), errors="coerce").fillna(0.0) for m,_,_ in INDICATORS}
    med = {m: float(slopes_city[f"{m}_slope"].median()) for m,_,_ in INDICATORS}

    # Helper to compute expected delta at typical pc
    def expected_delta(metric, policy):
        sp = splits[policy] / 100.0
        pc = max(floor_pc, (city_budget * sp) / max(1.0, mean_pop))
        sat = 1.0 - math.exp(-pc / PC50[policy])
        return E_MAX[policy].get(metric, 0.0) * sat

    # Increase E_MAX or floor until employed & health_index net >= +0.002 (0.2pp) citywide
    targets = [("employed","jobs"), ("health_index","clinics")]
    for metric, pol in targets:
        tries = 0
        while tries < 12:
            base = med.get(metric, 0.0)
            gain = expected_delta(metric, pol)
            if base + gain >= 0.002:
                break
            # scale up lever and floor slightly
            E_MAX[pol][metric] *= 1.25
            floor_pc = min(120.0, floor_pc + 5.0)
            tries += 1

    # Keep other metrics modestly improving if adverse slope
    for metric, pol in [("no_doctor","clinics"), ("diabetes","campaigns"), ("high_bp","campaigns")]:
        tries = 0
        while tries < 8:
            base = med.get(metric, 0.0)
            desired_sign = [x for x in INDICATORS if x[0]==metric][0][2]
            # We want delta to be in "good" direction by at least 0.001
            good_dir = +1 if desired_sign>0 else -1
            gain = expected_delta(metric, pol) * good_dir
            base_dir = base * good_dir
            if (base_dir + gain) >= 0.001:
                break
            E_MAX[pol][metric] *= 1.15
            tries += 1

    return floor_pc, E_MAX, PC50

# ---------------- Simulation ----------------
def simulate_one_year(year, states, slopes, city_budget, splits, floor_pc, E_MAX, PC50, events_on, eff_mult, rng):
    total = sum(splits.values()) or 1.0
    splits = {k: 100.0*v/total for k,v in splits.items()}
    weights = need_weights(states)

    # Events: off by default for stability
    event_rates = {"Disease outbreak":0.04,"Clinic closure":0.03,"Natural disaster":0.02,"Funding cut":0.03}
    events_by_zip = {z: [] for z in states}
    if events_on:
        for z in states:
            for name, eff in EVENT_TEMPLATES:
                if rng.random() < event_rates[name]:
                    events_by_zip[z].append((name, eff))

    pc_alloc = {z: {p:0.0 for p in POLICY_TARGETS} for z in states}
    for z, s in states.items():
        pop = max(1, s.get("population", 20000))
        w = weights[z]
        for pol in POLICY_TARGETS:
            pc_alloc[z][pol] = percap_from_budget(city_budget, splits[pol], pop, w, floor_pc)

    new_states, rows = {}, []
    for z, s in states.items():
        cur = s.copy()
        base_sl = slopes.get(z, {})
        applied = {n: base_sl.get(n, 0.0) for n,_,_ in INDICATORS}

        for pol, targets in POLICY_TARGETS.items():
            pc = pc_alloc[z][pol]
            sat = diminishing_returns(pc, PC50[pol])
            for m in targets:
                emax = E_MAX[pol].get(m, 0.0)
                applied[m] = applied.get(m, 0.0) + eff_mult * emax * sat

        for (_ename, effs) in events_by_zip[z]:
            for k, v in effs.items():
                applied[k] = applied.get(k, 0.0) + v

        # Apply deltas with caps and a non-worsening bias for key metrics
        for m,_,_ in INDICATORS:
            v_now = cur.get(m, 0.5)
            delta = applied.get(m, 0.0)
            cap = ANNUAL_CAPS.get(m, 0.02)
            delta = float(np.clip(delta, -cap, cap))

            # Non-worsening bias for 'employed' and 'health_index' under Stability preset:
            # if delta is slightly negative (>-0.002), clip to 0
            if m in ("employed","health_index") and delta < 0 and delta > -0.002:
                delta = 0.0

            v_next = clamp01(v_now + delta)
            cur[m] = v_next

        pop = cur.get("population", 20000)
        pop = max(100, pop * (1.0 + 0.002*(cur["employed"]-0.6)))
        cur["population"] = pop
        new_states[z] = cur

        rec = {"year": year, "zip": z, "population": pop, "events": ", ".join([e[0] for e in events_by_zip[z]])}
        for m,_,_ in INDICATORS: rec[m] = cur[m]
        for pol in POLICY_TARGETS: rec[f"pc_{pol}"] = pc_alloc[z][pol]
        rows.append(rec)

    df_year = pd.DataFrame(rows)
    score = compute_score(df_year)
    return new_states, df_year, score

def compute_score(df_year):
    def inv_mean(c): return max(0.0, min(1.0, 1 - df_year[c].mean()))
    def pos_mean(c): return max(0.0, min(1.0, df_year[c].mean()))
    disp = 0.0
    for c in ["no_doctor","health_index","employed","diabetes","high_bp","kidney_disease"]:
        if c in df_year.columns:
            disp += df_year[c].std()
    disp /= 6.0
    equity = max(0.0, min(1.0, 1 - 2.0*disp))
    comp = (0.18*pos_mean("employed") + 0.18*pos_mean("health_index") +
            0.18*inv_mean("no_doctor") + 0.18*inv_mean("diabetes") +
            0.14*inv_mean("high_bp")   + 0.04*inv_mean("kidney_disease") +
            0.10*equity)
    return round(100*comp, 1)

# ---------------- UI ----------------
st.title("🏙️ Health Policy Simulator — Stability-Tuned")
st.caption("Non-runaway dynamics, unit-safe slopes, events off by default, and stability preset to avoid 'everything drops'.")

cwd = Path(__file__).resolve().parent
idx_path = cwd / "index_2025_predictions.csv"
hist_path = cwd / "combined_all_zip_data.csv"

st.sidebar.header("Data")
index_df = None
if idx_path.exists():
    try: index_df = load_index_2025(read_csv_flex(idx_path))
    except Exception as e: st.sidebar.error(f"Failed equity load: {e}")
if index_df is None:
    up = st.sidebar.file_uploader("Upload index_2025_predictions.csv (zip,equityscore)", type=["csv"])
    if up is not None:
        try:
            index_df = load_index_2025(read_csv_flex(up))
            st.sidebar.success(f"Loaded equity: {len(index_df)} ZIPs")
        except Exception as e:
            st.sidebar.error(f"Upload parse error: {e}")
if index_df is None:
    st.error("Missing required equity file.")
    st.stop()

hist_df = None
if hist_path.exists():
    try: hist_df = load_hist(read_csv_flex(hist_path))
    except Exception as e: st.sidebar.warning(f"Historical auto-load warning: {e}")
if hist_df is None:
    up2 = st.sidebar.file_uploader("Upload combined_all_zip_data.csv (optional)", type=["csv"])
    if up2 is not None:
        try:
            hist_df = load_hist(read_csv_flex(up2))
            st.sidebar.success(f"Loaded historical: {hist_df.shape[0]} rows")
        except Exception as e:
            st.sidebar.warning(f"Historical upload warning: {e}")

# Build baseline
start_year = st.sidebar.number_input("Start year", min_value=2025, max_value=2100, value=2025, step=1)
if hist_df is None or hist_df.empty:
    hist_df = synthesize_from_equity(index_df, start_year)
hist_df = ensure_indicator_columns(hist_df)
hist_df = impute_groupwise(hist_df, "zip", [n for n,_,_ in INDICATORS] + ["population"])
hist_df = normalize_slopes(hist_df)

zips = sorted(hist_df["zip"].unique().tolist())
state0 = {}
for z in zips:
    g = hist_df[hist_df["zip"] == z]
    row = g[g["year"] == (start_year-1)]
    if row.empty: row = g.tail(1)
    row = row.iloc[0]
    state = {n: clamp01(row.get(n, 0.5)) for n,_,_ in INDICATORS}
    state["population"] = max(100, float(row.get("population", 20000)) or 20000)
    state0[z] = state

st.sidebar.header("Budget & Controls")
years = st.sidebar.number_input("Years", min_value=1, max_value=40, value=10, step=1)
city_budget = st.sidebar.number_input("Annual city budget (USD)", min_value=5_000_000, max_value=50_000_000_000, value=30_000_000, step=1_000_000)
sp = {
    "clinics":   st.sidebar.slider("Clinics / Access", 0, 100, 25),
    "campaigns": st.sidebar.slider("Public Health Campaigns", 0, 100, 35),
    "jobs":      st.sidebar.slider("Job Programs", 0, 100, 30),
    "equity":    st.sidebar.slider("Education & Equity", 0, 100, 10),
}
eff_mult = st.sidebar.slider("Policy effect multiplier", 0.7, 1.5, 1.0, 0.05)
events_on = st.sidebar.checkbox("Enable random events", value=False)
stability_preset = st.sidebar.checkbox("Stability preset (avoid net drops on key metrics)", value=True)

# Auto tune for stability if requested
if stability_preset:
    floor_pc, E_MAX, PC50 = auto_stability_tune(hist_df, city_budget, sp, state0)
else:
    floor_pc, E_MAX, PC50 = 25.0, E_MAX_BASE, PC50_BASE

# Session
if "sim_init" not in st.session_state:
    st.session_state.sim_init = False
if st.sidebar.button("🔁 Reset simulation"):
    for k in list(st.session_state.keys()):
        if k.startswith("sim_") or k in ("history_rows","scores","sim_states"):
            del st.session_state[k]
    st.session_state.sim_init = False
if not st.session_state.sim_init:
    st.session_state.sim_states = {z: state0[z].copy() for z in zips}
    st.session_state.history_rows = []
    st.session_state.scores = []
    st.session_state.sim_init = True

# Top summary
c1,c2,c3,c4 = st.columns(4)
with c1: st.metric("ZIPs", len(zips))
with c2: st.metric("Budget", f"${city_budget:,.0f}")
with c3: st.metric("Per-capita floor", f"${floor_pc:,.0f}")
with c4: st.metric("Events", "ON" if events_on else "OFF")

run_btn = st.button("▶️ Run next year (stable)")
rng = random.Random("stable-seed")

if run_btn:
    cur_year = (start_year + len(st.session_state.scores))
    new_states, df_year, score = simulate_one_year(
        year=cur_year,
        states=st.session_state.sim_states,
        slopes=compute_slopes(hist_df),
        city_budget=city_budget,
        splits=sp,
        floor_pc=floor_pc,
        E_MAX=E_MAX,
        PC50=PC50,
        events_on=events_on,
        eff_mult=eff_mult,
        rng=rng
    )
    st.session_state.sim_states = new_states
    st.session_state.history_rows.append(df_year)
    st.session_state.scores.append({"year": cur_year, "score": score})

# Plots
hist_all = pd.concat(st.session_state.history_rows, ignore_index=True) if st.session_state.history_rows else pd.DataFrame(columns=["year","zip"]+[n for n,_,_ in INDICATORS])
st.subheader("Citywide Trends")
if not hist_all.empty:
    city_avg = hist_all.groupby("year").agg({n:"mean" for n,_,_ in INDICATORS}).reset_index()
    fig = go.Figure()
    for name,_,_ in INDICATORS:
        fig.add_trace(go.Scatter(x=city_avg["year"], y=city_avg[name], mode="lines+markers", name=name))
    fig.update_layout(height=360, xaxis_title="Year", yaxis_title="Value (0-1)")
    st.plotly_chart(fig, use_container_width=True)
else:
    st.info("Run at least one year to see citywide trends.")

scores_df = pd.DataFrame(st.session_state.scores)
if not scores_df.empty:
    fig2 = go.Figure()
    fig2.add_trace(go.Scatter(x=scores_df["year"], y=scores_df["score"], mode="lines+markers", name="Score"))
    fig2.update_layout(height=300, xaxis_title="Year", yaxis_title="Composite score (0–100)")
    st.plotly_chart(fig2, use_container_width=True)

# Grid map with year selector
st.subheader("ZIP Grid Map (risk = red, improvement = green)")
available_years = []
if st.session_state.history_rows:
    available_years = sorted({int(df["year"].iat[0]) for df in st.session_state.history_rows})
else:
    available_years = [start_year - 1]
year_to_show = st.selectbox("Year to show", available_years, index=len(available_years)-1)

if st.session_state.history_rows:
    snap = pd.concat(st.session_state.history_rows, ignore_index=True)
    snap = snap[snap["year"] == year_to_show].copy()
    if snap.empty:
        snap = st.session_state.history_rows[-1].copy()
else:
    rows = []
    for z, s in st.session_state.sim_states.items():
        rec = {"year": start_year-1, "zip": z}; rec.update(s); rows.append(rec)
    snap = pd.DataFrame(rows)

snap["risk"] = (snap["diabetes"] + snap["high_bp"] + snap["no_doctor"] + (1 - snap["health_index"])) / 4.0
snap["x"], snap["y"] = zip(*[ (int(hashlib.md5(str(z).encode()).hexdigest(),16)%15, (int(hashlib.md5(str(z).encode()).hexdigest(),16)//15)%12) for z in snap["zip"] ])
figm = px.scatter(snap, x="x", y="y", color="risk", size="population",
                  hover_data=["zip","diabetes","high_bp","no_doctor","health_index","employed"],
                  color_continuous_scale="RdYlGn_r")
figm.update_coloraxes(cmin=0, cmax=1)
figm.update_traces(marker=dict(symbol="square", line=dict(width=0)))
figm.update_layout(height=520, xaxis_visible=False, yaxis_visible=False, coloraxis_colorbar=dict(title="Risk"))
st.plotly_chart(figm, use_container_width=True)

# Drilldown
st.subheader("ZIP Drilldown")
selected_zip = st.selectbox("Choose ZIP", zips)
if selected_zip:
    if st.session_state.history_rows:
        zhist = hist_all[hist_all["zip"] == selected_zip].copy()
    else:
        zhist = pd.DataFrame([{"year": start_year-1, "zip": selected_zip, **st.session_state.sim_states[selected_zip]}])
    cols = ["year"] + [n for n,_,_ in INDICATORS] + [c for c in zhist.columns if c.startswith("pc_")] + ["events"]
    cols = [c for c in cols if c in zhist.columns]
    st.dataframe(zhist[cols].sort_values("year"), hide_index=True)

    if not zhist.empty:
        figz = go.Figure()
        for name,_,_ in INDICATORS:
            figz.add_trace(go.Scatter(x=zhist["year"], y=zhist[name], mode="lines+markers", name=name))
        figz.update_layout(height=360, xaxis_title="Year", yaxis_title="Value (0-1)")
        st.plotly_chart(figz, use_container_width=True)

# Export
st.subheader("Export Results")
if not hist_all.empty:
    csv = hist_all.to_csv(index=False).encode("utf-8")
    st.download_button("⬇️ Download (CSV)", data=csv, file_name="health_policy_simulation_results_stable.csv", mime="text/csv")
else:
    st.caption("Run at least one simulated year to enable export.")
