import { Link } from 'react-router-dom';
import { CalendarClock, FileClock } from 'lucide-react';
import { relativeDayLabel } from '../utils/dateUtils';
import './UpcomingList.css';

export default function UpcomingList({ items }) {
  if (!items.length) {
    return (
      <p className="upcoming-empty">Nothing due in the next two weeks. You're all caught up.</p>
    );
  }

  return (
    <ul className="upcoming-list">
      {items.slice(0, 6).map((item) => (
        <li key={item.id}>
          <Link to={`/applications/${item.app.id}`} className="upcoming-row">
            <span className={`upcoming-icon ${item.kind === 'Interview' ? 'is-interview' : 'is-deadline'}`}>
              {item.kind === 'Interview' ? <CalendarClock size={15} /> : <FileClock size={15} />}
            </span>
            <span className="upcoming-info">
              <span className="upcoming-title">
                {item.kind} · {item.app.company}
              </span>
              <span className="upcoming-sub">{item.app.role}</span>
            </span>
            <span className="upcoming-when mono">{relativeDayLabel(item.date)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
