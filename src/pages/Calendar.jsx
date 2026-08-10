import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CalendarClock, FileClock, CalendarDays } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/dateUtils';
import './Calendar.css';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function Calendar({ applications }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedKey, setSelectedKey] = useState(() => toKey(new Date()));

  const eventsByDate = useMemo(() => {
    const map = new Map();
    applications.forEach((app) => {
      if (app.interviewDate) {
        const arr = map.get(app.interviewDate) || [];
        arr.push({ kind: 'Interview', app });
        map.set(app.interviewDate, arr);
      }
      if (app.deadline) {
        const arr = map.get(app.deadline) || [];
        arr.push({ kind: 'Deadline', app });
        map.set(app.deadline, arr);
      }
    });
    return map;
  }, [applications]);

  const gridDays = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const start = new Date(year, month, 1 - startOffset);
    const days = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const todayKey = toKey(new Date());
  const selectedEvents = eventsByDate.get(selectedKey) || [];

  const goToMonth = (delta) => {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + delta);
    setCursor(next);
  };

  if (applications.length === 0) {
    return (
      <div className="page">
        <div className="page-head">
          <div>
            <span className="eyebrow">Calendar</span>
            <h1>Interviews &amp; deadlines</h1>
          </div>
        </div>
        <EmptyState
          icon={CalendarDays}
          title="Nothing scheduled yet"
          message="Add applications with a deadline or interview date to see them here."
          actionLabel="Add application"
          actionTo="/add"
        />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Calendar</span>
          <h1>Interviews &amp; deadlines</h1>
          <p className="subtitle">Every important date across your applications, in one view.</p>
        </div>
      </div>

      <div className="calendar-layout">
        <div className="card card-pad calendar-card">
          <div className="calendar-nav">
            <button className="btn btn-icon btn-ghost" onClick={() => goToMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={18} />
            </button>
            <h2>{monthLabel}</h2>
            <button className="btn btn-icon btn-ghost" onClick={() => goToMonth(1)} aria-label="Next month">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="calendar-weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>

          <div className="calendar-grid">
            {gridDays.map((d) => {
              const key = toKey(d);
              const inMonth = d.getMonth() === cursor.getMonth();
              const events = eventsByDate.get(key) || [];
              const hasInterview = events.some((e) => e.kind === 'Interview');
              const hasDeadline = events.some((e) => e.kind === 'Deadline');
              const isToday = key === todayKey;
              const isSelected = key === selectedKey;

              return (
                <button
                  type="button"
                  key={key}
                  className={`calendar-cell ${inMonth ? '' : 'is-outside'} ${isToday ? 'is-today' : ''} ${
                    isSelected ? 'is-selected' : ''
                  }`}
                  onClick={() => setSelectedKey(key)}
                >
                  <span className="calendar-cell-num">{d.getDate()}</span>
                  <span className="calendar-cell-dots">
                    {hasInterview && <span className="calendar-dot dot-interview" />}
                    {hasDeadline && <span className="calendar-dot dot-deadline" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="calendar-legend">
            <span>
              <i className="calendar-dot dot-interview" /> Interview
            </span>
            <span>
              <i className="calendar-dot dot-deadline" /> Deadline
            </span>
          </div>
        </div>

        <div className="card card-pad calendar-side">
          <h3>{formatDate(selectedKey)}</h3>
          {selectedEvents.length === 0 ? (
            <p className="calendar-side-empty">Nothing scheduled on this day.</p>
          ) : (
            <ul className="calendar-event-list">
              {selectedEvents.map((e, i) => (
                <li key={`${e.app.id}-${e.kind}-${i}`}>
                  <Link to={`/applications/${e.app.id}`} className="calendar-event">
                    <span className={`calendar-event-icon ${e.kind === 'Interview' ? 'is-interview' : 'is-deadline'}`}>
                      {e.kind === 'Interview' ? <CalendarClock size={15} /> : <FileClock size={15} />}
                    </span>
                    <span className="calendar-event-info">
                      <span className="calendar-event-title">
                        {e.kind} · {e.app.company}
                      </span>
                      <span className="calendar-event-sub">{e.app.role}</span>
                    </span>
                    <StatusBadge status={e.app.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
