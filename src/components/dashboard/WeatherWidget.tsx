import { Cloud, Sun, CloudRain, CloudSnow, Wind } from "lucide-react";

const WeatherWidget = () => {
  // Mock-Daten — später mit OpenWeatherMap API für Zürich Wiedikon ersetzen
  // API: https://api.openweathermap.org/data/2.5/weather?q=Zurich&units=metric&lang=de&appid=YOUR_KEY
  const weather = {
    temp: 12,
    condition: "Teilweise bewölkt",
    location: "Zürich Wiedikon",
    high: 16,
    low: 7,
    humidity: 72,
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
        <span>T: {weather.low}°</span>
        <span>{weather.humidity}% Feuchtigkeit</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
