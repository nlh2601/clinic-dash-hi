
import React from 'react';
import NavigationBar from '../components/NavigationBar';
import HeroSection from '../components/HeroSection';
import MapSection from '../components/MapSection';
import InsightsSection from '../components/InsightsSection';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <HeroSection />
      <MapSection />
      <InsightsSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
