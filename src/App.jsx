import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import ApplicationDetails from './pages/ApplicationDetails';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import { useApplications } from './hooks/useApplications';

export default function App() {
  const { applications, isLoading, addApplication, updateApplication, deleteApplication, getApplication } =
    useApplications();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="skeleton" style={{ width: 220, height: 40 }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard applications={applications} />} />
          <Route
            path="/applications"
            element={<Applications applications={applications} onDelete={deleteApplication} />}
          />
          <Route path="/add" element={<AddApplication onAdd={addApplication} />} />
          <Route
            path="/applications/:id"
            element={
              <ApplicationDetails
                getApplication={getApplication}
                onUpdate={updateApplication}
                onDelete={deleteApplication}
              />
            }
          />
          <Route path="/calendar" element={<Calendar applications={applications} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
