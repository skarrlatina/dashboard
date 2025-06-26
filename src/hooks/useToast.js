import { useState, useRef } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const showToast = (message) => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, showToast, removeToast };
} 