export const STORAGE_KEY = 'jobtrack.applications.v1';
export const THEME_KEY = 'jobtrack.theme.v1';

export const STATUSES = [
  'Applied',
  'Online Assessment',
  'Interview',
  'Selected',
  'Rejected',
];

// Order used to render a candidate's journey along the pipeline rail.
// Rejected is treated as a terminal branch rather than a rail step.
export const PIPELINE_STEPS = [
  'Applied',
  'Online Assessment',
  'Interview',
  'Selected',
];

export const STATUS_TONE = {
  Applied: 'slate',
  'Online Assessment': 'blue',
  Interview: 'violet',
  Selected: 'gold',
  Rejected: 'red',
};

export const STATUS_CHART_COLOR = {
  Applied: 'var(--slate)',
  'Online Assessment': 'var(--blue)',
  Interview: 'var(--violet)',
  Selected: 'var(--gold)',
  Rejected: 'var(--red)',
};

export const JOB_LOCATIONS = [
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Gurugram',
  'Chennai',
  'Mumbai',
  'Remote',
];

export const SORT_OPTIONS = [
  { value: 'deadline-asc', label: 'Deadline (soonest first)' },
  { value: 'deadline-desc', label: 'Deadline (latest first)' },
  { value: 'applied-desc', label: 'Applied date (newest first)' },
  { value: 'applied-asc', label: 'Applied date (oldest first)' },
  { value: 'company-asc', label: 'Company (A → Z)' },
  { value: 'ctc-desc', label: 'CTC (highest first)' },
];
