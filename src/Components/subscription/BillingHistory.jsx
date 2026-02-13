import { Download, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

const BillingHistory = ({ history }) => {
  const formatMoney = (cents) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(cents / 100);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!history || history.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold mb-4">Billing History</h3>
        <p className="text-text-secondary text-center py-4">No invoices yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold mb-4">Billing History</h3>
      <div className="space-y-3">
        {history.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between py-2 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-surface-soft">
                <FileText className="w-4 h-4 text-text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium">{formatDate(invoice.date)}</p>
                <p className="text-xs text-text-secondary">
                  {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold">{formatMoney(invoice.amount)}</span>
              <a
                href={invoice.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-text-secondary hover:text-text-primary rounded hover:bg-surface-hover transition-colors"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-primary hover:text-primary-light transition-colors">
        View all invoices →
      </button>
    </div>
  );
};

export default BillingHistory;