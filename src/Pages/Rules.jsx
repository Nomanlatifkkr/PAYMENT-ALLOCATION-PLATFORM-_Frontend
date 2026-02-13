import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RulesList from '../Components/rules/RulesList';
import AddRuleButton from '../Components/rules/AddRuleButton';
import TotalAllocationCard from '../Components/rules/TotalAllocationCard';
import AllocationPreview from '../Components/rules/AllocationPreview';
import TierBadge from '../Components/destinations/TierBadge';
import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock data – will come from API
const MOCK_USER_TIER = 'paid'; // 'free', 'paid', 'premium'
const MOCK_RESERVE_DESTINATIONS = [
  { id: 'dest_2', bankName: 'Bank of America', last4: '5678', status: 'ACTIVE' },
  { id: 'dest_3', bankName: 'Wells Fargo', last4: '9012', status: 'ACTIVE' },
  { id: 'dest_4', bankName: 'Silicon Valley Bank', last4: '3456', status: 'ACTIVE' },
];

const MOCK_RULES = [
  { destinationId: 'dest_2', destinationName: 'Bank of America', percentage: 15 },
  { destinationId: 'dest_3', destinationName: 'Wells Fargo', percentage: 25 },
];

const Rules = () => {
  const navigate = useNavigate();
  const [tier] = useState(MOCK_USER_TIER);
  const [rules, setRules] = useState(MOCK_RULES);
  const [availableDestinations, setAvailableDestinations] = useState(MOCK_RESERVE_DESTINATIONS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Filter out destinations that already have a rule
  const unusedDestinations = availableDestinations.filter(
    (dest) => !rules.some((rule) => rule.destinationId === dest.id)
  );

  const totalPercentage = rules.reduce((sum, rule) => sum + rule.percentage, 0);
  const isValid = totalPercentage <= 100 && rules.every((rule) => rule.percentage > 0 && rule.percentage <= 100);
  const remainingPercentage = 100 - totalPercentage;

  // Check tier limits
  const maxReserves = tier === 'paid' ? 2 : tier === 'premium' ? Infinity : 0;
  const canAddMore = tier !== 'free' && rules.length < maxReserves && unusedDestinations.length > 0;

  useEffect(() => {
    // Warn user about unsaved changes
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleAddRule = (destinationId, destinationName) => {
    setRules([...rules, { destinationId, destinationName, percentage: 10 }]);
    setHasUnsavedChanges(true);
  };

  const handleUpdatePercentage = (destinationId, newPercentage) => {
    setRules(
      rules.map((rule) =>
        rule.destinationId === destinationId
          ? { ...rule, percentage: newPercentage }
          : rule
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleRemoveRule = (destinationId) => {
    setRules(rules.filter((rule) => rule.destinationId !== destinationId));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!isValid) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      // API call would go here
      // await fetch('/api/allocation-config', { method: 'PATCH', body: JSON.stringify({ rules }) });
      await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
      setHasUnsavedChanges(false);
      // Show success toast
    } catch (error) {
      setSaveError('Failed to save allocation rules. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Free tier – cannot access rules page
  if (tier === 'free') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="p-4 rounded-full bg-surface-soft">
          <AlertCircle className="w-12 h-12 text-text-tertiary" />
        </div>
        <h2 className="text-2xl font-bold text-center">Upgrade to create allocation rules</h2>
        <p className="text-text-secondary text-center max-w-md">
          The Free plan includes a main destination only. Upgrade to Paid or Premium to add reserve accounts and set percentage splits.
        </p>
        <button
          onClick={() => navigate('/subscription')}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-light transition-colors"
        >
          View plans →
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Allocation Rules</h1>
          <p className="text-text-secondary mt-1">
            Set percentage splits for your reserve destinations
          </p>
        </div>
        <TierBadge tier={tier} showUpgrade={false} />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column – Rules list */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rules card */}
          <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold">Reserve Splits</h2>
                <p className="text-sm text-text-secondary mt-1">
                  {rules.length} of {maxReserves === Infinity ? 'unlimited' : maxReserves} reserves used
                </p>
              </div>
              <AddRuleButton
                destinations={unusedDestinations}
                onAdd={handleAddRule}
                disabled={!canAddMore}
                tier={tier}
                currentCount={rules.length}
                maxCount={maxReserves}
              />
            </div>

            {rules.length === 0 ? (
              <div className="text-center py-12 bg-surface-soft/50 rounded-lg border border-dashed border-border">
                <p className="text-text-secondary">No allocation rules yet.</p>
                <p className="text-xs text-text-tertiary mt-1">
                  Add a reserve destination to start splitting payments.
                </p>
              </div>
            ) : (
              <RulesList
                rules={rules}
                onUpdatePercentage={handleUpdatePercentage}
                onRemove={handleRemoveRule}
              />
            )}
          </div>

          {/* Allocation Preview – shows example calculation */}
          <AllocationPreview rules={rules} totalPercentage={totalPercentage} />
        </div>

        {/* Right column – Summary & Save */}
        <div className="space-y-6">
          <TotalAllocationCard
            totalPercentage={totalPercentage}
            remainingPercentage={remainingPercentage}
            isValid={isValid}
            ruleCount={rules.length}
            maxReserves={maxReserves}
          />

          {/* Save button card */}
          <div className="bg-surface rounded-xl p-6 shadow-card border border-border">
            <h3 className="font-medium mb-4">Ready to apply?</h3>
            <p className="text-sm text-text-secondary mb-4">
              Rules are applied to all future payments immediately after saving.
            </p>
            <button
              onClick={handleSave}
              disabled={!isValid || isSaving || !hasUnsavedChanges}
              className={cn(
                'w-full py-2.5 px-4 rounded-lg font-medium transition-all',
                isValid && hasUnsavedChanges
                  ? 'bg-primary text-white hover:bg-primary-light'
                  : 'bg-surface-hover text-text-tertiary cursor-not-allowed'
              )}
            >
              {isSaving ? 'Saving...' : hasUnsavedChanges ? 'Save changes' : 'No changes'}
            </button>
            {saveError && <p className="text-xs text-error mt-2">{saveError}</p>}
          </div>

          {/* Info card */}
          <div className="bg-surface-soft rounded-lg p-4 border border-border text-sm">
            <h4 className="font-medium mb-2">How allocation works</h4>
            <ul className="space-y-2 text-text-secondary text-xs">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Reserves are calculated first (rounded down to cents)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Remainder automatically goes to your main destination
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Rules persist until you change them
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                Transfers are created instantly when a payment is received
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;