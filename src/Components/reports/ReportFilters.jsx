import { useState } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'quarter', label: 'This quarter' },
  { value: 'year', label: 'This year' },
  { value: 'custom', label: 'Custom' },
];

const destinationOptions = [
  { value: 'all', label: 'All destinations' },
  { value: 'dest_1', label: 'Chase Bank' },
  { value: 'dest_2', label: 'Bank of America' },
  { value: 'dest_3', label: 'Wells Fargo' },
];

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'FAILED', label: 'Failed' },
];

const ReportFilters = ({ filters, onFilterChange }) => {
  const [showCustom, setShowCustom] = useState(false);

  const handleDateChange = (e) => {
    const value = e.target.value;
    onFilterChange({ dateRange: value });
    setShowCustom(value === 'custom');
  };

  const clearFilters = () => {
    onFilterChange({
      dateRange: 'month',
      startDate: null,
      endDate: null,
      destination: 'all',
      status: 'all',
    });
  };

  const hasFilters = filters.dateRange !== 'month' || filters.destination !== 'all' || filters.status !== 'all';

  return (
    <div className="bg-surface rounded-lg p-4 border border-border space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-text-secondary">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Date range */}
        <div className="relative">
          <select
            value={filters.dateRange}
            onChange={handleDateChange}
            className="appearance-none pl-8 pr-8 py-2 bg-surface-soft border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {dateOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        </div>

        {/* Destination */}
        <div>
          <select
            value={filters.destination}
            onChange={(e) => onFilterChange({ destination: e.target.value })}
            className="px-3 py-2 bg-surface-soft border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {destinationOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="px-3 py-2 bg-surface-soft border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {showCustom && (
        <div className="flex gap-3 pt-2">
          <input
            type="date"
            className="px-3 py-2 bg-surface-soft border border-border rounded-lg text-sm"
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
          />
          <span className="text-text-secondary self-center">to</span>
          <input
            type="date"
            className="px-3 py-2 bg-surface-soft border border-border rounded-lg text-sm"
            onChange={(e) => onFilterChange({ endDate: e.target.value })}
          />
        </div>
      )}
    </div>
  );
};

export default ReportFilters;