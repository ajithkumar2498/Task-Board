import React, { useMemo, useState } from "react";
import { useToast } from "./hooks/UseToast";
import useTaskStorage, { useUrlFilters } from "./hooks/useTaskStorage";
import { AppHeader, BoardGrid, FilterBar } from "./components/MainPage";
import { Modal } from "./components/Button";
import { TaskForm } from "./components/TaskForm";
import { generateId } from "./Utils/data";

const App = () => {
  const { tasks, setTasks } = useTaskStorage();
  const showToast = useToast();
  const { filters, updateFilter } = useUrlFilters();

  const [modalState, setModalState] = useState({ isOpen: false, task: null });

  // Derived state
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchMatch = (task.title + task.description)
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const priorityMatch =
        filters.priority === "All" || task.priority === filters.priority;
      return searchMatch && priorityMatch;
    });
  }, [tasks, filters]);

  // Handlers
  const handleSave = (taskData) => {
    const now = new Date().toISOString();

    if (modalState.task) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === modalState.task.id
            ? { ...t, ...taskData, updatedAt: now }
            : t
        )
      );
      showToast("Task updated successfully");
    } else {
      setTasks((prev) => [
        ...prev,
        { ...taskData, id: generateId(), createdAt: now, updatedAt: now },
      ]);
      showToast("New task created");
    }
    setModalState({ isOpen: false, task: null });
  };

  const handleDropTask = (taskId, newStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
            : t
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b sticky top-0 z-10">
        <AppHeader
          onNewTask={() => setModalState({ isOpen: true, task: null })}
        />
        <FilterBar filters={filters} onUpdate={updateFilter} />
      </header>

      <BoardGrid
        tasks={filteredTasks}
        onEditTask={(task) => setModalState({ isOpen: true, task })}
        onDropTask={handleDropTask}
      />

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, task: null })}
        title={modalState.task ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          key={modalState.task ? modalState.task.id : "new"}
          initialData={modalState.task}
          onSubmit={handleSave}
          onCancel={() => setModalState({ isOpen: false, task: null })}
        />
      </Modal>
    </div>
  );
};

export default App;
