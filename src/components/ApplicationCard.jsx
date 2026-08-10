import { Link } from 'react-router-dom';
import { MapPin, Wallet, Eye, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDateShort, isPast, relativeDayLabel } from '../utils/dateUtils';
import './ApplicationCard.css';

export default function ApplicationCard({ app, onDelete }) {
  const overdue = isPast(app.deadline) && !['Selected', 'Rejected'].includes(app.status);

  return (
    <div className="card app-card fade-in">
      <div className="app-card-top">
        <div>
          <Link to={`/applications/${app.id}`} className="app-card-company">
            {app.company}
          </Link>
          <p className="app-card-role">{app.role}</p>
        </div>
        <StatusBadge status={app.status} />
      </div>

      <div className="app-card-meta">
        <span>
          <Wallet size={14} /> <span className="mono">{app.ctc}</span>
        </span>
        <span>
          <MapPin size={14} /> {app.location}
        </span>
      </div>

      <div className="app-card-dates">
        <div>
          <span className="app-card-date-label">Applied</span>
          <span className="mono">{formatDateShort(app.appliedDate)}</span>
        </div>
        <div>
          <span className="app-card-date-label">Deadline</span>
          <span className={`mono ${overdue ? 'app-card-overdue' : ''}`}>
            {formatDateShort(app.deadline)}
          </span>
        </div>
        {app.interviewDate && (
          <div>
            <span className="app-card-date-label">Interview</span>
            <span className="mono">{relativeDayLabel(app.interviewDate)}</span>
          </div>
        )}
      </div>

      <div className="app-card-footer">
        <Link to={`/applications/${app.id}`} className="btn btn-secondary btn-sm">
          <Eye size={14} /> View
        </Link>
        <Link to={`/applications/${app.id}?edit=1`} className="btn btn-ghost btn-sm">
          <Pencil size={14} /> Edit
        </Link>
        <button className="btn btn-ghost btn-sm app-card-delete" onClick={() => onDelete(app)}>
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </div>
  );
}
