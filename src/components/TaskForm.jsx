import { useState } from "react";
import { Button, Input, Select } from "./Button";
import { PRIORITIES, STATUSES } from "../Utils/data";

export const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  // FIX: Use the 'initialData' prop, NOT the 'INITIAL_DATA' constant
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Backlog',
    priority: 'Medium',
    assignee: '',
    tags: '',
    ...(initialData || {}) // Merge prop on top of defaults
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = Array.isArray(formData.tags) 
      ? formData.tags 
      : (formData.tags || '').split(',').map(t => t.trim()).filter(Boolean);
      
    if (!formData.title || !formData.assignee) return;
    
    onSubmit({ ...formData, tags: tagsArray });
  };

  // Helper to safely handle tags display
  const tagsString = Array.isArray(formData.tags) ? formData.tags.join(', ') : (formData.tags || '');

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        label="Title" 
        //Now guaranteed to be a string, never undefined
        value={formData.title || ''} 
        onChange={e => setFormData({...formData, title: e.target.value})} 
        autoFocus 
        required 
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Select 
          label="Status" 
          options={Object.keys(STATUSES).map(k => ({ value: k, label: k }))} 
          value={formData.status || 'Backlog'} 
          onChange={e => setFormData({...formData, status: e.target.value})} 
        />
        <Select 
          label="Priority" 
          options={Object.keys(PRIORITIES).map(k => ({ value: k, label: k }))} 
          value={formData.priority || 'Medium'} 
          onChange={e => setFormData({...formData, priority: e.target.value})} 
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm border p-2 h-24" 
          value={formData.description || ''} 
          onChange={e => setFormData({...formData, description: e.target.value})} 
        />
      </div>

      <Input 
        label="Assignee" 
        value={formData.assignee || ''} 
        onChange={e => setFormData({...formData, assignee: e.target.value})} 
        required 
      />
      
      <Input 
        label="Tags" 
        value={tagsString} 
        onChange={e => setFormData({...formData, tags: e.target.value})} 
        placeholder="frontend, bug" 
      />
      
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Task</Button>
      </div>
    </form>
  );
};