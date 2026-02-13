import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const eventTypeConfig = {
  PAYMENT_RECEIVED: { label: 'Payment Received', color: 'text-primary', bg: 'bg-primary/10' },
  ALLOCATION_CALCULATED: { label: 'Allocation Calculated', color: 'text-primary-light', bg: 'bg-primary-light/10' },
  ALLOCATION_FAILED: { label: 'Allocation Failed', color: 'text-error', bg: 'bg-error/10' },
  TRANSFER_CREATED: { label: 'Transfer Created', color: 'text-warning', bg: 'bg-warning/10' },
  TRANSFER_COMPLETED: { label: 'Transfer Completed', color: 'text-success', bg: 'bg-success/10' },
  TRANSFER_FAILED: { label: 'Transfer Failed', color: 'text-error', bg: 'bg-error/10' },
};

const statusIcon = {
  COMPLETED: CheckCircle,
  PENDING: Clock,
  FAILED: XCircle,
  REQUIRES_ACTION: AlertTriangle,
};

const LedgerTable = ({ entries }) => {
  const [expandedId, setExpandedId] = useState(null);

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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-soft/50 rounded-lg border border-dashed border-border">
        <p className="text-text-secondary">No ledger entries found</p>
        <p className="text-xs text-text-tertiary mt-1">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-soft border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Timestamp</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Event Type</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Payment ID</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Destination</th>
              <th className="px-4 py-3 text-right font-medium text-text-secondary">Amount</th>
              <th className="px-4 py-3 text-center font-medium text-text-secondary">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entries.map((entry) => {
              const StatusIcon = statusIcon[entry.status] || Clock;
              const eventConfig = eventTypeConfig[entry.eventType] || { label: entry.eventType, color: 'text-text-secondary', bg: 'bg-surface-hover' };
              return (
                <tr key={entry.id} className="hover:bg-surface-hover transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{formatDate(entry.timestamp)}</td>
                  <td className="px-4 py-3">
                    <span className={cn('px-2 py-1 rounded-full text-xs', eventConfig.bg, eventConfig.color)}>
                      {eventConfig.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{entry.paymentId}</td>
                  <td className="px-4 py-3">
                    {entry.destinationName ? (
                      <span>{entry.destinationName}</span>
                    ) : (
                      <span className="text-text-tertiary italic">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{formatMoney(entry.amount)}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <StatusIcon className={cn(
                        'w-4 h-4',
                        entry.status === 'COMPLETED' && 'text-success',
                        entry.status === 'PENDING' && 'text-warning',
                        entry.status === 'FAILED' && 'text-error'
                      )} />
                      <span className="text-xs">{entry.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                      className="p-1 hover:bg-surface rounded"
                    >
                      {expandedId === entry.id ? (
                        <ChevronUp className="w-4 h-4 text-text-secondary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-text-secondary" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded details (could show raw JSON or additional metadata) */}
      {expandedId && (
        <div className="p-4 bg-surface-soft border-t border-border">
          <pre className="text-xs overflow-auto max-h-64 p-3 bg-surface rounded border border-border">
            {JSON.stringify(entries.find(e => e.id === expandedId), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default LedgerTable;