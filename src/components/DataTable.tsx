import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Download } from 'lucide-react';

interface ZipCodeData {
  zipCode: string;
  predicted2025: number;
  area: string;
  population: number;
  diabetes2022: number;
  diabetes2021: number;
  highBloodPressure2021: number;
  kidneyDisease2021: number;
  employmentRate: number;
  disabilityRate: number;
}

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof ZipCodeData>('zipCode');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Updated data with all the new CSV data
  const zipCodeData: ZipCodeData[] = [
    { zipCode: '96701', predicted2025: 3.0, area: 'Hawaii County', population: 12500, diabetes2022: 13.4, diabetes2021: 10.5, highBloodPressure2021: 31.4, kidneyDisease2021: 2.8, employmentRate: 54.8, disabilityRate: 12.3 },
    { zipCode: '96703', predicted2025: 15.1, area: 'Hawaii County', population: 8900, diabetes2022: 13.3, diabetes2021: 10.5, highBloodPressure2021: 31.5, kidneyDisease2021: 3.1, employmentRate: 50.5, disabilityRate: 12.5 },
    { zipCode: '96704', predicted2025: 70.9, area: 'Hawaii County', population: 15200, diabetes2022: 12.2, diabetes2021: 10.3, highBloodPressure2021: 33.5, kidneyDisease2021: 3.2, employmentRate: 54.7, disabilityRate: 11.7 },
    { zipCode: '96705', predicted2025: 7.3, area: 'Hawaii County', population: 9800, diabetes2022: 12.8, diabetes2021: 9.9, highBloodPressure2021: 27.2, kidneyDisease2021: 2.8, employmentRate: 71.5, disabilityRate: 10.3 },
    { zipCode: '96706', predicted2025: 3.4, area: 'Hawaii County', population: 7600, diabetes2022: 11.2, diabetes2021: 8.5, highBloodPressure2021: 26.7, kidneyDisease2021: 2.3, employmentRate: 61.5, disabilityRate: 11.2 },
    { zipCode: '96707', predicted2025: 6.2, area: 'Hawaii County', population: 11400, diabetes2022: 11.4, diabetes2021: 8.0, highBloodPressure2021: 27.4, kidneyDisease2021: 2.3, employmentRate: 61.3, disabilityRate: 10.0 },
    { zipCode: '96708', predicted2025: 35.6, area: 'Hawaii County', population: 10200, diabetes2022: 10.3, diabetes2021: 7.0, highBloodPressure2021: 26.5, kidneyDisease2021: 2.6, employmentRate: 61.3, disabilityRate: 8.2 },
    { zipCode: '96710', predicted2025: 26.6, area: 'Hawaii County', population: 8700, diabetes2022: 12.5, diabetes2021: 12.1, highBloodPressure2021: 32.8, kidneyDisease2021: 3.6, employmentRate: 47.0, disabilityRate: 23.4 },
    { zipCode: '96712', predicted2025: 16.9, area: 'Hawaii County', population: 13100, diabetes2022: 11.2, diabetes2021: 7.7, highBloodPressure2021: 30.2, kidneyDisease2021: 2.5, employmentRate: 57.6, disabilityRate: 12.3 },
    { zipCode: '96713', predicted2025: 31.4, area: 'Hawaii County', population: 9500, diabetes2022: 14.0, diabetes2021: 8.9, highBloodPressure2021: 29.8, kidneyDisease2021: 3.1, employmentRate: 45.7, disabilityRate: 15.5 },
    { zipCode: '96714', predicted2025: 0.0, area: 'Hawaii County', population: 8200, diabetes2022: 11.1, diabetes2021: 11.1, highBloodPressure2021: 32.1, kidneyDisease2021: 3.4, employmentRate: 63.2, disabilityRate: 12.3 },
    { zipCode: '96716', predicted2025: 20.1, area: 'Hawaii County', population: 14600, diabetes2022: 14.1, diabetes2021: 10.9, highBloodPressure2021: 31.7, kidneyDisease2021: 3.0, employmentRate: 62.0, disabilityRate: 15.2 },
    { zipCode: '96717', predicted2025: 12.6, area: 'Hawaii County', population: 12800, diabetes2022: 12.2, diabetes2021: 9.7, highBloodPressure2021: 30.0, kidneyDisease2021: 3.0, employmentRate: 61.1, disabilityRate: 12.6 },
    { zipCode: '96719', predicted2025: 11.1, area: 'Hawaii County', population: 9100, diabetes2022: 11.3, diabetes2021: 9.7, highBloodPressure2021: 31.0, kidneyDisease2021: 3.2, employmentRate: 64.7, disabilityRate: 14.1 },
    { zipCode: '96720', predicted2025: 31.1, area: 'Hawaii County', population: 7900, diabetes2022: 12.4, diabetes2021: 11.1, highBloodPressure2021: 31.1, kidneyDisease2021: 3.2, employmentRate: 54.4, disabilityRate: 15.6 },
    { zipCode: '96722', predicted2025: 54.7, area: 'Hawaii County', population: 11200, diabetes2022: 11.6, diabetes2021: 8.1, highBloodPressure2021: 34.9, kidneyDisease2021: 3.1, employmentRate: 51.1, disabilityRate: 15.2 },
    { zipCode: '96725', predicted2025: 42.8, area: 'Hawaii County', population: 9800, diabetes2022: 10.7, diabetes2021: 9.1, highBloodPressure2021: 30.0, kidneyDisease2021: 3.0, employmentRate: 54.5, disabilityRate: 10.4 },
    { zipCode: '96727', predicted2025: 71.7, area: 'Hawaii County', population: 8500, diabetes2022: 11.6, diabetes2021: 10.7, highBloodPressure2021: 31.4, kidneyDisease2021: 3.4, employmentRate: 57.0, disabilityRate: 21.5 },
    { zipCode: '96728', predicted2025: 29.6, area: 'Hawaii County', population: 10900, diabetes2022: 11.9, diabetes2021: 11.4, highBloodPressure2021: 31.6, kidneyDisease2021: 3.5, employmentRate: 63.3, disabilityRate: 16.2 },
    { zipCode: '96729', predicted2025: 19.7, area: 'Hawaii County', population: 6200, diabetes2022: 17.4, diabetes2021: 13.1, highBloodPressure2021: 33.4, kidneyDisease2021: 3.6, employmentRate: 47.3, disabilityRate: 16.4 },
    { zipCode: '96730', predicted2025: 9.6, area: 'Hawaii County', population: 8100, diabetes2022: 10.9, diabetes2021: 9.1, highBloodPressure2021: 30.5, kidneyDisease2021: 2.8, employmentRate: 57.9, disabilityRate: 7.3 },
    { zipCode: '96734', predicted2025: 3.9, area: 'Hawaii County', population: 12400, diabetes2022: 9.7, diabetes2021: 7.3, highBloodPressure2021: 27.7, kidneyDisease2021: 2.5, employmentRate: 52.4, disabilityRate: 10.9 },
    { zipCode: '96738', predicted2025: 80.7, area: 'Hawaii County', population: 7800, diabetes2022: 10.5, diabetes2021: 7.2, highBloodPressure2021: 29.0, kidneyDisease2021: 2.5, employmentRate: 54.8, disabilityRate: 12.2 },
    { zipCode: '96740', predicted2025: 21.6, area: 'Hawaii County', population: 9600, diabetes2022: 10.8, diabetes2021: 8.6, highBloodPressure2021: 30.4, kidneyDisease2021: 2.9, employmentRate: 58.5, disabilityRate: 11.6 },
    { zipCode: '96743', predicted2025: 33.8, area: 'Hawaii County', population: 11800, diabetes2022: 10.6, diabetes2021: 8.8, highBloodPressure2021: 29.7, kidneyDisease2021: 2.9, employmentRate: 59.2, disabilityRate: 12.5 },
    { zipCode: '96744', predicted2025: 3.5, area: 'Hawaii County', population: 13600, diabetes2022: 12.8, diabetes2021: 9.6, highBloodPressure2021: 31.5, kidneyDisease2021: 2.9, employmentRate: 56.7, disabilityRate: 12.0 },
    { zipCode: '96746', predicted2025: 11.1, area: 'Hawaii County', population: 10500, diabetes2022: 11.2, diabetes2021: 8.9, highBloodPressure2021: 29.2, kidneyDisease2021: 2.8, employmentRate: 62.1, disabilityRate: 11.7 },
    { zipCode: '96748', predicted2025: 52.4, area: 'Hawaii County', population: 5900, diabetes2022: 16.2, diabetes2021: 13.5, highBloodPressure2021: 35.2, kidneyDisease2021: 4.0, employmentRate: 48.4, disabilityRate: 15.9 },
    { zipCode: '96749', predicted2025: 21.0, area: 'Hawaii County', population: 7400, diabetes2022: 11.7, diabetes2021: 9.6, highBloodPressure2021: 30.4, kidneyDisease2021: 2.9, employmentRate: 53.9, disabilityRate: 18.2 },
    { zipCode: '96750', predicted2025: 9.3, area: 'Hawaii County', population: 8800, diabetes2022: 11.6, diabetes2021: 9.9, highBloodPressure2021: 29.8, kidneyDisease2021: 3.0, employmentRate: 55.2, disabilityRate: 18.7 },
    { zipCode: '96753', predicted2025: 22.2, area: 'Hawaii County', population: 9200, diabetes2022: 11.3, diabetes2021: 7.5, highBloodPressure2021: 27.0, kidneyDisease2021: 2.7, employmentRate: 60.5, disabilityRate: 10.9 },
    { zipCode: '96760', predicted2025: 92.7, area: 'Hawaii County', population: 4100, diabetes2022: 12.3, diabetes2021: 11.1, highBloodPressure2021: 33.1, kidneyDisease2021: 3.2, employmentRate: 52.3, disabilityRate: 15.1 },
    { zipCode: '96761', predicted2025: 17.6, area: 'Hawaii County', population: 12800, diabetes2022: 11.5, diabetes2021: 8.1, highBloodPressure2021: 25.2, kidneyDisease2021: 2.6, employmentRate: 66.3, disabilityRate: 9.3 },
    { zipCode: '96762', predicted2025: 10.2, area: 'Hawaii County', population: 15600, diabetes2022: 8.2, diabetes2021: 5.3, highBloodPressure2021: 21.6, kidneyDisease2021: 1.7, employmentRate: 62.3, disabilityRate: 8.2 },
    { zipCode: '96789', predicted2025: 1.8, area: 'Hawaii County', population: 18900, diabetes2022: 11.9, diabetes2021: 8.5, highBloodPressure2021: 29.0, kidneyDisease2021: 2.4, employmentRate: 62.2, disabilityRate: 11.0 },
    { zipCode: '96813', predicted2025: 4.3, area: 'Honolulu County', population: 25400, diabetes2022: 12.6, diabetes2021: 10.8, highBloodPressure2021: 29.4, kidneyDisease2021: 3.0, employmentRate: 63.9, disabilityRate: 12.8 },
    { zipCode: '96814', predicted2025: 13.8, area: 'Honolulu County', population: 18700, diabetes2022: 14.6, diabetes2021: 10.8, highBloodPressure2021: 31.7, kidneyDisease2021: 2.9, employmentRate: 66.4, disabilityRate: 11.5 },
    { zipCode: '96815', predicted2025: 42.0, area: 'Honolulu County', population: 21300, diabetes2022: 12.4, diabetes2021: 9.1, highBloodPressure2021: 31.6, kidneyDisease2021: 2.8, employmentRate: 57.7, disabilityRate: 11.4 },
    { zipCode: '96816', predicted2025: 3.3, area: 'Honolulu County', population: 28600, diabetes2022: 13.0, diabetes2021: 10.6, highBloodPressure2021: 30.7, kidneyDisease2021: 3.0, employmentRate: 60.2, disabilityRate: 10.9 },
    { zipCode: '96817', predicted2025: 32.0, area: 'Honolulu County', population: 17900, diabetes2022: 16.5, diabetes2021: 13.8, highBloodPressure2021: 33.8, kidneyDisease2021: 3.4, employmentRate: 55.5, disabilityRate: 15.2 },
    { zipCode: '96818', predicted2025: 8.0, area: 'Honolulu County', population: 31200, diabetes2022: 10.5, diabetes2021: 8.0, highBloodPressure2021: 25.3, kidneyDisease2021: 2.2, employmentRate: 49.9, disabilityRate: 10.3 },
    { zipCode: '96819', predicted2025: 19.7, area: 'Honolulu County', population: 23800, diabetes2022: 14.7, diabetes2021: 11.9, highBloodPressure2021: 30.7, kidneyDisease2021: 3.0, employmentRate: 57.3, disabilityRate: 13.1 },
    { zipCode: '96821', predicted2025: 1.0, area: 'Honolulu County', population: 19400, diabetes2022: 13.3, diabetes2021: 10.0, highBloodPressure2021: 32.8, kidneyDisease2021: 3.1, employmentRate: 57.9, disabilityRate: 11.4 },
    { zipCode: '96822', predicted2025: 6.4, area: 'Honolulu County', population: 22600, diabetes2022: 12.2, diabetes2021: 9.1, highBloodPressure2021: 29.4, kidneyDisease2021: 2.7, employmentRate: 60.6, disabilityRate: 11.4 },
    { zipCode: '96825', predicted2025: 2.2, area: 'Honolulu County', population: 24100, diabetes2022: 12.4, diabetes2021: 9.3, highBloodPressure2021: 31.7, kidneyDisease2021: 2.8, employmentRate: 56.1, disabilityRate: 9.7 },
    { zipCode: '96826', predicted2025: 11.9, area: 'Honolulu County', population: 20800, diabetes2022: 14.3, diabetes2021: 11.3, highBloodPressure2021: 31.3, kidneyDisease2021: 2.9, employmentRate: 62.0, disabilityRate: 14.0 }
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
    const headers = ['ZIP Code', 'Area', 'Population', '2025 Prediction', 'Diabetes 2022', 'High Blood Pressure 2021', 'Employment Rate', 'Equity Level 2025'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => [
        row.zipCode,
        row.area,
        row.population,
        row.predicted2025,
        row.diabetes2022,
        row.highBloodPressure2021,
        row.employmentRate,
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
            <h3 className="text-xl font-bold text-gray-900">ZIP Code Health Equity Data</h3>
            <p className="text-gray-600 text-sm">Complete dataset with health indicators and predictions</p>
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

      <ScrollArea className="h-96">
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
                County {sortField === 'area' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                2025 Index {sortField === 'predicted2025' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('diabetes2022')}
              >
                Diabetes % {sortField === 'diabetes2022' && (sortDirection === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={() => handleSort('employmentRate')}
              >
                Employment % {sortField === 'employmentRate' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                  <TableCell className="text-right">{row.diabetes2022.toFixed(1)}%</TableCell>
                  <TableCell className="text-right">{row.employmentRate.toFixed(1)}%</TableCell>
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
      </ScrollArea>

      {sortedData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>No data found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
