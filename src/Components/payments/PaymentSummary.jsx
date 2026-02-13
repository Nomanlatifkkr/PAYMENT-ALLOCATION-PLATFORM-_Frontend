import { DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';
const PaymentSummary = ({ summary }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const cards = [
    {
      title: 'Total Processed',
      value: formatMoney(summary.total),
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      title: 'Completed',
      value: summary.completed,
      icon: CheckCircle,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      title: 'Failed',
      value: summary.failed,
      icon: XCircle,
      color: 'text-error',
      bg: 'bg-error/10',
    },
    {
      title: 'Total Payments',
      value: summary.count,
      icon: Clock,
      color: 'text-text-secondary',
      bg: 'bg-surface-hover',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-surface rounded-lg p-4 border border-border shadow-sm flex items-center gap-3"
        >
          <div className={cn('p-2 rounded-lg', card.bg, card.color)}>
            <card.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">{card.title}</p>
            <p className="text-lg font-semibold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentSummary;