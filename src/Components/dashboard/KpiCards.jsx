import { ArrowUpRight, ArrowDownRight, DollarSign, Wallet, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

const cards = [
  {
    title: 'Product overview', // kept as per screenshot
    value: '$43,630',
    subtitle: 'This Month',
    trend: null,
    icon: DollarSign,
    color: 'text-primary',
  },
  {
    title: 'Active sales',
    value: '$27,064',
    subtitle: '↑ 12% last month',
    trend: 12,
    icon: Wallet,
    color: 'text-success',
  },
  {
    title: 'Product revenue',
    value: '$16,568',
    subtitle: '↑ 1% last month',
    trend: 1,
    icon: Clock,
    color: 'text-primary-light',
  },
];

const KpiCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-surface rounded-xl p-6 shadow-card border border-border"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">{card.title}</p>
              <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
              <p className="text-sm text-text-secondary mt-1 flex items-center gap-1">
                {card.trend && (
                  <>
                    {card.trend > 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-error" />
                    )}
                  </>
                )}
                {card.subtitle}
              </p>
            </div>
            <div className={cn('p-3 rounded-lg bg-surface-soft', card.color)}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
          <button className="mt-4 text-sm font-medium text-primary hover:text-primary-light transition-colors">
            See Details →
          </button>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;