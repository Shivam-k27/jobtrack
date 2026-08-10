export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: 'var(--shadow-md)',
        fontSize: 12,
        color: 'var(--ink)',
      }}
    >
      {label && <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>}
      {payload.map((p) => (
        <div key={p.dataKey || p.name} style={{ color: p.color || 'var(--ink)' }}>
          {p.name || p.dataKey}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
}
