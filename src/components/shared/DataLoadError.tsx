interface DataLoadErrorProps {
  title?: string;
  message: string;
}

export function DataLoadError({
  title = "Unable to load salon data",
  message,
}: DataLoadErrorProps) {
  return (
    <section className="container-shell py-12 lg:py-20">
      <div className="glass-panel max-w-3xl p-6 sm:p-8">
        <p className="section-eyebrow">Connection Issue</p>
        <h1 className="mt-4 text-3xl">{title}</h1>
        <p className="mt-4 text-base leading-8 text-foreground/75">{message}</p>
        <p className="mt-4 text-sm leading-7 text-foreground/60">
          Make sure the backend is running on <code>http://localhost:3001</code> and that it can
          read from Supabase.
        </p>
      </div>
    </section>
  );
}
