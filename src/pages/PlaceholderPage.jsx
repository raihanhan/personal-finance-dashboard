function PlaceholderPage({ title }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">

      <div className="text-center">

        <h1 className="text-3xl font-bold text-white">
          {title}
        </h1>

        <p className="mt-3 text-slate-500">
          This feature is coming soon.
        </p>

      </div>

    </div>
  );
}

export default PlaceholderPage;