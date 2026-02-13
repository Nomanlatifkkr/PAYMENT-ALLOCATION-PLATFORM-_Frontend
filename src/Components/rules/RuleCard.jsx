import { useState } from 'react';
import { Building, GripVertical, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const RuleCard = ({ rule, onUpdatePercentage, onRemove }) => {
  const [percentage, setPercentage] = useState(rule.percentage);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlur = () => {
    setIsEditing(false);
    let newValue = Math.min(100, Math.max(0, parseInt(percentage) || 0));
    if (newValue !== rule.percentage) {
      onUpdatePercentage(rule.destinationId, newValue);
    }
    setPercentage(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-surface-soft/50 rounded-lg border border-border group hover:border-primary/30 transition-colors">
      {/* Drag handle (placeholder, no drag yet) */}
      <div className="cursor-grab text-text-tertiary">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Bank icon */}
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Building className="w-4 h-4" />
      </div>

      {/* Destination info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{rule.destinationName}</p>
        <p className="text-xs text-text-tertiary">Reserve account</p>
      </div>

      {/* Percentage control */}
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          {isEditing ? (
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-16 px-2 py-1 text-sm border border-primary rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/50 text-right"
              min="0"
              max="100"
              step="1"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm font-medium bg-surface border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              {rule.percentage}%
            </button>
          )}
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(rule.destinationId)}
          className="p-1.5 text-text-tertiary hover:text-error hover:bg-error/10 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default RuleCard;