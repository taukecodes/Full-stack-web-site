import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg shadow-lg border text-sm transition-all animate-in fade-in slide-in-from-bottom-3 duration-300 ${
              isSuccess
                ? 'bg-[#1A1715] text-[#FAF7F2] border-[#3E3731]'
                : isError
                ? 'bg-[#3A1813] text-[#FDE8E4] border-[#7F2D1F]'
                : 'bg-[#FAF7F2] text-[#1A1715] border-[#DED8CE]'
            }`}
            role="alert"
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 size={16} className="text-[#B85021]" />}
              {isError && <AlertCircle size={16} className="text-[#E5533D]" />}
              {!isSuccess && !isError && <Info size={16} className="text-[#3D5948]" />}
            </div>

            <p className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
              {toast.message}
            </p>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8C847C] hover:text-[#FAF7F2] p-0.5 rounded transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
