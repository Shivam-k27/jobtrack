import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import './FormPage.css';

export default function AddApplication({ onAdd }) {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const created = onAdd(values);
    navigate(`/applications/${created.id}`);
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">New application</span>
          <h1>Add application</h1>
          <p className="subtitle">Log a new company, role, and where things stand.</p>
        </div>
      </div>

      <div className="card card-pad form-page-card">
        <ApplicationForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} submitLabel="Add application" />
      </div>
    </div>
  );
}
