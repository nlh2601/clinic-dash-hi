
import React, { useState } from 'react';
import { MapPin, Layers, Info, Download, X, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MapSection = () => {
  const [activeView, setActiveView] = useState('interactive');
  const [selectedYear, setSelectedYear] = useState('2025');
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

  const staticMapImages = {
    '2025': '/lovable-uploads/5895107d-8b66-4021-bae1-08e53eff8c9e.png',
    '2026': '/lovable-uploads/680b5d59-8680-40c4-95ab-874e5292452d.png'
  };

  return (
    <section id="map" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Interactive Health Equity Map
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore predicted Health Equity Index values across Hawaii's ZIP codes. 
            Darker colors indicate areas with greater health equity challenges.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setActiveView('interactive')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeView === 'interactive'
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Interactive Map</span>
                </button>
                <button
                  onClick={() => setActiveView('static')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeView === 'static'
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Static Overview</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
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
            {activeView === 'interactive' ? (
             <div className="h-96 md:h-[600px]">
                <iframe
                  src="/interactive_predicted_index_map_2025.html"
                  title="Predicted Health Equity Map 2025"
                  className="w-full h-full border-0 rounded-b-2xl"
                />
              </div>
            ) : (
              <div className="h-96 md:h-[600px] bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={staticMapImages[selectedYear as keyof typeof staticMapImages]}
                  alt={`Health Equity Index by ZIP (${selectedYear})`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                />
              </div>
            )}

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
        </div>

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
    </section>
  );
};

export default MapSection;
