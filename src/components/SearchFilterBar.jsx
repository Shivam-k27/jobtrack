import { Search, LayoutGrid, TableProperties } from 'lucide-react';
import { STATUSES, SORT_OPTIONS } from '../data/constants';
import './SearchFilterBar.css';

export default function SearchFilterBar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
  view,
  onViewChange,
  resultCount,
}) {
  return (
    <div className="filter-bar card card-pad">
      <div className="filter-bar-row">
        <div className="filter-search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by company or role…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search applications"
          />
        </div>

        <select
          className="select filter-select"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="select filter-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort applications"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="filter-view-toggle" role="group" aria-label="Choose layout">
          <button
            type="button"
            className={`btn btn-icon ${view === 'table' ? 'btn-secondary' : 'btn-ghost'}`}
            onClick={() => onViewChange('table')}
            aria-pressed={view === 'table'}
            aria-label="Table view"
            title="Table view"
          >
            <TableProperties size={17} />
          </button>
          <button
            type="button"
            className={`btn btn-icon ${view === 'card' ? 'btn-secondary' : 'btn-ghost'}`}
            onClick={() => onViewChange('card')}
            aria-pressed={view === 'card'}
            aria-label="Card view"
            title="Card view"
          >
            <LayoutGrid size={17} />
          </button>
        </div>
      </div>
      <p className="filter-result-count mono">
        {resultCount} {resultCount === 1 ? 'application' : 'applications'}
      </p>
    </div>
  );
}
