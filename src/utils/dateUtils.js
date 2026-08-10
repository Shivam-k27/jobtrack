export function parseDate(value) {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(value, options = {}) {
  const d = parseDate(value);
  if (!d) return '—';
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatDateShort(value) {
  return formatDate(value, { year: undefined });
}

export function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysUntil(value) {
  const d = parseDate(value);
  if (!d) return null;
  const diff = d.getTime() - today().getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function isPast(value) {
  const n = daysUntil(value);
  return n !== null && n < 0;
}

export function isWithinNextDays(value, days) {
  const n = daysUntil(value);
  return n !== null && n >= 0 && n <= days;
}

export function relativeDayLabel(value) {
  const n = daysUntil(value);
  if (n === null) return '';
  if (n === 0) return 'Today';
  if (n === 1) return 'Tomorrow';
  if (n === -1) return 'Yesterday';
  if (n > 1) return `In ${n} days`;
  return `${Math.abs(n)} days ago`;
}

export function monthKey(value) {
  const d = parseDate(value);
  if (!d) return null;
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function monthLabel(key) {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
}
