
import React from 'react';
import { Mail, Phone, MapPin, Github, ExternalLink } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Reach out with any questions, feedback, or collaboration inquiries.
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@healthequityhawaii.org</p>
                  <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (808) 123-4567</p>
                  <p className="text-sm text-gray-500">Monday - Friday, 9 AM - 5 PM HST</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">123 Main Street<br />Honolulu, HI 96813</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Research Resources</h2>
            <div className="space-y-4">
              <a 
                href="https://github.com/nlh2601/hawaii-equity-compass-forecast-20/tree/main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Github className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Source Code</h3>
                  <p className="text-sm text-gray-600">View our open-source research tools</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
              
              <a 
                href="#" 
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Research Papers</h3>
                  <p className="text-sm text-gray-600">Access our published findings</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-r from-blue-600 to-teal-600 p-12 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Collaborate With Us</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Interested in partnering with us or contributing to our health equity research? 
            We welcome collaboration from researchers, policymakers, and community organizations.
          </p>
          <a 
            href="mailto:info@healthequityhawaii.org?subject=Collaboration Inquiry"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start a Conversation
          </a>
        </section>
      </div>
    </div>
  );
};

export default Contact;
