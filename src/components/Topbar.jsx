import { Menu, Moon, Sun, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';

export default function Topbar({ onMenuClick, theme, onToggleTheme, onSearch }) {
  const navigate = useNavigate();

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/applications?q=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <header className="topbar">
      <button className="btn btn-icon btn-ghost topbar-menu" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={20} />
      </button>

      <div className="topbar-search">
        <Search size={16} className="topbar-search-icon" />
        <input
          type="search"
          placeholder="Search company or role…"
          aria-label="Search applications"
          onKeyDown={handleSearchKeyDown}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button
          className="btn btn-icon btn-secondary"
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
