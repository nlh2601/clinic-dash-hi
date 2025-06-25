
import React from 'react';
import { Github, Mail, ExternalLink, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About This Project
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about our methodology, data sources, and the team behind 
            Hawaii's Health Equity Index forecasting platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Methodology</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Data Collection</h4>
                <p className="text-gray-600 text-sm">
                  Historical health and socioeconomic data from 2018-2023 across Hawaii's ZIP codes
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Trend Analysis</h4>
                <p className="text-gray-600 text-sm">
                  Slope-based trend projection to identify emerging patterns and trajectories
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Machine Learning</h4>
                <p className="text-gray-600 text-sm">
                  XGBoost ensemble model trained on 23 health and socioeconomic variables
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-1">Validation</h4>
                <p className="text-gray-600 text-sm">
                  Cross-validation and expert review to ensure prediction accuracy and relevance
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">ZIP-Level Precision</h4>
                <p className="text-sm text-gray-600">Granular community-level analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="w-6 h-6 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Interactive Maps</h4>
                <p className="text-sm text-gray-600">Folium-powered visualizations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Github className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Open Source</h4>
                <p className="text-sm text-gray-600">Transparent methodology</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Policy Focus</h4>
                <p className="text-sm text-gray-600">Actionable insights for decision-makers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            This project aims to support evidence-based health policy in Hawaii. 
            Collaborate with us or access the underlying data and methodology.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="https://github.com/nlh2601/hawaii-equity-compass-forecast-20/tree/main"
                target="_blank"
                rel="noopener noreferrer"
               >
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>View Source Code</span>
                </button>
              </a>
            <Link to="/contact">
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Contact Team</span>
              </button>
            </Link>
            <Link to="/data">
              <button className="bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Access Data</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
