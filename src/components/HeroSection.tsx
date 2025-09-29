import React from 'react';
import { TrendingUp, Users, MapPin, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const goToDataPage = () => {
    navigate('/data');
  };

  return (
    <section className="bg-gradient-subtle py-20 pt-36 md:pt-28 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <div className="mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent text-lg font-semibold">
                ClinicDashHi
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Hawaii Health Equity
              <span className="bg-gradient-hero bg-clip-text text-transparent block">
                Index Forecast
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Predicting 2025 health equity outcomes at the ZIP code level using machine learning 
              to help policy makers and communities identify areas of concern and prioritize resource allocation.
            </p>
            <button 
              onClick={goToDataPage}
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover-lift shadow-glow"
            >
              Explore Interactive Map
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500&h=500&fit=crop" 
                alt="Earth globe showing global health connectivity" 
                className="w-96 h-96 rounded-full shadow-elegant object-cover hover-glow transition-smooth"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-card rounded-2xl shadow-elegant border border-border hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">ZIP Code Level</h3>
            <p className="text-muted-foreground text-sm">Granular analysis of health equity across Hawaii's diverse communities</p>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-elegant border border-border hover-lift">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">ML Powered</h3>
            <p className="text-muted-foreground text-sm">XGBoost algorithms process historical health and socioeconomic data</p>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-elegant border border-border hover-lift">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">2025 Forecast</h3>
            <p className="text-muted-foreground text-sm">Slope trend analysis projects future health equity changes</p>
          </div>

          <div className="text-center p-6 bg-card rounded-2xl shadow-elegant border border-border hover-lift">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Policy Impact</h3>
            <p className="text-muted-foreground text-sm">Actionable insights for resource allocation and intervention planning</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
