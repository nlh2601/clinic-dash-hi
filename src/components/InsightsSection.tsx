
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';

const InsightsSection = () => {
  const keyFindings = [
    {
      icon: AlertTriangle,
      title: "High-Risk Areas Identified",
      value: "23 ZIP codes",
      description: "Predicted to have Health Equity Index below 0.4 in 2025",
      trend: "concern",
      color: "red"
    },
    {
      icon: TrendingUp,
      title: "Improving Communities",
      value: "31 ZIP codes",
      description: "Show positive health equity trends over the forecast period",
      trend: "positive",
      color: "green"
    },
    {
      icon: TrendingDown,
      title: "Areas of Decline",
      value: "12 ZIP codes",
      description: "Require immediate policy intervention and resource allocation",
      trend: "negative",
      color: "orange"
    },
    {
      icon: Target,
      title: "Priority Targets",
      value: "8 communities",
      description: "Rural and underserved areas with the greatest predicted impact",
      trend: "focus",
      color: "blue"
    }
  ];

  return (
    <section id="insights" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Key Data Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our machine learning analysis reveals critical patterns in Hawaii's health equity landscape, 
            providing actionable insights for targeted interventions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {keyFindings.map((finding, index) => {
            const IconComponent = finding.icon;
            const colorClasses = {
              red: "bg-red-100 text-red-600 border-red-200",
              green: "bg-green-100 text-green-600 border-green-200",
              orange: "bg-orange-100 text-orange-600 border-orange-200",
              blue: "bg-blue-100 text-blue-600 border-blue-200"
            };

            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[finding.color as keyof typeof colorClasses]}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="mb-2">
                  <span className="text-2xl font-bold text-gray-900">{finding.value}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{finding.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{finding.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Model Performance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">XGBoost Accuracy</span>
                <span className="text-xl font-semibold text-blue-600">87.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cross-Validation Score</span>
                <span className="text-xl font-semibold text-teal-600">0.841</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Training Data Points</span>
                <span className="text-xl font-semibold text-gray-900">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Feature Variables</span>
                <span className="text-xl font-semibold text-gray-900">23</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Data Sources</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Hawaii Department of Health</p>
                  <p className="text-sm text-gray-600">Chronic disease prevalence, healthcare access metrics</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">U.S. Census Bureau</p>
                  <p className="text-sm text-gray-600">Socioeconomic indicators, demographic data</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">CDC Social Vulnerability Index</p>
                  <p className="text-sm text-gray-600">Community resilience and risk factors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
