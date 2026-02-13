import { useState } from 'react';
import { Download } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock payments data
const MOCK_PAYMENTS = [
  {
    id: 'pi_1234567890',
    date: '2026-02-12T14:23:00Z',
    customer: 'Acme Inc.',
    amount: 24500,
    status: 'COMPLETED',
  },
  {
    id: 'pi_1234567891',
    date: '2026-02-12T10:15:00Z',
    customer: 'Globex Corp',
    amount: 8900,
    status: 'PENDING',
  },
  {
    id: 'pi_1234567892',
    date: '2026-02-11T16:45:00Z',
    customer: 'Stark Industries',
    amount: 15600,
    status: 'TRANSFERS_CREATED',
  },
];

const PaymentsTable = ({ filters }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleExport = () => {
    const headers = ['ID', 'Date', 'Customer', 'Amount', 'Status'];
    const rows = MOCK_PAYMENTS.map(p => [
      p.id,
      new Date(p.date).toISOString(),
      p.customer,
      p.amount,
      p.status,
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments-export.csv';
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
              <th className="pb-2 text-left">Date</th>
              <th className="pb-2 text-left">Customer</th>
              <th className="pb-2 text-right">Amount</th>
              <th className="pb-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PAYMENTS.map((payment) => (
              <tr key={payment.id} className="border-b border-border/50">
                <td className="py-2 font-mono text-xs">{payment.id}</td>
                <td className="py-2">{formatDate(payment.date)}</td>
                <td className="py-2">{payment.customer}</td>
                <td className="py-2 text-right font-mono">{formatMoney(payment.amount)}</td>
                <td className="py-2">
                  <span className={cn(
                    'px-2 py-1 text-xs rounded-full',
                    payment.status === 'COMPLETED' && 'bg-success/10 text-success',
                    payment.status === 'PENDING' && 'bg-warning/10 text-warning',
                    payment.status === 'TRANSFERS_CREATED' && 'bg-primary/10 text-primary',
                  )}>
                    {payment.status}
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

export default PaymentsTable;