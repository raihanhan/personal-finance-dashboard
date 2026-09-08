import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react";

import { useToast } from "../../hooks/useToast";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-emerald-400",
    accentClass: "border-emerald-500/30",
  },
  error: {
    icon: XCircle,
    iconClass: "text-red-400",
    accentClass: "border-red-500/30",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-400",
    accentClass: "border-amber-500/30",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-400",
    accentClass: "border-blue-500/30",
  },
};

function ToastViewport() {
  const { toasts, dismissToast } = useToast();

  return (
    <div
      className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col items-end gap-3 sm:left-auto sm:w-full sm:max-w-sm"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => {
        const style = toastStyles[toast.type] || toastStyles.info;
        const Icon = style.icon;

        return (
          <div
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
            className={`pointer-events-auto flex w-full items-start gap-3 rounded-xl border bg-[#111927]/95 p-4 text-sm text-slate-200 shadow-2xl backdrop-blur ${style.accentClass}`}
          >
            <Icon size={19} className={`mt-0.5 shrink-0 ${style.iconClass}`} />
            <p className="min-w-0 flex-1 leading-5">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-md p-1 text-slate-500 transition hover:bg-slate-800 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastViewport;
