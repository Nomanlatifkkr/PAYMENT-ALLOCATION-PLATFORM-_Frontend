import { useState } from 'react';
import StripeStatus from '../components/stripe/StripeStatus';
import StripeConnectButton from '../components/stripe/StripeConnectButton';
import StripeDisconnectDialog from '../components/stripe/StripeDisconnectDialog';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock connection status – will come from API
// Possible values: 'not_connected', 'pending', 'active', 'restricted', 'disabled'
const MOCK_CONNECTION_STATUS = 'active'; // change to test different states

const MOCK_STRIPE_ACCOUNT = {
  id: 'acct_123456789',
  email: 'merchant@example.com',
  businessName: 'SplitEdge Demo',
  country: 'US',
  currency: 'usd',
  chargesEnabled: true,
  payoutsEnabled: true,
  detailsSubmitted: true,
  created: '2026-01-15T10:30:00Z',
};

const Stripe = () => {
  const [connectionStatus, setConnectionStatus] = useState(MOCK_CONNECTION_STATUS);
  const [stripeAccount, setStripeAccount] = useState(
    MOCK_CONNECTION_STATUS !== 'not_connected' ? MOCK_STRIPE_ACCOUNT : null
  );
  const [showDisconnectDialog, setShowDisconnectDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // API call to create Stripe Connect onboarding link
      // const response = await fetch('/api/stripe/onboarding', { method: 'POST' });
      // const { url } = await response.json();
      // window.location.href = url;
      
      // Mock redirect (simulate onboarding)
      console.log('Redirecting to Stripe...');
      // After onboarding, Stripe redirects back to /stripe?success=true
    } catch (error) {
      console.error('Failed to create onboarding link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      // API call to disconnect Stripe account
      // await fetch('/api/stripe/disconnect', { method: 'POST' });
      setConnectionStatus('not_connected');
      setStripeAccount(null);
      setShowDisconnectDialog(false);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setIsLoading(true);
    try {
      // API call to refresh Stripe account status
      // const response = await fetch('/api/stripe/status');
      // const data = await response.json();
      // setConnectionStatus(data.status);
      // setStripeAccount(data.account);
    } catch (error) {
      console.error('Failed to refresh status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stripe Connection</h1>
        <p className="text-text-secondary mt-1">
          Connect your Stripe account to receive payouts and process payments
        </p>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column – status and actions */}
        <div className="lg:col-span-2 space-y-6">
          <StripeStatus
            status={connectionStatus}
            account={stripeAccount}
            onRefresh={handleRefreshStatus}
            isLoading={isLoading}
          />

          {/* Action buttons */}
          {connectionStatus === 'not_connected' && (
            <StripeConnectButton onClick={handleConnect} isLoading={isLoading} />
          )}

          {(connectionStatus === 'active' || connectionStatus === 'restricted' || connectionStatus === 'pending') && (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.open('https://dashboard.stripe.com', '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors"
              >
                Stripe Dashboard
                <ExternalLink className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDisconnectDialog(true)}
                className="px-4 py-2 border border-error/30 text-error rounded-lg text-sm font-medium hover:bg-error/10 transition-colors"
              >
                Disconnect account
              </button>
            </div>
          )}
        </div>

        {/* Right column – info card */}
        <div className="bg-surface-soft rounded-lg p-6 border border-border h-fit">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            About Stripe Connect
          </h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Funds are held by Stripe and transferred instantly to your connected accounts.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Your main destination account will receive the remainder after reserve splits.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Reserve destinations must be connected separately via the Destinations page.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              Payout arrival times vary by bank (usually 2-3 business days).
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-border">
            <a
              href="https://stripe.com/docs/connect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary-light flex items-center gap-1"
            >
              Learn more about Stripe Connect
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Disconnect confirmation dialog */}
      <StripeDisconnectDialog
        isOpen={showDisconnectDialog}
        onClose={() => setShowDisconnectDialog(false)}
        onConfirm={handleDisconnect}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Stripe;