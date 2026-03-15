import { useQueryClient } from "@tanstack/react-query";
import { useHueLights } from "@/hooks/useHueLights";
import { toggleHueRoom } from "@/lib/hue/api";

const SmartHomeWidget = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useHueLights();

  const handleToggle = async (id: string, currentState: boolean) => {
    await toggleHueRoom(id, !currentState);
    await queryClient.invalidateQueries({ queryKey: ["hue-rooms"] });
  };

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Smart Home
      </p>

      {isLoading && (
        <p className="mt-4 text-sm text-muted-foreground">
          Räume werden geladen...
        </p>
      )}

      {error && (
        <p className="mt-4 text-sm text-destructive">
          Hue konnte nicht geladen werden
        </p>
      )}

      {data && (
        <div className="mt-4 space-y-3">
          {data.map((room) => (
            <button
              key={room.id}
              onClick={() => handleToggle(room.id, room.isOn)}
              className="flex w-full items-center justify-between rounded-xl bg-secondary/70 px-4 py-3"
            >
              <span className="text-sm font-medium">
                {room.name}
              </span>

              <span
                className={`h-3 w-3 rounded-full ${
                  room.isOn ? "bg-green-500" : "bg-muted"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartHomeWidget;
