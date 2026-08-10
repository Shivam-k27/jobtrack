import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListChecks } from 'lucide-react';
import SearchFilterBar from '../components/SearchFilterBar';
import ApplicationTable from '../components/ApplicationTable';
import ApplicationCard from '../components/ApplicationCard';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import './Applications.css';

export default function Applications({ applications, onDelete }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('deadline-asc');
  const [view, setView] = useState('table');
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleQueryChange = (val) => {
    setQuery(val);
    if (val) setSearchParams({ q: val });
    else setSearchParams({});
  };

  const filtered = useMemo(() => {
    let list = [...applications];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (a) => a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q)
      );
    }

    if (status !== 'all') {
      list = list.filter((a) => a.status === status);
    }

    list.sort((a, b) => {
      switch (sort) {
        case 'deadline-asc':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'deadline-desc':
          return new Date(b.deadline) - new Date(a.deadline);
        case 'applied-desc':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'applied-asc':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'company-asc':
          return a.company.localeCompare(b.company);
        case 'ctc-desc':
          return parseFloat(b.ctc) - parseFloat(a.ctc) || 0;
        default:
          return 0;
      }
    });

    return list;
  }, [applications, query, status, sort]);

  const handleDeleteConfirm = () => {
    if (pendingDelete) {
      onDelete(pendingDelete.id);
      setPendingDelete(null);
    }
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Applications</span>
          <h1>All applications</h1>
          <p className="subtitle">Search, filter, and sort every application you've submitted.</p>
        </div>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="No applications yet"
          message="Once you add applications, they'll show up here with full search, filter, and sort controls."
          actionLabel="Add application"
          actionTo="/add"
        />
      ) : (
        <>
          <SearchFilterBar
            query={query}
            onQueryChange={handleQueryChange}
            status={status}
            onStatusChange={setStatus}
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
            resultCount={filtered.length}
          />

          {filtered.length === 0 ? (
            <EmptyState
              icon={ListChecks}
              title="No matching applications"
              message="Try a different search term or clear the status filter."
            />
          ) : view === 'table' ? (
            <ApplicationTable applications={filtered} onDelete={setPendingDelete} />
          ) : (
            <div className="app-card-grid">
              {filtered.map((app) => (
                <ApplicationCard key={app.id} app={app} onDelete={setPendingDelete} />
              ))}
            </div>
          )}
        </>
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this application?"
        message={
          pendingDelete
            ? `This will permanently remove your ${pendingDelete.company} — ${pendingDelete.role} application. This can't be undone.`
            : ''
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
