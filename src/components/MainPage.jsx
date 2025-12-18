import { Plus, Search } from "lucide-react";
import { BoardColumn } from "./BoardColumn";
import { Button } from "./Button";
import { STATUSES } from "../Utils/data";


export const AppHeader = ({ onNewTask }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">AK</div>
      <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Task Board</h1>
    </div>
    <Button onClick={onNewTask} size="sm" className="shadow-lg shadow-indigo-100">
      <Plus size={16} className="mr-2" /> New Task
    </Button>
  </div>
);

export const FilterBar = ({ filters, onUpdate }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-3">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input 
        type="text" placeholder="Filter tasks..." 
        className="w-full pl-9 pr-4 py-1.5 text-sm border rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all"
        value={filters.search} onChange={(e) => onUpdate('search', e.target.value)}
      />
    </div>
    <select 
      className="pl-3 pr-8 py-1.5 text-sm border rounded-full bg-white hover:bg-gray-50 cursor-pointer focus:ring-2 focus:ring-indigo-500"
      value={filters.priority} onChange={(e) => onUpdate('priority', e.target.value)}
    >
      <option value="All">All Priorities</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>
);

export const BoardGrid = ({ tasks, onEditTask, onDropTask }) => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-140px)]">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      {Object.keys(STATUSES).map(status => (
        <BoardColumn 
          key={status} status={status} 
          tasks={tasks.filter(t => t.status === status)}
          onEdit={onEditTask}
          onDropTask={onDropTask}
        />
      ))}
    </div>
  </main>
);