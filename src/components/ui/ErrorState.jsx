import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "Unable to load this section",
  message = "Something went wrong. Please try again.",
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-[#111927] p-8 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
        <AlertCircle size={24} />
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
