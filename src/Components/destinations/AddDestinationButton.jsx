import { useState } from 'react';

import { Plus, Loader2, Zap, Crown } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

const AddDestinationButton = ({ type = 'reserve', tier, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock current reserve count - would come from API/context
  const currentReserveCount = 2;
  
  const tierLimits = {
    free: { max: 0, canAdd: false },
    paid: { max: 2, canAdd: currentReserveCount < 2 },
    premium: { max: Infinity, canAdd: true },
  };

  const limit = tierLimits[tier] || tierLimits.free;
  const canAdd = type === 'main' ? true : limit.canAdd;
  
  const getButtonText = () => {
    if (isLoading) return 'Redirecting to Stripe...';
    if (type === 'main') return 'Connect main account';
    if (tier === 'paid' && !limit.canAdd) return 'Upgrade to add more';
    if (tier === 'free') return 'Upgrade to add reserves';
    return 'Connect reserve account';
  };

  const handleConnect = async () => {
    if (!canAdd || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // In production: API call to create Stripe Connect onboarding link
      // const response = await fetch('/api/destinations/onboarding', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, tier }),
      // });
      // const data = await response.json();
      
      // Mock onboarding URL
      const mockOnboardingUrl = `https://connect.stripe.com/express/onboarding/test_${Date.now()}`;
      
      // Store the return URL in sessionStorage to handle redirect back
      sessionStorage.setItem('stripe_onboarding_type', type);
      sessionStorage.setItem('stripe_onboarding_tier', tier);
      
      // Redirect to Stripe
      window.location.href = mockOnboardingUrl;
      
    } catch (err) {
      setError('Failed to create onboarding link. Please try again.');
      console.error('Onboarding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // If free tier trying to add reserve - show upgrade button
  if (type === 'reserve' && tier === 'free') {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => window.location.href = '/subscription'}
        className="whitespace-nowrap"
      >
        <Zap className="w-4 h-4 mr-1" />
        Upgrade to add reserves
      </Button>
    );
  }

  // If paid tier at limit - show upgrade button
  if (type === 'reserve' && tier === 'paid' && !limit.canAdd) {
    return (
      <Button
        variant="primary"
        size="sm"
        onClick={() => window.location.href = '/subscription'}
        className="whitespace-nowrap"
      >
        <Crown className="w-4 h-4 mr-1" />
        Upgrade to Premium
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <Button
        variant={type === 'main' ? 'primary' : 'outline'}
        size="sm"
        onClick={handleConnect}
        disabled={!canAdd || isLoading}
        className={cn(
          'whitespace-nowrap transition-all',
          !canAdd && !isLoading && 'opacity-50 cursor-not-allowed',
          isLoading && 'cursor-wait'
        )}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        ) : (
          <Plus className="w-4 h-4 mr-1" />
        )}
        {getButtonText()}
      </Button>
      
      {error && (
        <p className="text-xs text-error">{error}</p>
      )}
      
      {type === 'reserve' && tier === 'paid' && (
        <p className="text-xs text-text-tertiary">
          {currentReserveCount} of {limit.max} reserves used
        </p>
      )}
    </div>
  );
};

export default AddDestinationButton;