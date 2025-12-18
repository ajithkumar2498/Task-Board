import { useState } from "react";
import { STATUSES } from "../Utils/data";
import { TaskCard } from "./TaskCard";

export const BoardColumn = ({ status, tasks, onEdit, onDropTask }) => {
  const [isOver, setIsOver] = useState(false);
  const handleDrop = (e) => {
    e.preventDefault(); setIsOver(false);
    onDropTask(e.dataTransfer.getData('taskId'), status);
  };

  return (
    <div 
      className={`flex flex-col h-full rounded-xl bg-gray-50/50 border-2 transition-colors ${isOver ? 'border-indigo-400 bg-indigo-50' : 'border-transparent'}`}
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <div className={`p-3 border-b flex items-center justify-between rounded-t-xl ${STATUSES[status].color}`}>
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">{status}<span className="bg-white/50 px-2 py-0.5 rounded text-sm text-gray-600">{tasks.length}</span></h3>
      </div>
      <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-[150px]">
        {tasks.map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} onDragStart={(e, id) => e.dataTransfer.setData('taskId', id)} />)}
        {tasks.length === 0 && <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg p-4 opacity-50">Drop tasks here</div>}
      </div>
    </div>
  );
};