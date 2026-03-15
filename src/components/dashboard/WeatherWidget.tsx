import { useWeather } from "@/hooks/useWeather";
import { getWeatherIcon, getWeatherLabel } from "@/lib/weather/openMeteo";

function formatHour(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const WeatherWidget = () => {
  const { data, isLoading, error } = useWeather();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Wetter wird geladen...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">Wetter konnte nicht geladen werden.</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {error instanceof Error ? error.message : "Unbekannter Fehler"}
          </p>
        </div>
      </div>
    );
  }

  const icon = getWeatherIcon(data.current.weatherCode, data.current.isDay);
  const label = getWeatherLabel(data.current.weatherCode);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Wetter
          </p>
          <p className="mt-2 text-4xl font-semibold leading-none">
            {Math.round(data.current.temperature)}°
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            H: {Math.round(data.today.tempMax)}° · T: {Math.round(data.today.tempMin)}°
          </p>
        </div>

        <div className="text-4xl leading-none">{icon}</div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {data.hourly.slice(0, 3).map((hour) => (
          <div
            key={hour.time}
            className="rounded-xl bg-secondary/70 p-2 text-center"
          >
            <p className="text-[11px] text-muted-foreground">{formatHour(hour.time)}</p>
            <p className="mt-1 text-base">
              {getWeatherIcon(hour.weatherCode, data.current.isDay)}
            </p>
            <p className="text-sm font-medium">{Math.round(hour.temperature)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
