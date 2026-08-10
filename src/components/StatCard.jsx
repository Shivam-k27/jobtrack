import './StatCard.css';

export default function StatCard({ label, value, icon: Icon, tone = 'primary', hint }) {
  return (
    <div className={`stat-card tone-${tone}`}>
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        {Icon && (
          <span className="stat-card-icon">
            <Icon size={16} strokeWidth={2.2} />
          </span>
        )}
      </div>
      <span className="stat-card-value mono">{value}</span>
      {hint && <span className="stat-card-hint">{hint}</span>}
    </div>
  );
}
