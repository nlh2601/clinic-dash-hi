
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Download } from 'lucide-react';

interface PredictionData {
  zipCode: string;
  predictedIndex2025: number;
}

const PredictionsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const predictionsData: PredictionData[] = [
    { zipCode: '96701', predictedIndex2025: 4.71564 },
    { zipCode: '96703', predictedIndex2025: 32.381985 },
    { zipCode: '96704', predictedIndex2025: 70.83986 },
    { zipCode: '96705', predictedIndex2025: 16.87676 },
    { zipCode: '96706', predictedIndex2025: 3.4138474 },
    { zipCode: '96707', predictedIndex2025: 6.207241 },
    { zipCode: '96708', predictedIndex2025: 26.677614 },
    { zipCode: '96710', predictedIndex2025: 23.584455 },
    { zipCode: '96712', predictedIndex2025: 27.902792 },
    { zipCode: '96713', predictedIndex2025: 53.716972 },
    { zipCode: '96714', predictedIndex2025: 2.4626436 },
    { zipCode: '96716', predictedIndex2025: 18.13251 },
    { zipCode: '96717', predictedIndex2025: 25.02643 },
    { zipCode: '96719', predictedIndex2025: 21.347406 },
    { zipCode: '96720', predictedIndex2025: 31.135334 },
    { zipCode: '96722', predictedIndex2025: 80.61051 },
    { zipCode: '96725', predictedIndex2025: 17.104895 },
    { zipCode: '96726', predictedIndex2025: 2.4614887 },
    { zipCode: '96727', predictedIndex2025: 71.68386 },
    { zipCode: '96728', predictedIndex2025: 19.69876 },
    { zipCode: '96729', predictedIndex2025: 15.255892 },
    { zipCode: '96730', predictedIndex2025: 4.6979513 },
    { zipCode: '96731', predictedIndex2025: 12.819175 },
    { zipCode: '96732', predictedIndex2025: 14.066057 },
    { zipCode: '96734', predictedIndex2025: 2.0792525 },
    { zipCode: '96737', predictedIndex2025: 17.539991 },
    { zipCode: '96738', predictedIndex2025: 80.61051 },
    { zipCode: '96740', predictedIndex2025: 21.583164 },
    { zipCode: '96741', predictedIndex2025: 24.369825 },
    { zipCode: '96742', predictedIndex2025: 2.424905 },
    { zipCode: '96743', predictedIndex2025: 33.793434 },
    { zipCode: '96744', predictedIndex2025: 4.724986 },
    { zipCode: '96746', predictedIndex2025: 13.742008 },
    { zipCode: '96747', predictedIndex2025: 24.373838 },
    { zipCode: '96748', predictedIndex2025: 52.427303 },
    { zipCode: '96749', predictedIndex2025: 13.770293 },
    { zipCode: '96750', predictedIndex2025: 6.1180396 },
    { zipCode: '96751', predictedIndex2025: 2.4413974 },
    { zipCode: '96752', predictedIndex2025: 33.99341 },
    { zipCode: '96753', predictedIndex2025: 13.93565 },
    { zipCode: '96754', predictedIndex2025: 30.71601 },
    { zipCode: '96755', predictedIndex2025: 21.621748 },
    { zipCode: '96756', predictedIndex2025: 49.117043 },
    { zipCode: '96757', predictedIndex2025: 27.69012 },
    { zipCode: '96759', predictedIndex2025: 5.0715747 },
    { zipCode: '96760', predictedIndex2025: 76.22605 },
    { zipCode: '96761', predictedIndex2025: 17.587635 },
    { zipCode: '96762', predictedIndex2025: 10.197374 },
    { zipCode: '96763', predictedIndex2025: 4.3447647 },
    { zipCode: '96821', predictedIndex2025: 71.0361 },
    { zipCode: '96765', predictedIndex2025: 2.5201128 },
    { zipCode: '96766', predictedIndex2025: 11.798539 },
    { zipCode: '96768', predictedIndex2025: 9.220602 },
    { zipCode: '96769', predictedIndex2025: 30.576012 },
    { zipCode: '96770', predictedIndex2025: 12.463936 },
    { zipCode: '96771', predictedIndex2025: 9.921172 },
    { zipCode: '96772', predictedIndex2025: 71.17208 },
    { zipCode: '96773', predictedIndex2025: 2.4586568 },
    { zipCode: '96774', predictedIndex2025: 66.10403 },
    { zipCode: '96776', predictedIndex2025: 76.28322 },
    { zipCode: '96777', predictedIndex2025: 64.1572 },
    { zipCode: '96778', predictedIndex2025: 92.33964 },
    { zipCode: '96779', predictedIndex2025: 27.792055 },
    { zipCode: '96780', predictedIndex2025: 72.86207 },
    { zipCode: '96781', predictedIndex2025: 67.20578 },
    { zipCode: '96782', predictedIndex2025: 1.6792164 },
    { zipCode: '96783', predictedIndex2025: 64.327934 },
    { zipCode: '96785', predictedIndex2025: 9.9869995 },
    { zipCode: '96786', predictedIndex2025: 13.721566 },
    { zipCode: '96789', predictedIndex2025: 1.8164239 },
    { zipCode: '96790', predictedIndex2025: 17.589231 },
    { zipCode: '96791', predictedIndex2025: 19.426973 },
    { zipCode: '96792', predictedIndex2025: 59.26143 },
    { zipCode: '96793', predictedIndex2025: 8.971682 },
    { zipCode: '96795', predictedIndex2025: 6.491351 },
    { zipCode: '96796', predictedIndex2025: 12.935788 },
    { zipCode: '96797', predictedIndex2025: 5.8999667 },
    { zipCode: '96813', predictedIndex2025: 4.3039618 },
    { zipCode: '96814', predictedIndex2025: 9.626053 },
    { zipCode: '96815', predictedIndex2025: 41.965008 },
    { zipCode: '96816', predictedIndex2025: 4.71564 },
    { zipCode: '96817', predictedIndex2025: 31.964636 },
    { zipCode: '96818', predictedIndex2025: 9.647337 },
    { zipCode: '96819', predictedIndex2025: 22.563225 },
    { zipCode: '96822', predictedIndex2025: 6.2709627 },
    { zipCode: '96825', predictedIndex2025: 6.251364 },
    { zipCode: '96826', predictedIndex2025: 11.890614 },
    { zipCode: '96848', predictedIndex2025: 2.4442294 },
    { zipCode: '96853', predictedIndex2025: 90.08251 },
    { zipCode: '96857', predictedIndex2025: 33.91766 },
    { zipCode: '96858', predictedIndex2025: 5.0744066 },
    { zipCode: '96859', predictedIndex2025: 5.3774495 },
    { zipCode: '96860', predictedIndex2025: 4.959571 },
    { zipCode: '96863', predictedIndex2025: 5.0715747 }
  ];

  const filteredData = predictionsData.filter(row =>
    row.zipCode.includes(searchTerm)
  );

  const sortedData = [...filteredData].sort((a, b) => {
    return sortDirection === 'asc' 
      ? a.predictedIndex2025 - b.predictedIndex2025 
      : b.predictedIndex2025 - a.predictedIndex2025;
  });

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const getEquityLevel = (value: number) => {
    if (value < 20) return { label: 'High', color: 'text-green-600 bg-green-50' };
    if (value < 50) return { label: 'Medium', color: 'text-yellow-600 bg-yellow-50' };
    return { label: 'Low', color: 'text-red-600 bg-red-50' };
  };

  const downloadCSV = () => {
    const headers = ['ZIP Code', 'Predicted Index 2025', 'Equity Level'];
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => [
        row.zipCode,
        row.predictedIndex2025,
        getEquityLevel(row.predictedIndex2025).label
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hawaii_health_equity_predictions_2025.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Health Equity Index Predictions 2025</h3>
            <p className="text-gray-600 text-sm">Predicted health equity index values by ZIP code</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search ZIP codes..."
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
              <TableHead>ZIP Code</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 text-right"
                onClick={handleSort}
              >
                Predicted Index 2025 {sortDirection === 'asc' ? '↑' : '↓'}
              </TableHead>
              <TableHead>Equity Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => {
              const equityLevel = getEquityLevel(row.predictedIndex2025);
              return (
                <TableRow key={row.zipCode} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{row.zipCode}</TableCell>
                  <TableCell className="text-right">{row.predictedIndex2025.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${equityLevel.color}`}>
                      {equityLevel.label}
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

export default PredictionsTable;
