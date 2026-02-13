import { CreditCard, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

const cardBrands = {
  visa: { color: 'text-blue-600', bg: 'bg-blue-100' },
  mastercard: { color: 'text-orange-600', bg: 'bg-orange-100' },
  amex: { color: 'text-indigo-600', bg: 'bg-indigo-100' },
  discover: { color: 'text-purple-600', bg: 'bg-purple-100' },
};

const PaymentMethodCard = ({ paymentMethod }) => {
  const { brand, last4, expMonth, expYear } = paymentMethod || {};
  const brandConfig = cardBrands[brand] || { color: 'text-text-secondary', bg: 'bg-surface-hover' };

  const formatExpiry = () => {
    if (!expMonth || !expYear) return '';
    return `${expMonth.toString().padStart(2, '0')}/${expYear.toString().slice(-2)}`;
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border h-fit">
      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
      {paymentMethod ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', brandConfig.bg, brandConfig.color)}>
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium capitalize">{brand} •••• {last4}</p>
              <p className="text-xs text-text-secondary">Expires {formatExpiry()}</p>
            </div>
          </div>
          <button className="text-sm text-primary hover:text-primary-light transition-colors">
            Update payment method →
          </button>
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-text-secondary mb-3">No payment method on file</p>
          <button className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors">
            <Plus className="w-4 h-4" />
            Add payment method
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;