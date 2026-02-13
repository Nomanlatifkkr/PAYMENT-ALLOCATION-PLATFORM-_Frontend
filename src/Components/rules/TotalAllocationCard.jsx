import { CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const TotalAllocationCard = ({ totalPercentage, remainingPercentage, isValid, ruleCount, maxReserves }) => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <h3 className="font-medium mb-4">Allocation Summary</h3>
      
      <div className="space-y-4">
        {/* Total allocated */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text-secondary">Reserves total</span>
            <span className={cn('font-medium', totalPercentage > 100 ? 'text-error' : 'text-text-primary')}>
              {totalPercentage}%
            </span>
          </div>
          <div className="h-2 bg-surface-soft rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                totalPercentage <= 100 ? 'bg-primary' : 'bg-error'
              )}
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Remainder to main */}
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Remainder to main</span>
          <span className="font-medium">{remainingPercentage}%</span>
        </div>

        {/* Validation status */}
        <div className={cn(
          'flex items-start gap-2 p-3 rounded-lg text-sm',
          isValid
            ? 'bg-success/10 text-success'
            : 'bg-error/10 text-error'
        )}>
          {isValid ? (
            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>
            {isValid
              ? 'Allocation valid. Remainder will be sent to main destination.'
              : totalPercentage > 100
              ? `Total exceeds 100% by ${totalPercentage - 100}%. Reduce reserve percentages.`
              : 'All percentages must be between 1 and 100.'}
          </span>
        </div>

        {/* Rule count */}
        <div className="text-xs text-text-tertiary pt-2 border-t border-border">
          {ruleCount} of {maxReserves === Infinity ? 'unlimited' : maxReserves} reserve rules used
        </div>
      </div>
    </div>
  );
};

export default TotalAllocationCard;