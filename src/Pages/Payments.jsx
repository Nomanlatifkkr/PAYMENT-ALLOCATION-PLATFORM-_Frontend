import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentList from '../Components/payments/PaymentList';
import PaymentFilters from '../Components/payments/PaymentFilters';
import PaymentSummary from '../Components/payments/PaymentSummary';
import { Filter, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data – will come from API
const MOCK_PAYMENTS = [
  {
    id: 'pi_1234567890',
    date: '2026-02-12T14:23:00Z',
    amount: 24500, // $245.00
    customer: 'Acme Inc.',
    status: 'COMPLETED',
    allocation: [
      { destinationId: 'dest_2', destinationName: 'Bank of America', percentage: 15, amount: 3675, transferStatus: 'COMPLETED' },
      { destinationId: 'dest_3', destinationName: 'Wells Fargo', percentage: 25, amount: 6125, transferStatus: 'COMPLETED' },
      { main: true, destinationName: 'Chase Bank', amount: 14700, transferStatus: 'COMPLETED' },
    ],
  },
  {
    id: 'pi_1234567891',
    date: '2026-02-12T10:15:00Z',
    amount: 8900, // $89.00
    customer: 'Globex Corp',
    status: 'ALLOCATED',
    allocation: [
      { destinationId: 'dest_2', destinationName: 'Bank of America', percentage: 15, amount: 1335, transferStatus: 'PENDING' },
      { destinationId: 'dest_3', destinationName: 'Wells Fargo', percentage: 25, amount: 2225, transferStatus: 'PENDING' },
      { main: true, destinationName: 'Chase Bank', amount: 5340, transferStatus: 'PENDING' },
    ],
  },
  {
    id: 'pi_1234567892',
    date: '2026-02-11T16:45:00Z',
    amount: 15600, // $156.00
    customer: 'Stark Industries',
    status: 'TRANSFERS_CREATED',
    allocation: [
      { destinationId: 'dest_2', destinationName: 'Bank of America', percentage: 15, amount: 2340, transferStatus: 'TRANSFERS_CREATED' },
      { destinationId: 'dest_3', destinationName: 'Wells Fargo', percentage: 25, amount: 3900, transferStatus: 'TRANSFERS_CREATED' },
      { main: true, destinationName: 'Chase Bank', amount: 9360, transferStatus: 'TRANSFERS_CREATED' },
    ],
  },
  {
    id: 'pi_1234567893',
    date: '2026-02-10T09:30:00Z',
    amount: 3200, // $32.00
    customer: 'Wayne Enterprises',
    status: 'FAILED',
    allocation: [
      { destinationId: 'dest_2', destinationName: 'Bank of America', percentage: 15, amount: 480, transferStatus: 'FAILED' },
      { destinationId: 'dest_3', destinationName: 'Wells Fargo', percentage: 25, amount: 800, transferStatus: 'FAILED' },
      { main: true, destinationName: 'Chase Bank', amount: 1920, transferStatus: 'FAILED' },
    ],
  },
];

const Payments = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState(MOCK_PAYMENTS);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    destination: 'all',
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API fetch
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Apply filters (simplified)
  const filteredPayments = payments.filter(payment => {
    if (filters.status !== 'all' && payment.status !== filters.status) return false;
    // Add more filter logic as needed
    return true;
  });

  const summary = {
    total: filteredPayments.reduce((sum, p) => sum + p.amount, 0),
    count: filteredPayments.length,
    completed: filteredPayments.filter(p => p.status === 'COMPLETED').length,
    failed: filteredPayments.filter(p => p.status === 'FAILED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
          <p className="text-text-secondary mt-1">
            View all incoming payments and their allocation status
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Summary Cards */}
      <PaymentSummary summary={summary} />

      {/* Filters */}
      <PaymentFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Payments List */}
      <PaymentList payments={filteredPayments} />
    </div>
  );
};

export default Payments;