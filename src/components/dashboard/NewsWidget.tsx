import { useNews } from "@/hooks/useNews";

const NewsWidget = () => {
  const { data, isLoading, error } = useNews();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">News werden geladen...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">
            News konnten nicht geladen werden
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {error instanceof Error ? error.message : "Unbekannter Fehler"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
        News
      </p>

      <div className="space-y-3">
        {data.map((news, i) => (
          <a
            key={i}
            href={news.link}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg px-2 py-1 transition hover:bg-secondary"
          >
            <p className="line-clamp-2 text-sm leading-snug">{news.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
