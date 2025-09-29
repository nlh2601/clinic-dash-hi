
import React from 'react';
import { MapPin, Home, Info, Mail, BarChart3, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/data', label: 'Data', icon: BarChart3 },
    { path: '/team', label: 'Team', icon: Users },
    { path: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md shadow-elegant border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ClinicDashHi</h1>
              <p className="text-sm text-muted-foreground">Hawaii Health Equity Index - 2025 Forecast</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth hover-lift ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground font-semibold shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
