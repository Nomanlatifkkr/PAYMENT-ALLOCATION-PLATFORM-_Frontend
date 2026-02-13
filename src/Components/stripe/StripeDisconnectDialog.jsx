import { AlertTriangle, X } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const StripeDisconnectDialog = ({ isOpen, onClose, onConfirm, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-surface rounded-xl max-w-md w-full shadow-xl border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold">Disconnect Stripe account</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-hover transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-error/10 text-error">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-text-primary mb-2">
                Are you sure you want to disconnect your Stripe account?
              </p>
              <p className="text-xs text-text-secondary">
                This will immediately stop all payouts. Any pending transfers will be canceled.
                You can reconnect at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-error hover:bg-error/80 text-white"
          >
            {isLoading ? 'Disconnecting...' : 'Yes, disconnect'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StripeDisconnectDialog;