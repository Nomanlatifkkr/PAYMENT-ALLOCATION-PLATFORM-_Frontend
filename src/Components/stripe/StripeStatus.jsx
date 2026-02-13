import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock, Building } from 'lucide-react';
import { cn } from '../../lib/utils';

const statusConfig = {
  not_connected: {
    label: 'Not Connected',
    description: 'You haven\'t connected a Stripe account yet.',
    icon: XCircle,
    color: 'text-text-tertiary',
    bg: 'bg-surface-hover',
  },
  pending: {
    label: 'Pending',
    description: 'Your Stripe account is being verified. This usually takes a few minutes.',
    icon: Clock,
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  active: {
    label: 'Connected',
    description: 'Your Stripe account is active and ready to receive payouts.',
    icon: CheckCircle,
    color: 'text-success',
    bg: 'bg-success/10',
  },
  restricted: {
    label: 'Restricted',
    description: 'Your Stripe account has restrictions. Please check your Stripe dashboard.',
    icon: AlertTriangle,
    color: 'text-error',
    bg: 'bg-error/10',
  },
  disabled: {
    label: 'Disabled',
    description: 'Your Stripe account has been disabled. Contact Stripe support.',
    icon: XCircle,
    color: 'text-error',
    bg: 'bg-error/10',
  },
};

const StripeStatus = ({ status = 'not_connected', account, onRefresh, isLoading }) => {
  const config = statusConfig[status] || statusConfig.not_connected;
  const StatusIcon = config.icon;

  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('p-3 rounded-lg', config.bg, config.color)}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Stripe Account Status</h2>
            <p className={cn('text-sm mt-0.5', config.color)}>{config.label}</p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-lg transition-colors"
        >
          <RefreshCw className={cn('w-5 h-5', isLoading && 'animate-spin')} />
        </button>
      </div>

      <p className="text-text-secondary mb-4">{config.description}</p>

      {account && status !== 'not_connected' && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-tertiary">Account ID</p>
              <p className="text-sm font-mono">{account.id}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Business Name</p>
              <p className="text-sm">{account.businessName || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Email</p>
              <p className="text-sm">{account.email}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Country / Currency</p>
              <p className="text-sm">{account.country} / {account.currency?.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Connected since</p>
              <p className="text-sm">{formatDate(account.created)}</p>
            </div>
            <div>
              <p className="text-xs text-text-tertiary">Capabilities</p>
              <div className="flex gap-2 mt-1">
                {account.chargesEnabled && (
                  <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Charges</span>
                )}
                {account.payoutsEnabled && (
                  <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">Payouts</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StripeStatus;