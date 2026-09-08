function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
}) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-[#111927] p-8 text-center">
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Icon size={24} />
        </div>
      )}

      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-400"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
