import { ArrowDownCircle, ArrowRightCircle, ArrowUpCircle } from "lucide-react";

const SCHEMA_VERSION = 2;

export const INITIAL_DATA = {
  version: SCHEMA_VERSION,
  tasks: [
    {
      id: 'init-1',
      title: 'Welcome to your board',
      description: 'This is a sample task. Try dragging it to another column!',
      status: 'Backlog',
      priority: 'Medium',
      assignee: 'You',
      tags: ['onboarding'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]
};

export const PRIORITIES = {
  High: { color: 'text-red-600 bg-red-50 border-red-200', icon: ArrowUpCircle },
  Medium: { color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: ArrowRightCircle },
  Low: { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: ArrowDownCircle },
};

export const STATUSES = {
  Backlog: { color: 'bg-gray-100 border-gray-300' },
  'In Progress': { color: 'bg-blue-50 border-blue-200' },
  Done: { color: 'bg-green-50 border-green-200' },
};

export const STORAGE_KEY = 'ever_quint_workflow_data';

// Generate a unique ID
export const generateId = () => Math.random().toString(36).substr(2, 9);

// Format date
export const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(isoString));
};

// Migration Logic
export const migrateData = (storedData) => {

  let data = { ...storedData };
  if (!data.version || data.version < 2) {
    console.info('Migrating data to version 2...');
    data.tasks = data.tasks.map(task => ({
      ...task,
      tags: task.tags || [],
      priority: task.priority || 'Medium'
    }));
    data.version = 2;
  }
  return data;
};