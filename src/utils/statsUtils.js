import { STATUSES } from '../data/constants';
import { isWithinNextDays, monthKey, monthLabel } from './dateUtils';

export function computeStatusCounts(applications) {
  const counts = Object.fromEntries(STATUSES.map((s) => [s, 0]));
  applications.forEach((app) => {
    if (counts[app.status] !== undefined) counts[app.status] += 1;
  });
  return counts;
}

export function computeStatusChartData(applications) {
  const counts = computeStatusCounts(applications);
  return STATUSES.map((status) => ({ status, count: counts[status] }));
}

export function computeUpcoming(applications, days = 14) {
  const items = [];
  applications.forEach((app) => {
    if (app.interviewDate && isWithinNextDays(app.interviewDate, days)) {
      items.push({ id: `${app.id}-interview`, app, date: app.interviewDate, kind: 'Interview' });
    }
    if (
      app.deadline &&
      isWithinNextDays(app.deadline, days) &&
      !['Selected', 'Rejected'].includes(app.status)
    ) {
      items.push({ id: `${app.id}-deadline`, app, date: app.deadline, kind: 'Deadline' });
    }
  });
  return items.sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function computeApplicationsOverTime(applications) {
  const map = new Map();
  applications.forEach((app) => {
    const key = monthKey(app.appliedDate);
    if (!key) return;
    map.set(key, (map.get(key) || 0) + 1);
  });
  const sortedKeys = Array.from(map.keys()).sort();
  return sortedKeys.map((key) => ({ key, label: monthLabel(key), count: map.get(key) }));
}

export function computeSelectedVsRejected(applications) {
  const selected = applications.filter((a) => a.status === 'Selected').length;
  const rejected = applications.filter((a) => a.status === 'Rejected').length;
  return [
    { name: 'Selected', value: selected },
    { name: 'Rejected', value: rejected },
  ];
}

export function computeSummary(applications) {
  const counts = computeStatusCounts(applications);
  return {
    total: applications.length,
    applied: counts.Applied,
    onlineAssessment: counts['Online Assessment'],
    interview: counts.Interview,
    selected: counts.Selected,
    rejected: counts.Rejected,
    active: applications.filter((a) => !['Selected', 'Rejected'].includes(a.status)).length,
  };
}
