
import React from 'react';
import { BarChart3, Download, Map, TrendingUp, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const Data = () => {
  const datasets = [
    {
      title: "Health Equity Index 2025",
      description: "Comprehensive health equity measurements across Hawaiian islands",
      icon: Activity,
      status: "Latest",
      lastUpdated: "December 2024"
    },
    {
      title: "Community Health Metrics",
      description: "Population health indicators by district and demographic",
      icon: Users,
      status: "Updated",
      lastUpdated: "November 2024"
    },
    {
      title: "Healthcare Access Patterns",
      description: "Geographic analysis of healthcare facility accessibility",
      icon: Map,
      status: "Analysis",
      lastUpdated: "October 2024"
    }
  ];

  const insights = [
    {
      metric: "Health Equity Score",
      value: "72.4",
      change: "+3.2%",
      trend: "up"
    },
    {
      metric: "Healthcare Access",
      value: "68.1%",
      change: "+1.8%",
      trend: "up"
    },
    {
      metric: "Community Coverage",
      value: "89.5%",
      change: "+0.9%",
      trend: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Data & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive health equity data and predictive analytics for Hawaii communities.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{insight.metric}</h3>
                <TrendingUp className={`w-4 h-4 ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-900">{insight.value}</span>
                <span className={`text-sm font-medium ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {insight.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Datasets</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {datasets.map((dataset, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <dataset.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {dataset.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{dataset.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Updated: {dataset.lastUpdated}</span>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Interactive Map</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Explore our interactive health equity map to visualize data patterns across Hawaiian communities.
          </p>
          <div className="bg-gray-100 h-64 rounded-xl flex items-center justify-center mb-6">
            <div className="text-center">
              <Map className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive map visualization</p>
            </div>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>View Full Map</span>
            <Map className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Data;
