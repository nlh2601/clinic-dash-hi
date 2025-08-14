ClinicDash HI 🏥🌺
A prototype machine learning-powered health equity dashboard for Hawaii, visualizing and predicting access to care by ZIP code.

📌 Overview
ClinicDash HI maps healthcare equity across Hawaii using public health data, ZIP-level statistics, and machine learning (XGBoost). It helps nonprofits, clinics, and policymakers visualize which communities are underserved — and how that may change over time.

🏝️ Built with:

XGBoost regression for predictive modeling

Geopandas & Folium for interactive maps

Public datasets from ACS, CDC PLACES, Hawaii Health Matters, and more

ZIP-level slope trends over time

🧠 Project Goal
To identify where healthcare access is limited in Hawaii — and provide nonprofits or clinics with an easy-to-use dashboard that helps them make data-informed decisions.

🚀 Features
📊 Health equity index per ZIP code, from 2014–2025 (projected)

📈 Slopes calculated over time for diabetes, employment, disability, etc.

📍 Interactive Folium choropleth map

💡 Insights on most at-risk ZIPs

🤖 XGBoost model trained and validated on real data

📉 Model Performance
✅ R² Score: 0.65

📉 RMSE: 16.58

🔢 83 ZIPs compared (2025 prediction vs. actual index)

🧪 Methodology
Slope Calculation: Used linear regression to model trends for each ZIP over time across variables like diabetes, employment, disability, etc.

Prediction: Trained an XGBoost regressor on slope and 2024 values to predict the 2025 health equity index.

Evaluation: Compared predictions with 2025 ground truth from "generated.csv".

Data Used: https://drive.google.com/drive/folders/1FQByYa9tuVZwGRNsiWEm5aJhPNJP7eep?usp=sharing

📚 Data Sources
U.S. Census American Community Survey (ACS)

CDC PLACES Project

Hawaii Health Matters

Health Equity Index data (custom assembled)

👥 Team
ClinicDash HI was created by a student passionate about medicine, health equity, and data science.

Contributors:

Nathanael Hui
Jiho Sung
Ty Sunahara
Johnny Chen
Taiko Tyau

📬 Contact
If you're a clinic, nonprofit, or policymaker interested in partnering or building on this project, please reach out at:

📧 clinicdashhi@gmail.com
