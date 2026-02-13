import { useState } from 'react';
import { ChevronDown, ChevronUp, Building, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const statusConfig = {
  PAID_RECEIVED: { label: 'Received', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  ALLOCATED: { label: 'Allocated', icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
  TRANSFERS_CREATED: { label: 'Transfers Created', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
  COMPLETED: { label: 'Completed', icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
  FAILED: { label: 'Failed', icon: XCircle, color: 'text-error', bg: 'bg-error/10' },
  REQUIRES_ACTION: { label: 'Requires Action', icon: AlertTriangle, color: 'text-error', bg: 'bg-error/10' },
};

const transferStatusConfig = {
  PENDING: { icon: Clock, color: 'text-warning' },
  TRANSFERS_CREATED: { icon: Clock, color: 'text-warning' },
  COMPLETED: { icon: CheckCircle, color: 'text-success' },
  FAILED: { icon: XCircle, color: 'text-error' },
};

const PaymentCard = ({ payment, isExpanded, onToggle }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const StatusIcon = statusConfig[payment.status]?.icon || Clock;
  const statusColor = statusConfig[payment.status]?.color || 'text-text-secondary';
  const statusBg = statusConfig[payment.status]?.bg || 'bg-surface-hover';

  return (
    <div className="bg-surface rounded-lg border border-border shadow-sm overflow-hidden">
      {/* Header (always visible) */}
      <div
        onClick={onToggle}
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-hover transition-colors"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={cn('p-2 rounded-lg', statusBg, statusColor)}>
            <StatusIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
            <div>
              <p className="text-xs text-text-secondary">Payment ID</p>
              <p className="text-sm font-mono">{payment.id.slice(0, 8)}...</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Date</p>
              <p className="text-sm">{formatDate(payment.date)}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Customer</p>
              <p className="text-sm font-medium">{payment.customer}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Amount</p>
              <p className="text-sm font-bold">{formatMoney(payment.amount)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn('text-xs px-2 py-1 rounded-full', statusBg, statusColor)}>
            {statusConfig[payment.status]?.label || payment.status}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-text-secondary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-text-secondary" />
          )}
        </div>
      </div>

      {/* Expanded allocation breakdown */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-surface-soft/30">
          <h4 className="text-sm font-medium mb-3">Allocation Breakdown</h4>
          <div className="space-y-2">
            {payment.allocation.map((item, idx) => {
              const TransferIcon = transferStatusConfig[item.transferStatus]?.icon || Clock;
              const transferColor = transferStatusConfig[item.transferStatus]?.color || 'text-text-secondary';
              return (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-1.5 rounded-lg', item.main ? 'bg-primary/10' : 'bg-surface-hover')}>
                      <Building className={cn('w-4 h-4', item.main ? 'text-primary' : 'text-text-secondary')} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {item.destinationName}
                        {item.main && <span className="ml-2 text-xs text-primary">(Main)</span>}
                      </p>
                      {!item.main && <p className="text-xs text-text-secondary">{item.percentage}%</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">{formatMoney(item.amount)}</span>
                    <div className="flex items-center gap-1 min-w-[80px] justify-end">
                      <TransferIcon className={cn('w-3 h-3', transferColor)} />
                      <span className="text-xs text-text-secondary">{item.transferStatus}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;