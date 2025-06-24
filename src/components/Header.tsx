
import React from 'react';
import { MapPin, BarChart3, Info, Download } from 'lucide-react';

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hawaii Health Equity Index</h1>
              <p className="text-sm text-gray-600">2025 Forecast & Visualization</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('map')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>Interactive Map</span>
            </button>
            <button 
              onClick={() => scrollToSection('insights')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Data Insights</span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download Data</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
