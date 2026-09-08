import { useCallback, useState } from "react";

import { ToastContext } from "./ToastContextValue";

const DEFAULT_DURATION = 4000;

function createToastId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "info", duration = DEFAULT_DURATION) => {
      const id = createToastId();

      setToasts((current) => [
        ...current,
        { id, message, type },
      ]);

      if (duration > 0) {
        window.setTimeout(() => dismissToast(id), duration);
      }

      return id;
    },
    [dismissToast]
  );

  const value = {
    toasts,
    dismissToast,
    showToast,
    showSuccess: (message, duration) =>
      showToast(message, "success", duration),
    showError: (message, duration) =>
      showToast(message, "error", duration),
    showWarning: (message, duration) =>
      showToast(message, "warning", duration),
    showInfo: (message, duration) =>
      showToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}
