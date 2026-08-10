import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  ClipboardList,
  MonitorCheck,
  Users,
  Trophy,
  XCircle,
  PlusCircle,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import UpcomingList from '../components/UpcomingList';
import EmptyState from '../components/EmptyState';
import StatusBarChart from '../components/charts/StatusBarChart';
import ApplicationsOverTimeChart from '../components/charts/ApplicationsOverTimeChart';
import SelectedRejectedChart from '../components/charts/SelectedRejectedChart';
import StatusBadge from '../components/StatusBadge';
import { formatDateShort } from '../utils/dateUtils';
import {
  computeSummary,
  computeStatusChartData,
  computeUpcoming,
  computeApplicationsOverTime,
  computeSelectedVsRejected,
} from '../utils/statsUtils';
import './Dashboard.css';

export default function Dashboard({ applications }) {
  const summary = useMemo(() => computeSummary(applications), [applications]);
  const statusData = useMemo(() => computeStatusChartData(applications), [applications]);
  const upcoming = useMemo(() => computeUpcoming(applications), [applications]);
  const overTime = useMemo(() => computeApplicationsOverTime(applications), [applications]);
  const selectedVsRejected = useMemo(() => computeSelectedVsRejected(applications), [applications]);
  const recent = useMemo(
    () =>
      [...applications]
        .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
        .slice(0, 5),
    [applications]
  );

  if (applications.length === 0) {
    return (
      <div className="page">
        <div className="page-head">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>Placement overview</h1>
          </div>
        </div>
        <EmptyState
          icon={Briefcase}
          title="No applications tracked yet"
          message="Add your first application to see live stats, upcoming interviews, and status charts here."
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
          <span className="eyebrow">Dashboard</span>
          <h1>Placement overview</h1>
          <p className="subtitle">
            Tracking {summary.total} applications this season · {summary.active} still active
          </p>
        </div>
        <Link to="/add" className="btn btn-primary">
          <PlusCircle size={16} /> Add application
        </Link>
      </div>

      <div className="stat-grid">
        <StatCard label="Total applications" value={summary.total} icon={Briefcase} tone="primary" />
        <StatCard label="Applied" value={summary.applied} icon={ClipboardList} tone="slate" />
        <StatCard label="Online assessment" value={summary.onlineAssessment} icon={MonitorCheck} tone="blue" />
        <StatCard label="Interview" value={summary.interview} icon={Users} tone="violet" />
        <StatCard label="Selected" value={summary.selected} icon={Trophy} tone="gold" />
        <StatCard label="Rejected" value={summary.rejected} icon={XCircle} tone="red" />
      </div>

      <div className="dash-grid">
        <div className="card card-pad dash-span-2">
          <div className="dash-card-head">
            <h2>Applications by status</h2>
          </div>
          <StatusBarChart data={statusData} />
        </div>

        <div className="card card-pad">
          <div className="dash-card-head">
            <h2>Upcoming</h2>
            <Link to="/calendar" className="dash-card-link">
              View calendar
            </Link>
          </div>
          <UpcomingList items={upcoming} />
        </div>

        <div className="card card-pad dash-span-2">
          <div className="dash-card-head">
            <h2>Applications over time</h2>
          </div>
          {overTime.length > 1 ? (
            <ApplicationsOverTimeChart data={overTime} />
          ) : (
            <p className="chart-empty">Add a few more applications to see a trend line here.</p>
          )}
        </div>

        <div className="card card-pad">
          <div className="dash-card-head">
            <h2>Selected vs rejected</h2>
          </div>
          <SelectedRejectedChart data={selectedVsRejected} />
          <div className="donut-legend">
            <span>
              <i className="dot dot-gold" /> Selected · {summary.selected}
            </span>
            <span>
              <i className="dot dot-red" /> Rejected · {summary.rejected}
            </span>
          </div>
        </div>

        <div className="card card-pad dash-span-3">
          <div className="dash-card-head">
            <h2>Recent applications</h2>
            <Link to="/applications" className="dash-card-link">
              View all
            </Link>
          </div>
          <ul className="recent-list">
            {recent.map((app) => (
              <li key={app.id}>
                <Link to={`/applications/${app.id}`} className="recent-row">
                  <span className="recent-company">{app.company}</span>
                  <span className="recent-role">{app.role}</span>
                  <span className="recent-date mono">{formatDateShort(app.appliedDate)}</span>
                  <StatusBadge status={app.status} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
