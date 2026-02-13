import { useState } from 'react';
import PaymentsTable from './PaymentsTable';
import AllocationsTable from './AllocationsTable';
import LedgerTable from './LedgerTable';
import { cn } from '../../lib/utils';

const tabs = [
  { id: 'payments', label: 'Payments' },
  { id: 'allocations', label: 'Allocations' },
  { id: 'ledger', label: 'Ledger' },
];

const ReportTabs = ({ filters }) => {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <div className="bg-surface rounded-xl shadow-card border border-border overflow-hidden">
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-3 text-sm font-medium transition-colors',
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {activeTab === 'payments' && <PaymentsTable filters={filters} />}
        {activeTab === 'allocations' && <AllocationsTable filters={filters} />}
        {activeTab === 'ledger' && <LedgerTable filters={filters} />}
      </div>
    </div>
  );
};

export default ReportTabs;