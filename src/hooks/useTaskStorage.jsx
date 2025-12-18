import { useCallback, useEffect, useState } from "react";
import { INITIAL_DATA, migrateData, STORAGE_KEY } from "../Utils/data";


const useTaskStorage = () => {
  const [data, setData] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? migrateData(JSON.parse(item)) : INITIAL_DATA;
    } catch (error) {
      console.error("Storage load error:", error);
      return INITIAL_DATA;
    }
  });

  // 2. Persist to LocalStorage whenever state changes (Self-Tab Sync)
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  }, [data]);

  // 3. LISTEN for Storage Events (Cross-Tab Sync)
  // This ensures that if you change data in Tab A, Tab B updates automatically.
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : INITIAL_DATA;
          setData(migrateData(newValue));
        } catch (error) {
          console.error("Storage sync error:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 4. Update Helper
  // Wraps setData to ensure we are updating the 'tasks' array specifically
  const updateTasks = useCallback((action) => {
    setData(prev => ({
      ...prev,
      tasks: typeof action === 'function' ? action(prev.tasks) : action
    }));
  }, []);

  return { tasks: data.tasks, setTasks: updateTasks };
};

export const useUrlFilters = () => {
  const [filters, setFilters] = useState({ search: '', priority: 'All' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      search: params.get('search') || '',
      priority: params.get('priority') || 'All'
    });
  }, []);

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const params = new URLSearchParams(window.location.search);
    value && value !== 'All' ? params.set(key, value) : params.delete(key);
    window.history.replaceState({}, '', `?${params.toString()}`);
  };

  return { filters, updateFilter };
};

export default useTaskStorage