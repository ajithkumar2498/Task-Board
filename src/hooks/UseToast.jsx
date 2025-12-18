import { AlertCircle, CheckCircle2 } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";


const ToastContext = createContext(null);
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  useEffect(() => { if (toast) setTimeout(() => setToast(null), 3000); }, [toast]);

  return (
    <ToastContext.Provider value={(msg, type = 'success') => setToast({ msg, type })}>
      {children}
      {toast && (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg animate-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
export const useToast = () => useContext(ToastContext);