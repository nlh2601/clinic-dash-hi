
import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import NavigationBar from '../components/NavigationBar';

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Alice Johnson",
      role: "Lead Researcher & Project Director",
      bio: "Specializes in public health data analysis and health equity research with over 15 years of experience.",
      email: "alice.johnson@healthequityhawaii.org",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face",
      initials: "AJ"
    },
    {
      name: "Dr. Bob Williams",
      role: "Data Scientist & ML Engineer",
      bio: "Expert in machine learning and predictive modeling for healthcare applications and population health trends.",
      email: "bob.williams@healthequityhawaii.org",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face",
      initials: "BW"
    },
    {
      name: "Dr. Eva Davis",
      role: "Policy Advisor & Community Liaison",
      bio: "Focuses on translating research findings into actionable policy recommendations for improved health outcomes.",
      email: "eva.davis@healthequityhawaii.org",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&crop=face",
      initials: "ED"
    },
    {
      name: "Dr. Michael Chen",
      role: "Geographic Information Systems Specialist",
      bio: "Creates and maintains spatial analysis models to visualize health disparities across Hawaiian communities.",
      email: "michael.chen@healthequityhawaii.org",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop&crop=face",
      initials: "MC"
    },
    {
      name: "Dr. Sarah Nakamura",
      role: "Community Health Researcher",
      bio: "Conducts field research and community outreach to ensure our data reflects real community needs and experiences.",
      email: "sarah.nakamura@healthequityhawaii.org",
      image: "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop&crop=face",
      initials: "SN"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated researchers and experts working to advance health equity across Hawaii.
          </p>
        </section>

        {/* Team Photo Section */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop" 
              alt="Our team collaborating in a modern office environment" 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-teal-900/60 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Collaborative Research Excellence</h2>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                  Working together to create meaningful change in Hawaii's healthcare landscape through data-driven insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-teal-500 text-white">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-3">{member.role}</p>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
              
              <div className="flex items-center justify-center space-x-4">
                <a 
                  href={`mailto:${member.email}`}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href="#"
                  className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="#"
                  className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  title="Research Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-r from-blue-600 to-teal-600 p-12 rounded-2xl text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Research</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Interested in collaborating or contributing to our health equity research? We'd love to hear from you.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Team;
