import DestinationCard from './DestinationCard';
import { Landmark } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock data – will be replaced by API calls
const MOCK_DESTINATIONS = {
  main: [
    {
      id: 'dest_1',
      bankName: 'Chase Bank',
      accountHolder: 'Jevline kiet',
      last4: '1234',
      status: 'ACTIVE',
      isMain: true,
      connectedAt: '2026-01-15T10:30:00Z',
    },
  ],
  reserve: [
    {
      id: 'dest_2',
      bankName: 'Bank of America',
      accountHolder: 'Jevline kiet',
      last4: '5678',
      status: 'ACTIVE',
      isMain: false,
      percentage: 15,
      connectedAt: '2026-01-20T14:20:00Z',
    },
    {
      id: 'dest_3',
      bankName: 'Wells Fargo',
      accountHolder: 'Jevline kiet',
      last4: '9012',
      status: 'PENDING_ONBOARDING',
      isMain: false,
      percentage: 25,
      connectedAt: '2026-02-01T09:15:00Z',
    },
    {
      id: 'dest_4',
      bankName: 'Silicon Valley Bank',
      accountHolder: 'Jevline kiet',
      last4: '3456',
      status: 'RESTRICTED',
      isMain: false,
      percentage: 10,
      connectedAt: '2026-01-10T11:45:00Z',
    },
  ],
};

const DestinationList = ({ type = 'reserve', tier, limit }) => {
  const destinations = MOCK_DESTINATIONS[type] || [];
  
  // Apply tier limits for reserve destinations
  const visibleDestinations = type === 'reserve' && limit 
    ? destinations.slice(0, limit) 
    : destinations;
  
  const hasReachedLimit = type === 'reserve' && 
    limit && 
    destinations.length >= limit && 
    tier !== 'premium';

  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-surface-soft/50 rounded-lg border border-dashed border-border">
        <div className="p-3 rounded-full bg-surface mb-3">
          <Landmark className="w-6 h-6 text-text-tertiary" />
        </div>
        <p className="text-text-secondary text-sm font-medium">
          {type === 'main' 
            ? 'No main destination connected yet'
            : 'No reserve destinations connected'}
        </p>
        <p className="text-xs text-text-tertiary mt-1 text-center max-w-sm">
          {type === 'main'
            ? 'Connect your primary bank account to receive remaining funds'
            : 'Add reserve accounts to automatically split incoming payments'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visibleDestinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            type={type}
            tier={tier}
          />
        ))}
      </div>
      
      {hasReachedLimit && (
        <p className="text-xs text-text-tertiary mt-2 text-center">
          You've reached your tier limit of {limit} reserve {limit === 1 ? 'account' : 'accounts'}.{' '}
          <button className="text-primary hover:text-primary-light font-medium">
            Upgrade for more →
          </button>
        </p>
      )}
      
      {type === 'reserve' && destinations.length > visibleDestinations.length && (
        <p className="text-xs text-text-tertiary mt-2 text-center">
          +{destinations.length - visibleDestinations.length} more reserve{' '}
          {destinations.length - visibleDestinations.length === 1 ? 'account' : 'accounts'} available with Premium
        </p>
      )}
    </div>
  );
};

export default DestinationList;