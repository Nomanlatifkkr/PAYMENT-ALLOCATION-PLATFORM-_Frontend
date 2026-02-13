import { Download } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock allocations data (per split)
const MOCK_ALLOCATIONS = [
  {
    id: 'alloc_1',
    paymentId: 'pi_1234567890',
    destinationName: 'Bank of America',
    percentage: 15,
    amount: 3675,
    status: 'COMPLETED',
  },
  {
    id: 'alloc_2',
    paymentId: 'pi_1234567890',
    destinationName: 'Wells Fargo',
    percentage: 25,
    amount: 6125,
    status: 'COMPLETED',
  },
  {
    id: 'alloc_3',
    paymentId: 'pi_1234567890',
    destinationName: 'Chase Bank',
    percentage: 60,
    amount: 14700,
    status: 'COMPLETED',
  },
  {
    id: 'alloc_4',
    paymentId: 'pi_1234567891',
    destinationName: 'Bank of America',
    percentage: 15,
    amount: 1335,
    status: 'PENDING',
  },
];

const AllocationsTable = ({ filters }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const handleExport = () => {
    const headers = ['ID', 'Payment ID', 'Destination', 'Percentage', 'Amount', 'Status'];
    const rows = MOCK_ALLOCATIONS.map(a => [
      a.id,
      a.paymentId,
      a.destinationName,
      a.percentage,
      a.amount,
      a.status,
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'allocations-export.csv';
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
              <th className="pb-2 text-left">Payment ID</th>
              <th className="pb-2 text-left">Destination</th>
              <th className="pb-2 text-right">Percentage</th>
              <th className="pb-2 text-right">Amount</th>
              <th className="pb-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ALLOCATIONS.map((alloc) => (
              <tr key={alloc.id} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs">{alloc.paymentId}</td>
                <td className="py-2">{alloc.destinationName}</td>
                <td className="py-2 text-right">{alloc.percentage}%</td>
                <td className="py-2 text-right font-mono">{formatMoney(alloc.amount)}</td>
                <td className="py-2">
                  <span className={cn(
                    'px-2 py-1 text-xs rounded-full',
                    alloc.status === 'COMPLETED' && 'bg-success/10 text-success',
                    alloc.status === 'PENDING' && 'bg-warning/10 text-warning',
                  )}>
                    {alloc.status}
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

export default AllocationsTable;