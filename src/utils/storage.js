import { STORAGE_KEY } from '../data/constants';
import { buildSampleApplications } from '../data/sampleData';

export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = buildSampleApplications();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('Corrupt data shape');
    return parsed;
  } catch (err) {
    console.error('Failed to load applications from storage:', err);
    return [];
  }
}

export function saveApplications(applications) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return true;
  } catch (err) {
    console.error('Failed to save applications to storage:', err);
    return false;
  }
}

export function clearApplications() {
  localStorage.removeItem(STORAGE_KEY);
}
