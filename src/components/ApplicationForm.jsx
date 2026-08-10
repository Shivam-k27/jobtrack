import { useState } from 'react';
import { STATUSES, JOB_LOCATIONS } from '../data/constants';
import { validateApplication, hasErrors } from '../utils/validation';
import './ApplicationForm.css';

const EMPTY_FORM = {
  company: '',
  role: '',
  ctc: '',
  location: '',
  appliedDate: new Date().toISOString().slice(0, 10),
  deadline: '',
  status: 'Applied',
  interviewDate: '',
  description: '',
  notes: '',
};

export default function ApplicationForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save application' }) {
  const [values, setValues] = useState({ ...EMPTY_FORM, ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateApplication({ ...values }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateApplication(values);
    setErrors(validationErrors);
    setTouched({
      company: true,
      role: true,
      ctc: true,
      location: true,
      appliedDate: true,
      deadline: true,
      status: true,
      interviewDate: true,
    });
    if (hasErrors(validationErrors)) return;
    onSubmit(values);
  };

  const showError = (field) => touched[field] && errors[field];

  return (
    <form className="app-form" onSubmit={handleSubmit} noValidate>
      <div className="app-form-grid">
        <div className="field">
          <label htmlFor="company">Company name</label>
          <input
            id="company"
            className={`input ${showError('company') ? 'has-error' : ''}`}
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
            onBlur={() => handleBlur('company')}
            placeholder="e.g. Google"
          />
          {showError('company') && <span className="error-msg">{errors.company}</span>}
        </div>

        <div className="field">
          <label htmlFor="role">Job role</label>
          <input
            id="role"
            className={`input ${showError('role') ? 'has-error' : ''}`}
            value={values.role}
            onChange={(e) => update('role', e.target.value)}
            onBlur={() => handleBlur('role')}
            placeholder="e.g. Software Engineer"
          />
          {showError('role') && <span className="error-msg">{errors.role}</span>}
        </div>

        <div className="field">
          <label htmlFor="ctc">Package / CTC</label>
          <input
            id="ctc"
            className={`input ${showError('ctc') ? 'has-error' : ''}`}
            value={values.ctc}
            onChange={(e) => update('ctc', e.target.value)}
            onBlur={() => handleBlur('ctc')}
            placeholder="e.g. 12 LPA"
          />
          {showError('ctc') && <span className="error-msg">{errors.ctc}</span>}
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            className={`input ${showError('location') ? 'has-error' : ''}`}
            value={values.location}
            onChange={(e) => update('location', e.target.value)}
            onBlur={() => handleBlur('location')}
            placeholder="e.g. Bengaluru"
            list="jobtrack-locations"
          />
          <datalist id="jobtrack-locations">
            {JOB_LOCATIONS.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
          {showError('location') && <span className="error-msg">{errors.location}</span>}
        </div>

        <div className="field">
          <label htmlFor="appliedDate">Application date</label>
          <input
            id="appliedDate"
            type="date"
            className={`input ${showError('appliedDate') ? 'has-error' : ''}`}
            value={values.appliedDate}
            onChange={(e) => update('appliedDate', e.target.value)}
            onBlur={() => handleBlur('appliedDate')}
          />
          {showError('appliedDate') && <span className="error-msg">{errors.appliedDate}</span>}
        </div>

        <div className="field">
          <label htmlFor="deadline">Deadline</label>
          <input
            id="deadline"
            type="date"
            className={`input ${showError('deadline') ? 'has-error' : ''}`}
            value={values.deadline}
            onChange={(e) => update('deadline', e.target.value)}
            onBlur={() => handleBlur('deadline')}
          />
          {showError('deadline') && <span className="error-msg">{errors.deadline}</span>}
        </div>

        <div className="field">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className={`select ${showError('status') ? 'has-error' : ''}`}
            value={values.status}
            onChange={(e) => update('status', e.target.value)}
            onBlur={() => handleBlur('status')}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {showError('status') && <span className="error-msg">{errors.status}</span>}
        </div>

        <div className="field">
          <label htmlFor="interviewDate">
            Interview date <span className="hint">(optional)</span>
          </label>
          <input
            id="interviewDate"
            type="date"
            className={`input ${showError('interviewDate') ? 'has-error' : ''}`}
            value={values.interviewDate}
            onChange={(e) => update('interviewDate', e.target.value)}
            onBlur={() => handleBlur('interviewDate')}
          />
          {showError('interviewDate') && <span className="error-msg">{errors.interviewDate}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Job description</label>
        <textarea
          id="description"
          className="textarea"
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Brief summary of the role and responsibilities"
        />
      </div>

      <div className="field">
        <label htmlFor="notes">
          Notes <span className="hint">(rounds, referrals, prep reminders…)</span>
        </label>
        <textarea
          id="notes"
          className="textarea"
          value={values.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Anything worth remembering about this application"
        />
      </div>

      <div className="app-form-actions">
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
