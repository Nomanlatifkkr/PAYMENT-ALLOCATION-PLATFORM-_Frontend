import { Crown, Zap, Star } from 'lucide-react';
import { cn } from '../../lib/utils';

const tierConfig = {
  free: {
    name: 'Free',
    icon: Star,
    color: 'text-text-secondary',
    bg: 'bg-surface-hover',
    border: 'border-border',
  },
  paid: {
    name: 'Paid',
    icon: Zap,
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  premium: {
    name: 'Premium',
    icon: Crown,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
  },
};

const TierBadge = ({ tier = 'free', showUpgrade = true }) => {
  const config = tierConfig[tier] || tierConfig.free;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full border',
          config.bg,
          config.border
        )}
      >
        <Icon className={cn('w-4 h-4', config.color)} />
        <span className={cn('text-sm font-medium', config.color)}>
          {config.name}
        </span>
      </div>
      
      {tier === 'free' && showUpgrade && (
        <button className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
          Upgrade plan →
        </button>
      )}
      
      {tier === 'paid' && showUpgrade && (
        <button className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
          Upgrade to Premium →
        </button>
      )}
    </div>
  );
};

export default TierBadge;