import { useState } from 'react';
import { Calculator } from 'lucide-react';

const EXAMPLE_PAYMENT = 10000; // $100.00 in cents

const AllocationPreview = ({ rules, totalPercentage }) => {
  const [paymentAmount, setPaymentAmount] = useState(EXAMPLE_PAYMENT);
  
  // Calculate splits
  const reserves = rules.map((rule) => ({
    name: rule.destinationName,
    percentage: rule.percentage,
    amount: Math.floor(paymentAmount * (rule.percentage / 100)),
  }));

  const totalReserve = reserves.reduce((sum, r) => sum + r.amount, 0);
  const mainAmount = paymentAmount - totalReserve;

  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="font-medium">Example allocation</h3>
      </div>

      {/* Payment amount input */}
      <div className="mb-4">
        <label className="text-sm text-text-secondary block mb-1">Payment amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">$</span>
          <input
            type="number"
            value={paymentAmount / 100}
            onChange={(e) => setPaymentAmount(Math.round(parseFloat(e.target.value) * 100) || 0)}
            className="w-full pl-8 pr-4 py-2 border border-border rounded-lg bg-surface-soft focus:outline-none focus:ring-2 focus:ring-primary/50"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      {rules.length > 0 ? (
        <div className="space-y-3">
          {/* Reserve allocations */}
          <div className="space-y-2">
            {reserves.map((reserve, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  {reserve.name} ({reserve.percentage}%)
                </span>
                <span className="font-medium">{formatMoney(reserve.amount)}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2" />

          {/* Main destination */}
          <div className="flex justify-between text-sm font-medium">
            <span>Main destination (remainder)</span>
            <span className="text-primary">{formatMoney(mainAmount)}</span>
          </div>

          {/* Total */}
          <div className="flex justify-between text-xs text-text-tertiary pt-2">
            <span>Total payment</span>
            <span>{formatMoney(paymentAmount)}</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-text-secondary text-center py-4">
          Add reserve rules to see example allocation
        </p>
      )}
    </div>
  );
};

export default AllocationPreview;