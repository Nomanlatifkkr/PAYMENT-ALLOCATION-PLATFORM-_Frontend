import { useState } from 'react';
import Chart from 'react-apexcharts';
import { cn } from '../../lib/utils';

const AllocationChart = () => {
  const [series] = useState([
    {
      name: 'Allocated Amount',
      data: [3500, 4200, 3800, 4500, 4900, 5200, 4800, 5300],
    },
  ]);

  const options = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'Inter, sans-serif',
      foreColor: '#6B7280',
    },
    colors: ['#8EB24A'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#6B7280', fontSize: '12px' } },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`,
        style: { colors: '#6B7280', fontSize: '12px' },
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (value) => `$${value}`,
      },
    },
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Allocated Volume</h3>
          <p className="text-2xl font-bold mt-1">$27,064</p>
          <p className="text-sm text-success flex items-center gap-1 mt-0.5">
            ↑ 14% this month
          </p>
        </div>

    
      </div>

      <Chart
        options={options}
        series={series}
        type="area"
        height={280}
        width={"100%"}
      />
    </div>
  );
};

export default AllocationChart;
