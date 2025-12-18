import { X } from "lucide-react";
import React, { useEffect } from "react";



export const Button = ({ variant = 'primary', size = 'md', className = '', children, disabled, ...props }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm focus:ring-indigo-500",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm focus:ring-indigo-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 focus:ring-gray-500",
  };
  const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 py-2 text-sm" };

  return (
    <button 
      disabled={disabled}
      aria-disabled={disabled}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Accessible Input with ID generation and Error association
export const Input = React.forwardRef(({ label, error, id, className = '', ...props }, ref) => {
  // Generate a stable ID if one isn't provided, to link label and input
  const inputId = id || React.useId ? React.useId() : `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input 
        id={inputId}
        ref={ref} 
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2 ${error ? 'border-red-500' : ''} ${className}`} 
        {...props} 
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
});


// Accessible Select
export const Select = React.forwardRef(({ label, options, error, id, ...props }, ref) => {
  const selectId = id || React.useId ? React.useId() : `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select 
        id={selectId}
        ref={ref} 
        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border p-2" 
        {...props}
      >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  );
});


// Accessible Modal with Escape key support
export const Modal = ({ isOpen, onClose, title, children }) => {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-lg rounded-lg bg-white shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:bg-gray-100 rounded p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};