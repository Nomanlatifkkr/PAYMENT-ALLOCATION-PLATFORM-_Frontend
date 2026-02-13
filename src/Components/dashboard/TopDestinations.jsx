import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
const destinations = [
  {
    name: 'Main Account',
    amount: '$27,064',
    volume: '127 payments',
    percentage: '↑ 12%',
    status: 'in stock', // just for visual match
  },
  {
    name: 'Marketing Reserve',
    amount: '$2,889',
    volume: '$40/unit',
    percentage: '↑ 8%',
    status: 'out of stock',
  },
  {
    name: 'R&D Reserve',
    amount: '$1,890',
    volume: '120 units',
    percentage: '↑ 5%',
    status: 'in stock',
  },
];

const TopDestinations = () => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Destinations</h3>
        <button className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
          See Details →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-secondary border-b border-border">
              <th className="pb-2 text-left font-medium">Destination</th>
              <th className="pb-2 text-left font-medium">Amount</th>
              <th className="pb-2 text-left font-medium">Volume</th>
              <th className="pb-2 text-left font-medium">Trend</th>
              <th className="pb-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((item, idx) => (
              <tr key={idx} className="border-b border-border/50 last:border-0">
                <td className="py-3 font-medium">{item.name}</td>
                <td className="py-3">{item.amount}</td>
                <td className="py-3 text-text-secondary">{item.volume}</td>
                <td className="py-3">
                  <span className="flex items-center gap-1 text-success">
                    <ArrowUpRight className="w-3 h-3" />
                    {item.percentage}
                  </span>
                </td>
                <td className="py-3">
                  <span
                    className={cn(
                      'px-2 py-1 text-xs rounded-full',
                      item.status === 'in stock'
                        ? 'bg-success/10 text-success'
                        : 'bg-error/10 text-error'
                    )}
                  >
                    {item.status === 'in stock' ? 'Active' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDestinations;