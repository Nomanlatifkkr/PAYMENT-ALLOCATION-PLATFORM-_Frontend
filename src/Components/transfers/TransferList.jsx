import TransferCard from './TransferCard';
import { cn } from '../../lib/utils';
const TransferList = ({ transfers }) => {
  if (transfers.length === 0) {
    return (
      <div className="text-center py-12 bg-surface-soft/50 rounded-lg border border-dashed border-border">
        <p className="text-text-secondary">No transfers found</p>
        <p className="text-xs text-text-tertiary mt-1">
          Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transfers.map((transfer) => (
        <TransferCard key={transfer.id} transfer={transfer} />
      ))}
    </div>
  );
};

export default TransferList;