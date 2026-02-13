import { useState } from 'react';
import { 
  Building, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  MoreHorizontal,
  RefreshCw,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const statusConfig = {
  ACTIVE: {
    label: 'Active',
    icon: CheckCircle,
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
  },
  PENDING_ONBOARDING: {
    label: 'Pending',
    icon: Clock,
    color: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/20',
  },
  RESTRICTED: {
    label: 'Restricted',
    icon: AlertTriangle,
    color: 'text-error',
    bg: 'bg-error/10',
    border: 'border-error/20',
  },
  DISABLED: {
    label: 'Disabled',
    icon: XCircle,
    color: 'text-text-tertiary',
    bg: 'bg-surface-hover',
    border: 'border-border',
  },
};

const DestinationCard = ({ destination, type, tier }) => {
  const [showActions, setShowActions] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);
  
  const { 
    bankName, 
    accountHolder, 
    last4, 
    status, 
    isMain, 
    percentage,
    connectedAt 
  } = destination;

  const StatusIcon = statusConfig[status]?.icon || Building;
  const statusColor = statusConfig[status]?.color || 'text-text-secondary';
  const statusBg = statusConfig[status]?.bg || 'bg-surface-hover';
  const statusBorder = statusConfig[status]?.border || 'border-border';

  const canRemove = type === 'reserve' && status !== 'PENDING_ONBOARDING';
  const canResume = status === 'PENDING_ONBOARDING';
  const canRetry = status === 'RESTRICTED' || status === 'DISABLED';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleRemove = () => {
    if (showConfirmRemove) {
      setIsRemoving(true);
      // API call would go here
      setTimeout(() => {
        setIsRemoving(false);
        setShowConfirmRemove(false);
        setShowActions(false);
        // Show success toast
      }, 1000);
    } else {
      setShowConfirmRemove(true);
    }
  };

  const handleResumeOnboarding = () => {
    // Redirect to Stripe onboarding
    window.location.href = `https://connect.stripe.com/express/onboarding/${destination.id}`;
  };

  return (
    <div 
      className={cn(
        'bg-surface rounded-lg p-4 border transition-all duration-200',
        status === 'ACTIVE' ? 'border-border hover:border-primary/30 hover:shadow-md' : 'border-border',
        isMain && 'border-primary/30 bg-primary/5'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={cn('p-2 rounded-lg', statusBg, statusColor)}>
            <Building className="w-5 h-5" />
          </div>
          
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-medium text-text-primary">{bankName}</h3>
              {isMain && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                  Main
                </span>
              )}
              <span className={cn('text-xs px-2 py-0.5 rounded-full border flex items-center gap-1', statusBg, statusBorder, statusColor)}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig[status]?.label || status}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mt-1.5 text-xs">
              <span className="text-text-secondary">{accountHolder}</span>
              <span className="text-text-tertiary">•••• {last4}</span>
              {connectedAt && (
                <span className="text-text-tertiary">Connected {formatDate(connectedAt)}</span>
              )}
            </div>
            
            {type === 'reserve' && percentage && (
              <div className="mt-2">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {percentage}% allocation
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-text-secondary" />
          </button>

          {showActions && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowActions(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-surface rounded-lg border border-border shadow-lg z-50 py-1">
                {canResume && (
                  <button
                    onClick={handleResumeOnboarding}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Resume onboarding
                  </button>
                )}
                
                {canRetry && (
                  <button
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-primary hover:bg-surface-hover transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry verification
                  </button>
                )}
                
                {canRemove && !showConfirmRemove && (
                  <button
                    onClick={handleRemove}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove account
                  </button>
                )}
                
                {showConfirmRemove && (
                  <>
                    <div className="px-3 py-2 text-xs text-text-secondary border-b border-border">
                      Are you sure?
                    </div>
                    <button
                      onClick={handleRemove}
                      disabled={isRemoving}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors disabled:opacity-50"
                    >
                      {isRemoving ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4" />
                      )}
                      Yes, remove
                    </button>
                    <button
                      onClick={() => setShowConfirmRemove(false)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-secondary hover:bg-surface-hover transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Pending onboarding helper */}
      {status === 'PENDING_ONBOARDING' && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-text-secondary mb-2">
            Complete Stripe verification to activate this account
          </p>
          <button
            onClick={handleResumeOnboarding}
            className="text-xs font-medium text-primary hover:text-primary-light transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Resume onboarding →
          </button>
        </div>
      )}

      {/* Restricted account warning */}
      {status === 'RESTRICTED' && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-error mb-1">Account requires attention</p>
          <p className="text-xs text-text-secondary">
            Verification failed. Please update bank details.
          </p>
        </div>
      )}
    </div>
  );
};

export default DestinationCard;