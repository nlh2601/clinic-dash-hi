
import React from 'react';
import { Target, Eye, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <div className="mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent text-lg font-semibold">
              ClinicDashHi
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Project
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Advancing health equity across Hawaii through data-driven insights and predictive modeling.
          </p>
        </section>

        {/* Hawaii Image Section */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1542259009477-d625272157b7?w=1200&h=400&fit=crop" 
              alt="Beautiful Hawaiian landscape with mountains and ocean" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-teal-900/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Health Equity in Paradise</h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Ensuring every community across Hawaii's beautiful islands has access to quality healthcare and resources.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide actionable insights and data-driven solutions for advancing health equity across Hawaii, 
              ensuring all communities have access to quality healthcare and resources needed for optimal health outcomes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              A Hawaii where health disparities are eliminated and every community thrives with equitable access 
              to healthcare, creating a healthier future for all residents and visitors.
            </p>
          </div>
        </div>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Predictive Analytics</h3>
                <p className="text-gray-600">
                  Using advanced machine learning models to forecast health equity trends and identify at-risk communities.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Impact</h3>
                <p className="text-gray-600">
                  Partnering with local organizations to implement data-driven solutions that directly benefit communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-blue-600 to-teal-600 p-12 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Together, we can create a more equitable healthcare system for all Hawaii residents.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Involved
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
