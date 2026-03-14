import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "lucide-react";

const WeatherWidget = () => {
  // Mock data — replace with real API later
  const weather = {
    temp: 18,
    condition: "Partly Cloudy",
    location: "Home",
    high: 22,
    low: 14,
    humidity: 65,
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {weather.location}
      </p>
      <div className="flex items-end gap-4">
        <Sun className="h-12 w-12 text-accent" />
        <span className="font-display text-6xl tabular">{weather.temp}°</span>
      </div>
      <p className="text-lg text-muted-foreground">{weather.condition}</p>
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>H: {weather.high}°</span>
        <span>L: {weather.low}°</span>
        <span>{weather.humidity}% humidity</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
