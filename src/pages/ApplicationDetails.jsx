import { useState } from 'react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Wallet, Pencil, Trash2, CalendarDays, FileText, StickyNote } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import PipelineRail from '../components/PipelineRail';
import ApplicationForm from '../components/ApplicationForm';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import { formatDate, relativeDayLabel } from '../utils/dateUtils';
import './ApplicationDetails.css';

export default function ApplicationDetails({ getApplication, onUpdate, onDelete }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const app = getApplication(id);
  const isEditing = searchParams.get('edit') === '1';

  if (!app) {
    return (
      <div className="page">
        <EmptyState
          title="Application not found"
          message="It may have been deleted already. Head back to your applications list."
          actionLabel="Back to applications"
          actionTo="/applications"
        />
      </div>
    );
  }

  const setEditing = (value) => {
    if (value) setSearchParams({ edit: '1' });
    else setSearchParams({});
  };

  const handleUpdate = (values) => {
    onUpdate(app.id, values);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(app.id);
    navigate('/applications');
  };

  return (
    <div className="page">
      <button className="btn btn-ghost details-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      {isEditing ? (
        <>
          <div className="page-head">
            <div>
              <span className="eyebrow">Editing</span>
              <h1>
                {app.company} — {app.role}
              </h1>
            </div>
          </div>
          <div className="card card-pad form-page-card">
            <ApplicationForm
              initialValues={app}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(false)}
              submitLabel="Save changes"
            />
          </div>
        </>
      ) : (
        <>
          <div className="page-head details-head">
            <div>
              <span className="eyebrow">Application</span>
              <h1>{app.company}</h1>
              <p className="subtitle">{app.role}</p>
            </div>
            <div className="details-actions">
              <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                <Pencil size={16} /> Edit
              </button>
              <button className="btn btn-danger" onClick={() => setConfirmOpen(true)}>
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>

          <div className="details-grid">
            <div className="card card-pad details-main">
              <div className="details-top-row">
                <StatusBadge status={app.status} />
                <span className="details-meta-item">
                  <Wallet size={15} /> <span className="mono">{app.ctc}</span>
                </span>
                <span className="details-meta-item">
                  <MapPin size={15} /> {app.location}
                </span>
              </div>

              <div className="details-dates">
                <div>
                  <span className="details-date-label">Applied</span>
                  <span className="mono">{formatDate(app.appliedDate)}</span>
                </div>
                <div>
                  <span className="details-date-label">Deadline</span>
                  <span className="mono">{formatDate(app.deadline)}</span>
                  <span className="details-date-relative">{relativeDayLabel(app.deadline)}</span>
                </div>
                {app.interviewDate && (
                  <div>
                    <span className="details-date-label">Interview</span>
                    <span className="mono">{formatDate(app.interviewDate)}</span>
                    <span className="details-date-relative">{relativeDayLabel(app.interviewDate)}</span>
                  </div>
                )}
              </div>

              {app.description && (
                <div className="details-section">
                  <h3>
                    <FileText size={15} /> Job description
                  </h3>
                  <p>{app.description}</p>
                </div>
              )}

              {app.notes && (
                <div className="details-section">
                  <h3>
                    <StickyNote size={15} /> Notes
                  </h3>
                  <p>{app.notes}</p>
                </div>
              )}

              <div className="details-section">
                <h3>
                  <CalendarDays size={15} /> Record
                </h3>
                <p className="details-record">
                  Added {formatDate(app.createdAt)} · Last updated {formatDate(app.updatedAt)}
                </p>
              </div>
            </div>

            <div className="card card-pad details-side">
              <h3 className="details-side-title">Progress</h3>
              <PipelineRail status={app.status} orientation="vertical" />
              {app.status === 'Rejected' && (
                <p className="details-rejected-note">
                  This application didn't move forward this cycle — the earlier stages above may
                  or may not have been reached.
                </p>
              )}
              <Link to="/applications" className="btn btn-ghost details-side-link">
                View all applications
              </Link>
            </div>
          </div>
        </>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete this application?"
        message={`This will permanently remove your ${app.company} — ${app.role} application. This can't be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
