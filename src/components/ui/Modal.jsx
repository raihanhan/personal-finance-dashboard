import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  initialFocusRef = null,
  isBusy = false,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousActiveElement = document.activeElement;
    const focusTarget = initialFocusRef?.current || modalRef.current;
    focusTarget?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEscape && !isBusy) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus?.();
    };
  }, [closeOnEscape, initialFocusRef, isBusy, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeOnOverlayClick && !isBusy ? onClose : undefined}
      />

      {/* MODAL */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        className="relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-700 bg-[#111927] shadow-2xl outline-none"
      >

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <h2 id="modal-title" className="text-xl font-semibold text-white">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isBusy}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;