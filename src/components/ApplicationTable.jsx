import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatDateShort, isPast } from '../utils/dateUtils';
import './ApplicationTable.css';

export default function ApplicationTable({ applications, onDelete }) {
  return (
    <div className="card table-wrap">
      <table className="app-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>CTC</th>
            <th>Applied</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Interview</th>
            <th className="app-table-actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => {
            const overdue =
              isPast(app.deadline) && !['Selected', 'Rejected'].includes(app.status);
            return (
              <tr key={app.id}>
                <td>
                  <Link to={`/applications/${app.id}`} className="app-table-company">
                    {app.company}
                  </Link>
                </td>
                <td className="app-table-muted">{app.role}</td>
                <td className="mono">{app.ctc}</td>
                <td className="mono">{formatDateShort(app.appliedDate)}</td>
                <td className={`mono ${overdue ? 'app-table-overdue' : ''}`}>
                  {formatDateShort(app.deadline)}
                </td>
                <td>
                  <StatusBadge status={app.status} />
                </td>
                <td className="mono">{app.interviewDate ? formatDateShort(app.interviewDate) : '—'}</td>
                <td>
                  <div className="app-table-actions">
                    <Link
                      to={`/applications/${app.id}`}
                      className="btn btn-icon btn-ghost"
                      aria-label={`View ${app.company}`}
                      title="View details"
                    >
                      <Eye size={16} />
                    </Link>
                    <Link
                      to={`/applications/${app.id}?edit=1`}
                      className="btn btn-icon btn-ghost"
                      aria-label={`Edit ${app.company}`}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button
                      className="btn btn-icon btn-ghost app-table-delete"
                      onClick={() => onDelete(app)}
                      aria-label={`Delete ${app.company}`}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
