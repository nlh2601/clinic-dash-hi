
import React from 'react';
import { Mail, Github, ExternalLink, Download, Instagram } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const handleDownloadFlyer = () => {
    const flyerContent = `
ClinicDashHi - Smarter Healthcare Access for Hawai'i
A Predictive Dashboard for Underserved Communities

Why ClinicDash HI?
• In Hawai'i, many rural and underserved areas still lack reliable access to health clinics, providers, and education.
• Decisions to send help are often made without clear data.
• ClinicDash HI provides areas on where to send help

How It Works:
• Uses real Hawai'i ZIP code data (population, locations, income, insurance rates, etc.)
• Trains a basic machine learning model to predict and score healthcare needed by code
• Outputs a map-based dashboard for non-profits to use when planning:
  - Mobile clinic routes
  - Tech health outreach
  - Health education events

Where is help needed most right now?
Interactive map showing Health Equity Index with color-coded areas indicating healthcare needs across Hawai'i ZIP codes.

Built by Students - Powered by Data.
We are a studented team combining computer science, healthcare passion, and local knowledge to make access smarter and equitable.

Want to Collaborate?
We're looking for:
• Non-profits & Clinics
• Mentors & Advisors
• Educators & Students

Contact info:
Email: clinicdashhi@gmail.com
Instagram: @808_clinicdashhi
Website: https://clinicdash-hi.lovable.app/

Hawaii Health Equity Index - 2025 Forecast
    `;
    
    const blob = new Blob([flyerContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clinicdashhi_hawaii_health_equity_flyer.txt';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Flyer Downloaded",
      description: "The ClinicDashHi project flyer has been downloaded to your device.",
    });
  };

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
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Reach out with any questions, feedback, or collaboration inquiries.
          </p>
        </section>

        {/* Contact Hero Image */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=400&fit=crop" 
              alt="Professional team ready to connect and collaborate" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Ready to discuss health equity research, share insights, or explore collaboration opportunities.
                </p>
              </div>
            </div>
          </div>
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
                  <p className="text-gray-600">clinicdashhi@gmail.com</p>
                  <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                  <a 
                    href="https://instagram.com/808_clinicdashhi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 transition-colors"
                  >
                    @808_clinicdashhi
                  </a>
                  <p className="text-sm text-gray-500">Follow us for updates and insights</p>
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
              
              <button 
                onClick={handleDownloadFlyer}
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors w-full"
              >
                <Download className="w-6 h-6 text-gray-600" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Project Flyer</h3>
                  <p className="text-sm text-gray-600">Download our research summary</p>
                </div>
                <Download className="w-4 h-4 text-gray-400 ml-auto" />
              </button>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-r from-blue-600 to-teal-600 p-12 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Collaborate With ClinicDashHi</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Interested in partnering with ClinicDashHi or contributing to our health equity research? 
            We welcome collaboration from researchers, policymakers, and community organizations.
          </p>
          <a 
            href="mailto:clinicdashhi@gmail.com?subject=ClinicDashHi%20Collaboration%20Inquiry&body=Hello,%0D%0A%0D%0AI%20am%20interested%20in%20collaborating%20on%20the%20ClinicDashHi%20Hawaii%20Health%20Equity%20Index%20project.%0D%0A%0D%0APlease%20let%20me%20know%20how%20we%20can%20work%20together.%0D%0A%0D%0AThank%20you!"
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
