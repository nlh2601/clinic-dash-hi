import React, { useState } from 'react';
import { BarChart3, Download, TrendingUp, Users, Activity, Info, X, Calculator } from 'lucide-react';
import NavigationBar from '../components/NavigationBar';
import DataTable from '../components/DataTable';
import PredictionsTable from '../components/PredictionsTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const Data = () => {
  const [showMapGuide, setShowMapGuide] = useState(false);
  const { toast } = useToast();

  const handleExportMap = () => {
    const link = document.createElement('a');
    link.href = '/interactive_predicted_index_map_2025.html';
    link.download = 'hawaii_health_equity_map_2025.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Map Downloaded",
      description: "The interactive map has been downloaded to your device.",
    });
  };

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

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="data">Datasets</TabsTrigger>
            <TabsTrigger value="maps">Interactive Maps</TabsTrigger>
            <TabsTrigger value="budgeting">Budgeting Simulation</TabsTrigger>
            <TabsTrigger value="simulator">Resource Simulator</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-16">
            {/* Data Visualization Hero Image */}
            <section>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop" 
                  alt="Data visualization and analytics dashboard" 
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Data-Driven Health Insights</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                      Transforming complex health data into actionable insights for better community outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
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

            {/* Methodology Section */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Methodology</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Collection</h3>
                  <p className="text-gray-600">
                    Our health equity index is constructed using multiple data sources including the U.S. Census Bureau, 
                    CDC Social Vulnerability Index, Hawaii Department of Health records, and HRSA data warehouse. 
                    We aggregate over 25 variables related to social determinants of health, healthcare access, 
                    and community resources.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Machine Learning Models</h3>
                  <p className="text-gray-600">
                    We employ ensemble methods including Random Forest, Gradient Boosting, and Neural Networks 
                    to predict future health equity trends. Our models are trained on historical data from 2015-2023 
                    and validated using cross-validation techniques with an average R² score of 0.87.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Index Calculation</h3>
                  <p className="text-gray-600">
                    The Health Equity Index ranges from 0-100, where lower scores indicate better health equity. 
                    Scores are calculated using weighted averages of normalized variables, with weights determined 
                    through principal component analysis and expert consultation with public health professionals.
                  </p>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="data" className="space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Datasets</h2>
              <div className="grid lg:grid-cols-2 gap-6 mb-16">
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

            {/* Predictions Table Section */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Equity Predictions 2025</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Machine learning predictions for health equity index values across Hawaii ZIP codes.
                </p>
              </div>
              <PredictionsTable />
            </section>

            {/* Data Table Section */}
            <section>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Health Equity Dataset</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Comprehensive dataset with health indicators and demographic information for Hawaii ZIP codes.
                </p>
              </div>
              <DataTable />
            </section>
          </TabsContent>

          <TabsContent value="maps" className="space-y-16">
            {/* Interactive Map Section */}
            <section className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Interactive Health Equity Map</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Explore predicted Health Equity Index values across Hawaii's ZIP codes. 
                  Darker colors indicate areas with greater health equity challenges.
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowMapGuide(true)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Info className="w-4 h-4" />
                      <span>Map Guide</span>
                    </button>
                    <button 
                      onClick={handleExportMap}
                      className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Map</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="h-96 md:h-[600px]">
                  <iframe
                    src="/interactive_predicted_index_map_2025.html"
                    title="Predicted Health Equity Map 2025"
                    className="w-full h-full border-0 rounded-b-2xl"
                  />
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Health Equity Index</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                      <span className="text-sm text-gray-600">High Equity (0.0–19.9)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-pink-200 rounded"></div>
                      <span className="text-sm text-gray-600">Medium Equity (20.0–49.9)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-600">Low Equity (50.0-100.0)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="budgeting" className="space-y-16">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Budgeting Simulation</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Interactive tools to simulate budget allocations and their projected impact on health equity outcomes.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
                <p className="text-gray-600">
                  We're developing an advanced budgeting simulation tool that will allow you to:
                </p>
                <ul className="text-gray-600 mt-4 space-y-2 text-left max-w-md mx-auto">
                  <li>• Model different funding scenarios</li>
                  <li>• Predict impact on health equity metrics</li>
                  <li>• Compare intervention strategies</li>
                  <li>• Generate budget recommendations</li>
                </ul>
                <div className="mt-6">
                  <p className="text-sm text-gray-500">
                    This feature will integrate Python-based simulation models for real-time budget analysis.
                  </p>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-16">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Health Policy Resource Simulator</h2>
                </div>
                <p className="text-gray-600 mb-6">
                  Interactive simulation tool for budget allocation across health policy categories. 
                  Explore how different funding strategies impact health equity indicators across Hawaii ZIP codes.
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold">Features:</span> Budget Allocation • Health Indicators • ZIP Code Analysis • Export Results
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a 
                      href="https://clinic-dash-simulation.streamlit.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <span>Open in New Tab</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="h-[800px]">
                  <iframe
                    src="https://clinic-dash-simulation.streamlit.app/?embedded=true"
                    title="Health Policy Resource Simulator"
                    className="w-full h-full border-0"
                    allow="clipboard-write"
                  />
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use the Simulator</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Policy Categories</h4>
                    <ul className="space-y-1">
                      <li>• <strong>Clinics:</strong> Healthcare facility investments</li>
                      <li>• <strong>Campaigns:</strong> Public health awareness programs</li>
                      <li>• <strong>Jobs:</strong> Employment and economic development</li>
                      <li>• <strong>Equity:</strong> Social determinants interventions</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Health Indicators</h4>
                    <ul className="space-y-1">
                      <li>• Diabetes prevalence and management</li>
                      <li>• Employment rates and stability</li>
                      <li>• Overall health equity index</li>
                      <li>• Community health outcomes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>

        {/* Map Guide Modal */}
        {showMapGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowMapGuide(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">How to Use the Map</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Navigate and interact with the Health Equity Index map effectively:
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Zoom</h4>
                    <p className="text-sm text-gray-600">Scroll to zoom in and out of the map</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">View Statistics</h4>
                    <p className="text-sm text-gray-600">Hover over ZIP codes to see detailed health equity statistics</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Navigate</h4>
                    <p className="text-sm text-gray-600">Click and drag to pan around different areas of Hawaii</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-semibold text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Color Legend</h4>
                    <p className="text-sm text-gray-600">Use the legend in the bottom-right to understand color coding</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowMapGuide(false)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
