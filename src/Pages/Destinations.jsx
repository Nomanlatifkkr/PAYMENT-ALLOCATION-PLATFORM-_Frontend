import { useState } from 'react';
import DestinationList from '../components/destinations/DestinationList';
import AddDestinationButton from '../components/destinations/AddDestinationButton';
import TierBadge from '../components/destinations/TierBadge';
import { cn } from '../lib/utils';

// Mock user tier – will come from API later
const MOCK_USER_TIER = 'paid'; // 'free', 'paid', 'premium'

const Destinations = () => {
  const [tier] = useState(MOCK_USER_TIER);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bank Accounts</h1>
          <p className="text-text-secondary mt-1">
            Connect and manage your payout destinations
          </p>
        </div>
        <TierBadge tier={tier} />
      </div>

      {/* Main destination section */}
      <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold mb-4">Main Destination</h2>
        <p className="text-sm text-text-secondary mb-4">
          All remaining funds after reserve allocations are sent here. One main account is required.
        </p>
        <DestinationList type="main" tier={tier} />
      </div>

      {/* Reserve destinations section */}
      <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Reserve Destinations</h2>
            <p className="text-sm text-text-secondary mt-1">
              Optional accounts for percentage‑based splits. Your tier allows{' '}
              {tier === 'free' && '0 reserves'}
              {tier === 'paid' && 'up to 2 reserves'}
              {tier === 'premium' && 'unlimited reserves'}.
            </p>
          </div>
          <AddDestinationButton type="reserve" tier={tier} />
        </div>
        <DestinationList type="reserve" tier={tier} />
      </div>

      {/* Info message for free tier */}
      {tier === 'free' && (
        <div className="bg-surface-soft rounded-lg p-4 border border-border text-sm">
          <p className="text-text-secondary">
            <span className="font-medium text-text-primary">Free plan:</span> You can only have a main destination.{' '}
            <button className="text-primary hover:text-primary-light font-medium transition-colors">
              Upgrade to add reserves →
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Destinations;