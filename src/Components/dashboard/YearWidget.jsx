import { TrendingUp } from 'lucide-react';

const YearWidget = () => {
  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">This Year</h3>
        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">17.9%</span>
            <span className="text-sm text-text-secondary ml-1">Since yesterday</span>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Sales per day</span>
              <span className="font-medium">$4,230</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Average sales</span>
              <span className="font-medium">$3,890</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">For today</span>
              <span className="font-medium text-success">+12.3%</span>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default YearWidget;