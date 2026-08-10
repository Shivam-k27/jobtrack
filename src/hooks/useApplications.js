import { useCallback, useEffect, useState } from 'react';
import { loadApplications, saveApplications } from '../utils/storage';
import { generateId } from '../utils/validation';

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = loadApplications();
    setApplications(data);
    setIsLoading(false);
  }, []);

  const persist = useCallback((next) => {
    setApplications(next);
    saveApplications(next);
  }, []);

  const addApplication = useCallback(
    (values) => {
      const now = new Date().toISOString().slice(0, 10);
      const newApp = {
        ...values,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      setApplications((prev) => {
        const next = [newApp, ...prev];
        saveApplications(next);
        return next;
      });
      return newApp;
    },
    []
  );

  const updateApplication = useCallback((id, values) => {
    setApplications((prev) => {
      const now = new Date().toISOString().slice(0, 10);
      const next = prev.map((app) =>
        app.id === id ? { ...app, ...values, updatedAt: now } : app
      );
      saveApplications(next);
      return next;
    });
  }, []);

  const deleteApplication = useCallback((id) => {
    setApplications((prev) => {
      const next = prev.filter((app) => app.id !== id);
      saveApplications(next);
      return next;
    });
  }, []);

  const getApplication = useCallback(
    (id) => applications.find((app) => app.id === id) || null,
    [applications]
  );

  return {
    applications,
    isLoading,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplication,
    setApplications: persist,
  };
}
