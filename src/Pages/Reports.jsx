import { useState } from 'react';
import ReportFilters from '../components/reports/ReportFilters';
import TotalsByDestination from '../components/reports/TotalsByDestination';
import ReportTabs from '../components/reports/ReportTabs';
import { Download, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data – will come from API
const MOCK_SUMMARY = {
  totalPayments: 156,
  totalAmount: 245600, // $2,456.00
  avgPayment: 1574, // $15.74
  successRate: 94.2,
};

const MOCK_DESTINATION_TOTALS = [
  { destinationId: 'dest_1', destinationName: 'Chase Bank', amount: 147200, count: 52 },
  { destinationId: 'dest_2', destinationName: 'Bank of America', amount: 58900, count: 41 },
  { destinationId: 'dest_3', destinationName: 'Wells Fargo', amount: 39500, count: 38 },
];

const Reports = () => {
  const [filters, setFilters] = useState({
    dateRange: 'month',
    startDate: null,
    endDate: null,
    destination: 'all',
    status: 'all',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleExportAll = () => {
    // Would trigger combined export of all filtered data
    console.log('Export all reports');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-text-secondary mt-1">
            Analyze your payment and allocation data
          </p>
        </div>
        <button
          onClick={handleExportAll}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors"
        >
          <Download className="w-4 h-4" />
          Export all data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
          <p className="text-xs text-text-secondary">Total Payments</p>
          <p className="text-2xl font-bold mt-1">{MOCK_SUMMARY.totalPayments}</p>
        </div>
        <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
          <p className="text-xs text-text-secondary">Total Amount</p>
          <p className="text-2xl font-bold mt-1">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(MOCK_SUMMARY.totalAmount / 100)}
          </p>
        </div>
        <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
          <p className="text-xs text-text-secondary">Average Payment</p>
          <p className="text-2xl font-bold mt-1">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(MOCK_SUMMARY.avgPayment / 100)}
          </p>
        </div>
        <div className="bg-surface rounded-lg p-4 border border-border shadow-sm">
          <p className="text-xs text-text-secondary">Success Rate</p>
          <p className="text-2xl font-bold mt-1">{MOCK_SUMMARY.successRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Totals by Destination */}
      <TotalsByDestination data={MOCK_DESTINATION_TOTALS} />

      {/* Tabbed Data Tables */}
      <ReportTabs filters={filters} />
    </div>
  );
};

export default Reports;