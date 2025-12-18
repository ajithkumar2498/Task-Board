import { Calendar, MoreVertical, User } from "lucide-react";
import { formatDate, PRIORITIES } from "../Utils/data";


export const TaskCard = ({ task, onEdit, onDragStart }) => {

  const PriorityIcon = PRIORITIES[task.priority].icon;
  return (
    <div draggable onDragStart={(e) => onDragStart(e, task.id)} className="group bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-move">
      <div className="flex justify-between items-start mb-2">
        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${PRIORITIES[task.priority].color}`}>
          <PriorityIcon size={12} /> {task.priority}
        </span>
        <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={16} /></button>
      </div>
      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{task.title}</h4>
      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags?.map(tag => <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] uppercase rounded">{tag}</span>)}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 mt-2 pt-2 border-t border-gray-50">
        <div className="flex items-center gap-1"><User size={12} /><span className="truncate max-w-80px">{task.assignee}</span></div>
        <div className="flex items-center gap-1"><Calendar size={12} /><span>{formatDate(task.updatedAt).split(',')[0]}</span></div>
      </div>
    </div>
  );
};