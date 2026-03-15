import { useNextBus } from "@/hooks/useNextBus";
import { minutesUntil } from "@/lib/transport/zvv";

const NextBusWidget = () => {
  const { data, isLoading, error } = useNextBus();

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Bus 67
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Gutstrasse → Wiedikon
      </p>

      {isLoading && (
        <p className="mt-6 text-sm text-muted-foreground">
          Lade Abfahrten…
        </p>
      )}

      {error && (
        <p className="mt-6 text-sm text-destructive">
          Busdaten konnten nicht geladen werden
        </p>
      )}

      {data && (
        <div className="mt-6 space-y-3">
          {data.map((bus, i) => {
            const minutes = minutesUntil(bus.departure);

            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-secondary/70 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🚌</span>
                  <span className="text-sm font-medium">67</span>
                </div>

                <span className="text-lg font-semibold">
                  {minutes <= 0 ? "Jetzt" : `${minutes} min`}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NextBusWidget;
