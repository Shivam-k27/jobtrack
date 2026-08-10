import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useTheme } from '../hooks/useTheme';
import './MainLayout.css';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="app-main">
        <Topbar
          onMenuClick={() => setMobileOpen(true)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onSearch={(q) => {
            if (q.length > 1) navigate(`/applications?q=${encodeURIComponent(q)}`);
          }}
        />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
