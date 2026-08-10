import { STATUS_TONE } from '../data/constants';

export default function StatusBadge({ status }) {
  const tone = STATUS_TONE[status] || 'slate';
  return <span className={`status-badge tone-${tone}`}>{status}</span>;
}
