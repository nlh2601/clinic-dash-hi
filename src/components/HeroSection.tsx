import React from 'react';
import { TrendingUp, Users, MapPin, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const goToDataPage = () => {
    navigate('/data');
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent text-lg font-semibold">
                ClinicDashHi
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Hawaii Health Equity
              <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent block">
                Index Forecast
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Predicting 2025 health equity outcomes at the ZIP code level using machine learning 
              to help policy makers and communities identify areas of concern and prioritize resource allocation.
            </p>
            <button 
              onClick={goToDataPage}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Explore Interactive Map
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500&h=500&fit=crop" 
                alt="Earth globe showing global health connectivity" 
                className="w-96 h-96 rounded-full shadow-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ZIP Code Level</h3>
            <p className="text-gray-600 text-sm">Granular analysis of health equity across Hawaii's diverse communities</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ML Powered</h3>
            <p className="text-gray-600 text-sm">XGBoost algorithms process historical health and socioeconomic data</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2025 Forecast</h3>
            <p className="text-gray-600 text-sm">Slope trend analysis projects future health equity changes</p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Impact</h3>
            <p className="text-gray-600 text-sm">Actionable insights for resource allocation and intervention planning</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
