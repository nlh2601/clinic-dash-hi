import React from 'react';
import { Mail, Phone, MapPin, Github, ExternalLink, Users, Target, Lightbulb } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section id="hero" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're here to help! Reach out with any questions, feedback, or collaboration inquiries.
          </p>
        </section>

        <section id="contact-details" className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@healthequityhawaii.org</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-teal-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+1 (808) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-purple-500" />
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">123 Main Street, Honolulu, HI 96813</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <a href="https://github.com/nlh2601/hawaii-equity-compass-forecast-20/tree/main" target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Github className="w-6 h-6 text-gray-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">GitHub</h4>
                  <p className="text-sm text-gray-600">Source Code</p>
                </a>
              </div>
              <div className="text-center">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <ExternalLink className="w-6 h-6 text-gray-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Website</h4>
                  <p className="text-sm text-gray-600">Learn More</p>
                </a>
              </div>
              {/* Add more social links as needed */}
            </div>
          </div>
        </section>

        <section id="team" className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-500 mx-auto mt-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Dr. Alice Johnson</h4>
              <p className="text-sm text-gray-600">Lead Researcher</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                <Target className="w-12 h-12 text-gray-500 mx-auto mt-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Bob Williams</h4>
              <p className="text-sm text-gray-600">Data Scientist</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                <Lightbulb className="w-12 h-12 text-gray-500 mx-auto mt-6" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Eva Davis</h4>
              <p className="text-sm text-gray-600">Policy Advisor</p>
            </div>
          </div>
        </section>

        <section id="mission" className="bg-blue-50 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h3>
          <p className="text-blue-700 text-lg max-w-2xl mx-auto">
            To provide actionable insights and data-driven solutions for advancing health equity across Hawaii.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;
