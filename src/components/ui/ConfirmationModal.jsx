import { useRef } from "react";
import { AlertTriangle } from "lucide-react";

import Modal from "./Modal";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
  destructive = true,
}) {
  const cancelButtonRef = useRef(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      initialFocusRef={cancelButtonRef}
      isBusy={loading}
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          {destructive && (
            <div className="rounded-xl bg-red-500/10 p-2 text-red-400">
              <AlertTriangle size={20} />
            </div>
          )}

          <p className="pt-1 text-sm leading-6 text-slate-300">
            {description}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
          <button
            ref={cancelButtonRef}
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
              destructive
                ? "bg-red-500 hover:bg-red-400"
                : "bg-blue-500 hover:bg-blue-400"
            }`}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;