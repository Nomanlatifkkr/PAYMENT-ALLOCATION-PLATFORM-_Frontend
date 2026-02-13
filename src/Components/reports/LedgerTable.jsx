import { Download } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock ledger events (simplified)
const MOCK_LEDGER = [
  {
    id: 'evt_001',
    timestamp: '2026-02-12T14:23:00Z',
    eventType: 'PAYMENT_RECEIVED',
    paymentId: 'pi_1234567890',
    amount: 24500,
    status: 'COMPLETED',
  },
  {
    id: 'evt_002',
    timestamp: '2026-02-12T14:23:10Z',
    eventType: 'TRANSFER_CREATED',
    paymentId: 'pi_1234567890',
    destinationName: 'Bank of America',
    amount: 3675,
    status: 'PENDING',
  },
  {
    id: 'evt_003',
    timestamp: '2026-02-12T14:23:30Z',
    eventType: 'TRANSFER_COMPLETED',
    paymentId: 'pi_1234567890',
    destinationName: 'Bank of America',
    amount: 3675,
    status: 'COMPLETED',
  },
];

const eventTypeLabels = {
  PAYMENT_RECEIVED: 'Payment Received',
  ALLOCATION_CALCULATED: 'Allocation Calculated',
  ALLOCATION_FAILED: 'Allocation Failed',
  TRANSFER_CREATED: 'Transfer Created',
  TRANSFER_COMPLETED: 'Transfer Completed',
  TRANSFER_FAILED: 'Transfer Failed',
};

const LedgerTable = ({ filters }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const handleExport = () => {
    const headers = ['ID', 'Timestamp', 'Event Type', 'Payment ID', 'Destination', 'Amount', 'Status'];
    const rows = MOCK_LEDGER.map(e => [
      e.id,
      new Date(e.timestamp).toISOString(),
      e.eventType,
      e.paymentId,
      e.destinationName || '',
      e.amount,
      e.status,
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ledger-export.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-surface-hover transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary border-b border-border">
              <th className="pb-2 text-left">Timestamp</th>
              <th className="pb-2 text-left">Event Type</th>
              <th className="pb-2 text-left">Payment ID</th>
              <th className="pb-2 text-left">Destination</th>
              <th className="pb-2 text-right">Amount</th>
              <th className="pb-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEDGER.map((entry) => (
              <tr key={entry.id} className="border-b border-border/50">
                <td className="py-2 text-xs">{formatDate(entry.timestamp)}</td>
                <td className="py-2">{eventTypeLabels[entry.eventType] || entry.eventType}</td>
                <td className="py-2 font-mono text-xs">{entry.paymentId}</td>
                <td className="py-2">{entry.destinationName || '—'}</td>
                <td className="py-2 text-right font-mono">{formatMoney(entry.amount)}</td>
                <td className="py-2">
                  <span className={cn(
                    'px-2 py-1 text-xs rounded-full',
                    entry.status === 'COMPLETED' && 'bg-success/10 text-success',
                    entry.status === 'PENDING' && 'bg-warning/10 text-warning',
                    entry.status === 'FAILED' && 'bg-error/10 text-error',
                  )}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LedgerTable;