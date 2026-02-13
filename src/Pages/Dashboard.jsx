import KpiCards from '../Components/dashboard/KpiCards';
import AllocationChart from '../Components/dashboard/AllocationChart';
import YearWidget from '../Components/dashboard/YearWidget';
import ActivityFeed from '../Components/dashboard/ActivityFeed';
import TopDestinations from '../Components/dashboard/TopDestinations';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-text-secondary mt-1">
          Track your sales and performance of your strategy
        </p>
      </div>

      {/* KPI Cards */}
      <KpiCards />

      {/* Chart + Year Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AllocationChart />
        </div>
        <div>
          <YearWidget />
        </div>
      </div>

      {/* Activity + Top Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <TopDestinations />
      </div>
    </div>
  );
};

export default Dashboard;