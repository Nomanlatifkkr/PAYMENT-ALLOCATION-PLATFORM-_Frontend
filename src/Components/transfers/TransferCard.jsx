import { Building, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const statusConfig = {
  PENDING: { label: 'Pending', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  COMPLETED: { label: 'Completed', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  FAILED: { label: 'Failed', icon: XCircle, color: 'text-error', bg: 'bg-error/10' },
  REQUIRES_ACTION: { label: 'Requires Action', icon: AlertTriangle, color: 'text-error', bg: 'bg-error/10' },
};

const TransferCard = ({ transfer }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const StatusIcon = statusConfig[transfer.status]?.icon || Clock;
  const statusColor = statusConfig[transfer.status]?.color || 'text-text-secondary';
  const statusBg = statusConfig[transfer.status]?.bg || 'bg-surface-hover';

  return (
    <div className="bg-surface rounded-lg border border-border p-4 hover:shadow-sm transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg', statusBg, statusColor)}>
            <StatusIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{transfer.transferId}</span>
              <span className={cn('text-xs px-2 py-0.5 rounded-full', statusBg, statusColor)}>
                {statusConfig[transfer.status]?.label || transfer.status}
              </span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
              <span>Payment: {transfer.paymentId}</span>
              <span>Created: {formatDate(transfer.created)}</span>
              {transfer.completedAt && <span>Completed: {formatDate(transfer.completedAt)}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-right">
            <p className="text-sm font-medium">{transfer.destinationName}</p>
            <p className="text-xs text-text-tertiary">Destination</p>
          </div>
          <div className="text-right min-w-[100px]">
            <p className="text-lg font-bold">{formatMoney(transfer.amount)}</p>
            <p className="text-xs text-text-tertiary">Amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCard;