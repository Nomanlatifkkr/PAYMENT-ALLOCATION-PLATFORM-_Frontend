import { useState } from 'react';
import PaymentCard from './PaymentCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PaymentList = ({ payments }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (payments.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-soft/50 rounded-lg border border-dashed border-border">
        <p className="text-text-secondary">No payments found</p>
        <p className="text-xs text-text-tertiary mt-1">
          Try adjusting your filters or wait for incoming payments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <PaymentCard
          key={payment.id}
          payment={payment}
          isExpanded={expandedId === payment.id}
          onToggle={() => setExpandedId(expandedId === payment.id ? null : payment.id)}
        />
      ))}
    </div>
  );
};

export default PaymentList;