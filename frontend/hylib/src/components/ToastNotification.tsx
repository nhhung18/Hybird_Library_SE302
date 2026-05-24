import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface ToastNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const ToastNotification = ({ isOpen, onClose, message }: ToastNotificationProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-22 right-6 z-[9999] pointer-events-none"
        >
          <div className="w-[340px] glass-panel rounded-3xl p-4 flex items-center gap-4">
            <div className="shrink-0 w-11 h-11 bg-white/80 rounded-full shadow-sm border border-black/5 flex items-center justify-center text-[#1e3b2b]">
              <Check size={22} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm mb-0.5">Thông báo</h4>
              <p className="text-xs font-medium text-gray-600 leading-relaxed pr-2">
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
