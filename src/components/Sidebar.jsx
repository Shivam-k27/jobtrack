import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ListChecks,
  PlusCircle,
  CalendarDays,
  Milestone,
  X,
} from 'lucide-react';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/applications', label: 'Applications', icon: ListChecks },
  { to: '/add', label: 'Add Application', icon: PlusCircle },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && <div className="sidebar-scrim" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark">
            <Milestone size={20} strokeWidth={2.4} />
          </span>
          <div>
            <span className="sidebar-brand-name">JobTrack</span>
            <span className="sidebar-brand-sub">Placement tracker</span>
          </div>
          <button className="btn btn-icon btn-ghost sidebar-close" onClick={onClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-footer-title">Placement season</p>
          <p className="sidebar-footer-text">Every application is a step on the rail — keep it moving.</p>
        </div>
      </aside>
    </>
  );
}
