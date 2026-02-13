import { Calendar, Filter, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState } from 'react';
const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'PAID_RECEIVED', label: 'Received' },
  { value: 'ALLOCATED', label: 'Allocated' },
  { value: 'TRANSFERS_CREATED', label: 'Transfers Created' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'FAILED', label: 'Failed' },
  { value: 'REQUIRES_ACTION', label: 'Requires Action' },
];

const dateOptions = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'custom', label: 'Custom' },
];

const PaymentFilters = ({ filters, onFilterChange }) => {
  const [showCustom, setShowCustom] = useState(false);

  const handleStatusChange = (e) => {
    onFilterChange({ status: e.target.value });
  };

  const handleDateChange = (e) => {
    onFilterChange({ dateRange: e.target.value });
    setShowCustom(e.target.value === 'custom');
  };

  const clearFilters = () => {
    onFilterChange({ dateRange: 'all', status: 'all', destination: 'all' });
  };

  const hasFilters = filters.dateRange !== 'all' || filters.status !== 'all' || filters.destination !== 'all';

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
        {/* Date filter */}
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

        {/* Status filter */}
        <div>
          <select
            value={filters.status}
            onChange={handleStatusChange}
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
          />
          <span className="text-text-secondary self-center">to</span>
          <input
            type="date"
            className="px-3 py-2 bg-surface-soft border border-border rounded-lg text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentFilters;