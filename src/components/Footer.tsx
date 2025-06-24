
import React from 'react';
import { MapPin, Github, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Hawaii Health Equity Index</h3>
                <p className="text-gray-400 text-sm">2025 Forecast & Visualization</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering data-driven health policy decisions through machine learning 
              and geographic visualization of health equity patterns across Hawaii.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Interactive Map</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Data Download</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Methodology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Source Code</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Data Sources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hawaii DOH</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">U.S. Census</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">CDC SVI</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">HRSA Data</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Hawaii Health Equity Index Project. Data used for research and policy analysis.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
