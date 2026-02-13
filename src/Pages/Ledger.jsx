import { useState } from 'react';
import LedgerTable from '../components/ledger/LedgerTable';
import LedgerFilters from '../components/ledger/LedgerFilters';
import LedgerSummary from '../components/ledger/LedgerSummary';
import ExportButton from '../components/ledger/ExportButton';
import { RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock ledger events – will come from API
const MOCK_LEDGER = [
  {
    id: 'evt_001',
    timestamp: '2026-02-12T14:23:00Z',
    eventType: 'PAYMENT_RECEIVED',
    paymentId: 'pi_1234567890',
    destinationId: null,
    destinationName: null,
    amount: 24500,
    status: 'COMPLETED',
  },
  {
    id: 'evt_002',
    timestamp: '2026-02-12T14:23:05Z',
    eventType: 'ALLOCATION_CALCULATED',
    paymentId: 'pi_1234567890',
    destinationId: null,
    destinationName: null,
    amount: 24500,
    status: 'COMPLETED',
  },
  {
    id: 'evt_003',
    timestamp: '2026-02-12T14:23:10Z',
    eventType: 'TRANSFER_CREATED',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_2',
    destinationName: 'Bank of America',
    amount: 3675,
    status: 'PENDING',
  },
  {
    id: 'evt_004',
    timestamp: '2026-02-12T14:23:11Z',
    eventType: 'TRANSFER_CREATED',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_3',
    destinationName: 'Wells Fargo',
    amount: 6125,
    status: 'PENDING',
  },
  {
    id: 'evt_005',
    timestamp: '2026-02-12T14:23:12Z',
    eventType: 'TRANSFER_CREATED',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_1',
    destinationName: 'Chase Bank',
    amount: 14700,
    status: 'PENDING',
  },
  {
    id: 'evt_006',
    timestamp: '2026-02-12T14:23:15Z',
    eventType: 'TRANSFER_COMPLETED',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_2',
    destinationName: 'Bank of America',
    amount: 3675,
    status: 'COMPLETED',
  },
  {
    id: 'evt_007',
    timestamp: '2026-02-12T14:23:16Z',
    eventType: 'TRANSFER_COMPLETED',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_3',
    destinationName: 'Wells Fargo',
    amount: 6125,
    status: 'COMPLETED',
  },
  {
    id: 'evt_008',
    timestamp: '2026-02-12T14:23:17Z',
    eventType: 'TRANSFER_COMPLETED',
    paymentId: 'pi_1234567890',
    destinationId: 'dest_1',
    destinationName: 'Chase Bank',
    amount: 14700,
    status: 'COMPLETED',
  },
  {
    id: 'evt_009',
    timestamp: '2026-02-11T10:15:00Z',
    eventType: 'PAYMENT_RECEIVED',
    paymentId: 'pi_1234567891',
    destinationId: null,
    destinationName: null,
    amount: 8900,
    status: 'COMPLETED',
  },
  {
    id: 'evt_010',
    timestamp: '2026-02-11T10:15:05Z',
    eventType: 'ALLOCATION_FAILED',
    paymentId: 'pi_1234567891',
    destinationId: null,
    destinationName: null,
    amount: 8900,
    status: 'FAILED',
  },
];

const Ledger = () => {
  const [ledger, setLedger] = useState(MOCK_LEDGER);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    eventType: 'all',
    destination: 'all',
    status: 'all',
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

  // Apply filters (simplified – you can enhance with date logic)
  const filteredLedger = ledger.filter(entry => {
    if (filters.eventType !== 'all' && entry.eventType !== filters.eventType) return false;
    if (filters.status !== 'all' && entry.status !== filters.status) return false;
    if (filters.destination !== 'all') {
      if (filters.destination === 'null' && entry.destinationId !== null) return false;
      if (filters.destination !== 'null' && entry.destinationId !== filters.destination) return false;
    }
    // Date filtering would go here (compare timestamp with selected range)
    return true;
  });

  // Calculate summary
  const summary = {
    totalEvents: filteredLedger.length,
    totalAmount: filteredLedger.reduce((sum, e) => sum + e.amount, 0),
    completed: filteredLedger.filter(e => e.status === 'COMPLETED').length,
    pending: filteredLedger.filter(e => e.status === 'PENDING').length,
    failed: filteredLedger.filter(e => e.status === 'FAILED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ledger</h1>
          <p className="text-text-secondary mt-1">
            Immutable log of all allocation events
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
          <ExportButton data={filteredLedger} />
        </div>
      </div>

      {/* Summary Cards */}
      <LedgerSummary summary={summary} />

      {/* Filters */}
      <LedgerFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Ledger Table */}
      <LedgerTable entries={filteredLedger} />
    </div>
  );
};

export default Ledger;