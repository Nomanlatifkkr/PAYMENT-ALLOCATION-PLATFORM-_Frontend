import { useState } from 'react';
import { Plus, ChevronDown, Zap, Crown } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const AddRuleButton = ({ destinations, onAdd, disabled, tier, currentCount, maxCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  // If no destinations available and not at limit
  if (destinations.length === 0 && currentCount < maxCount) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.location.href = '/destinations'}
        className="whitespace-nowrap"
      >
        <Plus className="w-4 h-4 mr-1" />
        Connect reserve first
      </Button>
    );
  }

  // If at tier limit
  if (currentCount >= maxCount && tier !== 'premium') {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => window.location.href = '/subscription'}
        className="whitespace-nowrap"
      >
        <Crown className="w-4 h-4 mr-1" />
        Upgrade to add more
      </Button>
    );
  }

  // If premium and no destinations left
  if (destinations.length === 0) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="whitespace-nowrap opacity-50 cursor-not-allowed"
      >
        <Plus className="w-4 h-4 mr-1" />
        No reserves available
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="primary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="whitespace-nowrap"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add rule
        <ChevronDown className={cn('w-4 h-4 ml-1 transition-transform', isOpen && 'rotate-180')} />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-64 bg-surface rounded-lg border border-border shadow-lg z-50 py-1">
            {destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => {
                  onAdd(dest.id, dest.bankName);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-surface-hover transition-colors"
              >
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Building className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{dest.bankName}</p>
                  <p className="text-xs text-text-tertiary">•••• {dest.last4}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AddRuleButton;