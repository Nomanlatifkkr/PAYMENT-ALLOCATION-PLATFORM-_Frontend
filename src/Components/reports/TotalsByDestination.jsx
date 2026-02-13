import { useState } from 'react';
import Chart from 'react-apexcharts';
import { Download } from 'lucide-react';
import { cn } from '../../lib/utils';

const TotalsByDestination = ({ data }) => {

  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#8EB24A'],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.map(d => d.destinationName),
      labels: {
        formatter: (value) => formatMoney(parseInt(value) * 100 || 0),
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatMoney(value),
      },
    },
  };

  const series = [
    {
      name: 'Total Amount',
      data: data.map(d => d.amount),
    },
  ];

  const handleExport = () => {
    const csv = data.map(d => `${d.destinationName},${d.amount},${d.count}`).join('\n');
    const blob = new Blob([`Destination,Amount (cents),Count\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'totals-by-destination.csv';
    a.click();
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Totals by Destination</h3>
        <button
          onClick={handleExport}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-surface-hover transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <Chart options={chartOptions} series={series} type="bar" height={350} />
    </div>
  );
};

export default TotalsByDestination;
