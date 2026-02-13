import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const activities = [
  {
    id: 1,
    customer: 'Acme Inc.',
    amount: '$2,450',
    status: 'completed',
    time: '2 min ago',
  },
  {
    id: 2,
    customer: 'Globex Corp',
    amount: '$1,280',
    status: 'pending',
    time: '15 min ago',
  },
  {
    id: 3,
    customer: 'Stark Industries',
    amount: '$3,720',
    status: 'completed',
    time: '1 hour ago',
  },
  {
    id: 4,
    customer: 'Wayne Enterprises',
    amount: '$980',
    status: 'failed',
    time: '3 hours ago',
  },
];

const statusConfig = {
  completed: { icon: CheckCircle, color: 'text-success', label: 'Completed' },
  pending: { icon: Clock, color: 'text-warning', label: 'Pending' },
  failed: { icon: XCircle, color: 'text-error', label: 'Failed' },
};

const ActivityFeed = () => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Allocations</h3>
        <button className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
          View All →
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => {
          const StatusIcon = statusConfig[activity.status].icon;
          return (
            <div key={activity.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-lg bg-surface-soft', statusConfig[activity.status].color)}>
                  <StatusIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.customer}</p>
                  <p className="text-xs text-text-tertiary">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{activity.amount}</p>
                <p className={cn('text-xs', statusConfig[activity.status].color)}>
                  {statusConfig[activity.status].label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;