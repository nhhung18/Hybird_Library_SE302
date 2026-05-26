import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

export default function ToastNotification({ message, onClose }: ToastNotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-22 right-6 z-[9999] pointer-events-none"
        >
          <div className="w-[340px] bg-white border border-gray-100 rounded-3xl p-4 flex items-center gap-4 shadow-xl select-none">
            <div className="shrink-0 w-11 h-11 bg-green-50 border border-green-200 rounded-full flex items-center justify-center text-green-600 shadow-inner">
              <Check size={22} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm mb-0.5 font-sans">Thông báo</h4>
              <p className="text-xs font-semibold text-gray-600 leading-relaxed font-sans pr-2">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
