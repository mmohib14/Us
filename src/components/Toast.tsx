import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#171A1D] text-white p-4 rounded-xl shadow-2xl border-l-4 border-[#F36B21] flex items-start gap-3 animate-slideUp">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
      <div className="text-xs sm:text-sm font-medium pr-2 flex-grow">
        {message}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
        aria-label="Dismiss alert"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
