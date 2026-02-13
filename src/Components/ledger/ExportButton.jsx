import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const ExportButton = ({ data, filename = 'ledger-export' }) => {
  const [isExporting, setIsExporting] = useState(false);

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';

    // Define headers
    const headers = ['ID', 'Timestamp', 'Event Type', 'Payment ID', 'Destination', 'Amount', 'Status'];

    // Map data to rows
    const rows = data.map(entry => [
      entry.id,
      new Date(entry.timestamp).toISOString(),
      entry.eventType,
      entry.paymentId,
      entry.destinationName || '',
      (entry.amount / 100).toFixed(2),
      entry.status,
    ]);

    // Combine headers and rows
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      const csv = convertToCSV(data);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || data.length === 0}
      className={cn(
        'flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      )}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {isExporting ? 'Exporting...' : 'Export CSV'}
    </button>
  );
};

export default ExportButton;