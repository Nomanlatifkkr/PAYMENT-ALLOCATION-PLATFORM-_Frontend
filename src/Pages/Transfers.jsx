import { useState } from 'react';
import TransferList from '../components/transfers/TransferList';
import TransferFilters from '../components/transfers/TransferFilters';
import TransferSummary from '../components/transfers/TransferSummary';
import ExportButton from '../Components/ledger/ExportButton';
import { RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock transfers – will come from API
const MOCK_TRANSFERS = [
  {
    id: 'tr_001',
    transferId: 'tr_1234567890',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_2',
    destinationName: 'Bank of America',
    amount: 3675,
    status: 'COMPLETED',
    created: '2026-02-12T14:23:10Z',
    completedAt: '2026-02-12T14:23:30Z',
  },
  {
    id: 'tr_002',
    transferId: 'tr_1234567891',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_3',
    destinationName: 'Wells Fargo',
    amount: 6125,
    status: 'COMPLETED',
    created: '2026-02-12T14:23:11Z',
    completedAt: '2026-02-12T14:23:31Z',
  },
  {
    id: 'tr_003',
    transferId: 'tr_1234567892',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_1',
    destinationName: 'Chase Bank',
    amount: 14700,
    status: 'COMPLETED',
    created: '2026-02-12T14:23:12Z',
    completedAt: '2026-02-12T14:23:32Z',
  },
  {
    id: 'tr_004',
    transferId: 'tr_1234567893',
    paymentId: 'pi_1234567891',
    destinationId: 'dest_2',
    destinationName: 'Bank of America',
    amount: 1335,
    status: 'PENDING',
    created: '2026-02-12T10:15:10Z',
    completedAt: null,
  },
  {
    id: 'tr_005',
    transferId: 'tr_1234567894',
    paymentId: 'pi_1234567891',
    destinationId: 'dest_3',
    destinationName: 'Wells Fargo',
    amount: 2225,
    status: 'PENDING',
    created: '2026-02-12T10:15:11Z',
    completedAt: null,
  },
  {
    id: 'tr_006',
    transferId: 'tr_1234567895',
    paymentId: 'pi_1234567891',
    destinationId: 'dest_1',
    destinationName: 'Chase Bank',
    amount: 5340,
    status: 'PENDING',
    created: '2026-02-12T10:15:12Z',
    completedAt: null,
  },
  {
    id: 'tr_007',
    transferId: 'tr_1234567896',
    paymentId: 'pi_1234567892',
    destinationId: 'dest_2',
    destinationName: 'Bank of America',
    amount: 2340,
    status: 'FAILED',
    created: '2026-02-11T16:45:10Z',
    completedAt: '2026-02-11T16:46:00Z',
  },
  {
    id: 'tr_008',
    transferId: 'tr_1234567897',
    paymentId: 'pi_1234567892',
    destinationId: 'dest_3',
    destinationName: 'Wells Fargo',
    amount: 3900,
    status: 'FAILED',
    created: '2026-02-11T16:45:11Z',
    completedAt: '2026-02-11T16:46:01Z',
  },
];

const Transfers = () => {
  const [transfers, setTransfers] = useState(MOCK_TRANSFERS);
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

  // Apply filters
  const filteredTransfers = transfers.filter(transfer => {
    if (filters.status !== 'all' && transfer.status !== filters.status) return false;
    if (filters.destination !== 'all' && transfer.destinationId !== filters.destination) return false;
    // Date filtering would go here
    return true;
  });

  const summary = {
    total: filteredTransfers.reduce((sum, t) => sum + t.amount, 0),
    count: filteredTransfers.length,
    completed: filteredTransfers.filter(t => t.status === 'COMPLETED').length,
    pending: filteredTransfers.filter(t => t.status === 'PENDING').length,
    failed: filteredTransfers.filter(t => t.status === 'FAILED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transfers</h1>
          <p className="text-text-secondary mt-1">
            Track transfers to destination bank accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <ExportButton data={filteredTransfers} filename="transfers-export" />
        </div>
      </div>

      {/* Summary Cards */}
      <TransferSummary summary={summary} />

      {/* Filters */}
      <TransferFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Transfers List */}
      <TransferList transfers={filteredTransfers} />
    </div>
  );
};

export default Transfers;