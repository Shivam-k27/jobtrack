export function validateApplication(values) {
  const errors = {};

  if (!values.company || !values.company.trim()) {
    errors.company = 'Company name is required.';
  }

  if (!values.role || !values.role.trim()) {
    errors.role = 'Job role is required.';
  }

  if (!values.ctc || !values.ctc.trim()) {
    errors.ctc = 'Add a package/CTC, e.g. "12 LPA".';
  }

  if (!values.location || !values.location.trim()) {
    errors.location = 'Location is required.';
  }

  if (!values.appliedDate) {
    errors.appliedDate = 'Application date is required.';
  }

  if (!values.deadline) {
    errors.deadline = 'Deadline is required.';
  }

  if (
    values.appliedDate &&
    values.deadline &&
    new Date(values.deadline) < new Date(values.appliedDate)
  ) {
    errors.deadline = 'Deadline cannot be before the application date.';
  }

  if (!values.status) {
    errors.status = 'Select a status.';
  }

  if (
    values.status === 'Interview' &&
    values.interviewDate &&
    values.appliedDate &&
    new Date(values.interviewDate) < new Date(values.appliedDate)
  ) {
    errors.interviewDate = 'Interview date cannot be before the application date.';
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `app-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
