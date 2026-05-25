import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

export default function ToastNotification({ message, onClose }: ToastNotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      // Wait for exit transition to complete before triggering onClose
      setTimeout(onClose, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      className={`fixed top-6 right-6 z-[9999] transition-all duration-300 transform ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      }`}
    >
      <div className="w-[340px] bg-white border border-gray-100 rounded-3xl p-4 flex items-center gap-4 shadow-xl select-none">
        <div className="shrink-0 w-11 h-11 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-600 shadow-inner">
          <Check size={22} strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 text-sm mb-0.5 font-sans">Thành công</h4>
          <p className="text-xs font-semibold text-gray-600 leading-relaxed font-sans pr-2">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
