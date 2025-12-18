/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// 1. Mock LocalStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// 2. Mock URLSearchParams
const mockUrlParams = (searchString = '') => {
  window.history.replaceState({}, '', `/${searchString}`);
};

describe('Team Workflow Board Integration Tests', () => {
  // Define the mock function for the toast notification
  const mockShowToast = jest.fn();
  
  beforeEach(() => {
    localStorageMock.clear();
    mockUrlParams(); // Reset URL to root
    jest.clearAllMocks();
  });

  test('Core Workflow: User can create a new task and see it on the board', async () => {
    // FIX 1: Pass the mockShowToast prop to the component
    render(<App showToast={mockShowToast} />);

    // 1. Open Modal
    // FIX 2: Use getByRole to strictly select the button, ignoring the header text match
    const newTaskBtn = screen.getByRole('button', { name: /New Task/i });
    fireEvent.click(newTaskBtn);

    // 2. Fill out Form
    const titleInput = screen.getByLabelText(/Title/i);
    const assigneeInput = screen.getByLabelText(/Assignee/i);
    
    // Check that we are looking at the modal
    expect(screen.getByText('Create New Task')).toBeInTheDocument();

    fireEvent.change(titleInput, { target: { value: 'Critical Release Bug' } });
    fireEvent.change(assigneeInput, { target: { value: 'QA Team' } });

    // 3. Save
    const saveBtn = screen.getByText('Save Task');
    fireEvent.click(saveBtn);

    // 4. Assert: Modal closes and task appears
    await waitFor(() => {
      expect(screen.queryByText('Create New Task')).not.toBeInTheDocument();
    });

    // Verify task content is visible on the board
    expect(screen.getByText('Critical Release Bug')).toBeInTheDocument();
    expect(screen.getByText('QA Team')).toBeInTheDocument();
  });

  test('UI Behavior: Search filter correctly hides non-matching tasks', async () => {
    // FIX 1: Pass the mockShowToast prop
    render(<App showToast={mockShowToast} />);

    // --- SETUP: Create two distinct tasks ---
    
    // Task 1: "Fix Login"
    // FIX 2: Use specific button selector
    fireEvent.click(screen.getByRole('button', { name: /New Task/i }));
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Fix Login' } });
    fireEvent.change(screen.getByLabelText(/Assignee/i), { target: { value: 'Dev A' } });
    fireEvent.click(screen.getByText('Save Task'));

    // Task 2: "Update CSS"
    // FIX 2: Use specific button selector
    fireEvent.click(screen.getByRole('button', { name: /New Task/i }));
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Update CSS' } });
    fireEvent.change(screen.getByLabelText(/Assignee/i), { target: { value: 'Dev B' } });
    fireEvent.click(screen.getByText('Save Task'));

    // Verify both exist initially
    await waitFor(() => {
      expect(screen.getByText('Fix Login')).toBeInTheDocument();
      expect(screen.getByText('Update CSS')).toBeInTheDocument();
    });

    // --- ACTION: Type in search bar ---
    const searchInput = screen.getByPlaceholderText(/Filter tasks.../i);
    fireEvent.change(searchInput, { target: { value: 'CSS' } });

    // --- ASSERTION: Only matching task is visible ---
    expect(screen.getByText('Update CSS')).toBeInTheDocument();
    expect(screen.queryByText('Fix Login')).not.toBeInTheDocument();
  });

  test('UI Behavior: Priority filter updates URL and filters tasks', async () => {
    // FIX 1: Pass the mockShowToast prop
    render(<App showToast={mockShowToast} />);

    // Setup: Create a High Priority task
    // FIX 2: Use specific button selector
    fireEvent.click(screen.getByRole('button', { name: /New Task/i }));
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'High Priority Task' } });
    fireEvent.change(screen.getByLabelText(/Assignee/i), { target: { value: 'Manager' } });
    
    // Select "High" priority
    const prioritySelects = screen.getAllByLabelText(/Priority/i);
    const formPrioritySelect = prioritySelects[prioritySelects.length - 1]; 
    fireEvent.change(formPrioritySelect, { target: { value: 'High' } });
    
    fireEvent.click(screen.getByText('Save Task'));

    // Setup: Create a Low Priority task
    // FIX 2: Use specific button selector
    fireEvent.click(screen.getByRole('button', { name: /New Task/i }));
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Low Priority Task' } });
    fireEvent.change(screen.getByLabelText(/Assignee/i), { target: { value: 'Intern' } });
    
    const prioritySelects2 = screen.getAllByLabelText(/Priority/i);
    const formPrioritySelect2 = prioritySelects2[prioritySelects2.length - 1];
    fireEvent.change(formPrioritySelect2, { target: { value: 'Low' } });
    
    fireEvent.click(screen.getByText('Save Task'));

    // --- ACTION: Change Filter Bar Priority ---
    const filterSelect = screen.getByDisplayValue('All Priorities');
    fireEvent.change(filterSelect, { target: { value: 'High' } });

    // --- ASSERTION ---
    await waitFor(() => {
      expect(screen.getByText('High Priority Task')).toBeInTheDocument();
      expect(screen.queryByText('Low Priority Task')).not.toBeInTheDocument();
    });

    // Verify URL was updated
    expect(window.location.search).toContain('priority=High');
  });
});