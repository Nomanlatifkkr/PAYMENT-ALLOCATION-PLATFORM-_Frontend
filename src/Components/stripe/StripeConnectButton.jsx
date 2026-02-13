import { Loader2, Zap } from 'lucide-react';
import Button from '../ui/Button';

const StripeConnectButton = ({ onClick, isLoading }) => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold mb-2">Connect your Stripe account</h3>
      <p className="text-text-secondary mb-4">
        You'll be redirected to Stripe to complete the onboarding process. It only takes a few minutes.
      </p>
      <Button
        variant="primary"
        size="lg"
        onClick={onClick}
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Zap className="w-5 h-5 mr-2" />
        )}
        {isLoading ? 'Redirecting...' : 'Connect with Stripe'}
      </Button>
      <p className="text-xs text-text-tertiary mt-3">
        By connecting, you agree to the Stripe Connected Account Agreement.
      </p>
    </div>
  );
};

export default StripeConnectButton;