
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download } from 'lucide-react';

interface ZipCodeData {
  zipCode: string;
  predicted2025: number;
  predicted2026: number;
  area: string;
  population: number;
}

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ZipCodeData>('zipCode');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Sample data - in a real app, this would come from an API
  const zipCodeData: ZipCodeData[] = [
    { zipCode: '96701', predicted2025: 45.2, predicted2026: 42.1, area: 'Hawaii County', population: 12500 },
    { zipCode: '96706', predicted2025: 38.7, predicted2026: 36.3, area: 'Hawaii County', population: 8900 },
    { zipCode: '96707', predicted2025: 52.1, predicted2026: 49.8, area: 'Hawaii County', population: 15200 },
    { zipCode: '96708', predicted2025: 41.3, predicted2026: 39.2, area: 'Hawaii County', population: 9800 },
    { zipCode: '96712', predicted2025: 35.6, predicted2026: 33.4, area: 'Hawaii County', population: 7600 },
    { zipCode: '96713', predicted2025: 48.9, predicted2026: 46.2, area: 'Hawaii County', population: 11400 },
    { zipCode: '96714', predicted2025: 44.1, predicted2026: 41.8, area: 'Hawaii County', population: 10200 },
    { zipCode: '96715', predicted2025: 39.8, predicted2026: 37.5, area: 'Hawaii County', population: 8700 },
    { zipCode: '96716', predicted2025: 46.7, predicted2026: 44.3, area: 'Hawaii County', population: 13100 },
    { zipCode: '96717', predicted2025: 42.5, predicted2026: 40.1, area: 'Hawaii County', population: 9500 },
    { zipCode: '96718', predicted2025: 37.2, predicted2026: 35.0, area: 'Hawaii County', population: 8200 },
    { zipCode: '96719', predicted2025: 50.3, predicted2026: 47.9, area: 'Hawaii County', population: 14600 },
    { zipCode: '96720', predicted2025: 43.8, predicted2026: 41.4, area: 'Hawaii County', population: 12800 },
    { zipCode: '96721', predicted2025: 40.6, predicted2026: 38.3, area: 'Hawaii County', population: 9100 },
    { zipCode: '96725', predicted2025: 36.9, predicted2026: 34.7, area: 'Hawaii County', population: 7900 }
  ];

  const filteredData = zipCodeData.filter(row =>
    row.zipCode.includes(searchTerm) ||
    row.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const handleSort = (field: keyof ZipCodeData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getEquityLevel = (value: number) => {
    if (value < 20) return { label: 'High', color: 'text-green-600 bg-green-50' };
    if (value < 50) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Low', color: 'text-red-600 bg-red-50' };
  };

  const downloadCSV = () => {
    const headers = ['ZIP Code', 'Area', 'Population', '2025 Prediction', '2026 Prediction', 'Equity Level 2025'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => [
        row.zipCode,
        row.area,
        row.population,
        row.predicted2025,
        row.predicted2026,
        getEquityLevel(row.predicted2025).label
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hawaii_health_equity_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">ZIP Code Predictions</h3>
            <p className="text-gray-600 text-sm">Health Equity Index predictions by ZIP code</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search ZIP codes or areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
              />
            </div>
            <button
              onClick={downloadCSV}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('zipCode')}
              >
                ZIP Code {sortField === 'zipCode' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('area')}
              >
                Area {sortField === 'area' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('population')}
              >
                Population {sortField === 'population' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('predicted2025')}
              >
                2025 Prediction {sortField === 'predicted2025' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('predicted2026')}
              >
                2026 Prediction {sortField === 'predicted2026' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead>Equity Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => {
              const equityLevel2025 = getEquityLevel(row.predicted2025);
              return (
                <TableRow key={row.zipCode} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{row.zipCode}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell className="text-right">{row.population.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.predicted2025.toFixed(1)}</TableCell>
                  <TableCell className="text-right">{row.predicted2026.toFixed(1)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${equityLevel2025.color}`}>
                      {equityLevel2025.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {sortedData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No data found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
