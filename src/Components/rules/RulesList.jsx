import RuleCard from './RuleCard';

const RulesList = ({ rules, onUpdatePercentage, onRemove }) => {
  return (
    <div className="space-y-3">
      {rules.map((rule) => (
        <RuleCard
          key={rule.destinationId}
          rule={rule}
          onUpdatePercentage={onUpdatePercentage}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default RulesList;