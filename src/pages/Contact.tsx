
import React from 'react';
import { Mail, Phone, MapPin, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Our Team</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Get in touch with the Hawaii Health Equity Index team for collaborations, 
            data access, or questions about our methodology.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
              To advance health equity in Hawaii by providing data-driven insights that empower 
              communities, policymakers, and healthcare providers to make informed decisions. 
              Through predictive analytics and community-focused research, we aim to identify 
              disparities, forecast trends, and support evidence-based interventions that 
              promote equitable health outcomes for all residents of Hawaii.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-blue-600" />
                <span>Contact Information</span>
              </CardTitle>
              <CardDescription>Reach out to us for inquiries and collaborations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">healthequity@hawaii.edu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600">(808) 956-8111</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">
                    University of Hawaii<br />
                    Public Health Sciences<br />
                    Honolulu, HI 96822
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Research Focus Areas</CardTitle>
              <CardDescription>Our key areas of expertise and investigation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Health disparities analysis across Hawaii's diverse communities</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                  <span>Socioeconomic factors affecting health outcomes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Predictive modeling for health policy planning</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <span>Community-based participatory research</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Research Team</CardTitle>
            <CardDescription className="text-center">
              Meet the researchers and data scientists behind this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  DR
                </div>
                <h3 className="font-semibold text-lg">Dr. Sarah Johnson</h3>
                <p className="text-gray-600 text-sm">Principal Investigator</p>
                <p className="text-gray-500 text-sm mt-1">Public Health Policy</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  MK
                </div>
                <h3 className="font-semibold text-lg">Dr. Michael Kim</h3>
                <p className="text-gray-600 text-sm">Data Science Lead</p>
                <p className="text-gray-500 text-sm mt-1">Biostatistics & ML</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  AP
                </div>
                <h3 className="font-semibold text-lg">Dr. Ana Patel</h3>
                <p className="text-gray-600 text-sm">Community Health Researcher</p>
                <p className="text-gray-500 text-sm mt-1">Health Disparities</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Collaborate With Us</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Whether you're a policymaker, healthcare provider, researcher, or community advocate, 
            we welcome partnerships that advance health equity in Hawaii.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Button variant="secondary" className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Send Email</span>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600 flex items-center space-x-2"
            >
              <Github className="w-5 h-5" />
              <span>View Research</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
