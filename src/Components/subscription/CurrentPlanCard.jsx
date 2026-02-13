import { Crown, Zap, Star, Calendar, CreditCard } from 'lucide-react';
import { cn } from '../../lib/utils';

const tierConfig = {
  free: { name: 'Free', icon: Star, color: 'text-text-secondary', bg: 'bg-surface-hover' },
  paid: { name: 'Paid', icon: Zap, color: 'text-primary', bg: 'bg-primary/10' },
  premium: { name: 'Premium', icon: Crown, color: 'text-warning', bg: 'bg-warning/10' },
};

const CurrentPlanCard = ({ subscription, onManage, isLoading }) => {
  const { tier, status, currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd } = subscription;
  const config = tierConfig[tier] || tierConfig.free;
  const Icon = config.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn('p-3 rounded-lg', config.bg, config.color)}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Current Plan</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={cn('text-sm font-medium px-2 py-0.5 rounded-full', config.bg, config.color)}>
                {config.name}
              </span>
              {cancelAtPeriodEnd && (
                <span className="text-xs bg-warning/10 text-warning px-2 py-0.5 rounded-full">
                  Cancels at period end
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onManage}
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Manage Billing'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary">Current period:</span>
          <span className="font-medium">
            {formatDate(currentPeriodStart)} – {formatDate(currentPeriodEnd)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary">Status:</span>
          <span className={cn(
            'font-medium',
            status === 'active' ? 'text-success' : 'text-error'
          )}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanCard;