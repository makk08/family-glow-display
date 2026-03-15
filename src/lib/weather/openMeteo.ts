import type { WeatherData } from "@/types/weather";

const LAT = import.meta.env.VITE_OPEN_METEO_LAT;
const LON = import.meta.env.VITE_OPEN_METEO_LON;

type OpenMeteoResponse = {
  current?: {
    temperature_2m: number;
    weather_code: number;
    is_day: number;
  };
  daily?: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
};

export function getWeatherLabel(code: number) {
  if (code === 0) return "Klar";
  if ([1, 2, 3].includes(code)) return "Teilweise bewölkt";
  if ([45, 48].includes(code)) return "Nebel";
  if ([51, 53, 55, 56, 57].includes(code)) return "Niesel";
  if ([61, 63, 65, 66, 67].includes(code)) return "Regen";
  if ([71, 73, 75, 77].includes(code)) return "Schnee";
  if ([80, 81, 82].includes(code)) return "Regenschauer";
  if ([85, 86].includes(code)) return "Schneeschauer";
  if ([95, 96, 99].includes(code)) return "Gewitter";
  return "Unbekannt";
}

export function getWeatherIcon(code: number, isDay: number) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if ([1, 2].includes(code)) return isDay ? "🌤️" : "☁️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
}

export async function fetchWeather(): Promise<WeatherData> {
  if (!LAT || !LON) {
    throw new Error("VITE_OPEN_METEO_LAT oder VITE_OPEN_METEO_LON fehlt in .env");
  }

  const params = new URLSearchParams({
    latitude: LAT,
    longitude: LON,
    current: "temperature_2m,weather_code,is_day",
    hourly: "temperature_2m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min",
    forecast_days: "1",
    timezone: "auto",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Wetter-Abruf fehlgeschlagen: ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoResponse;

  if (!data.current || !data.daily || !data.hourly) {
    throw new Error("Wetterdaten unvollständig");
  }

  const hourly = data.hourly.time.slice(0, 8).map((time, index) => ({
    time,
    temperature: data.hourly!.temperature_2m[index],
    weatherCode: data.hourly!.weather_code[index],
  }));

  return {
    current: {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day,
    },
    today: {
      tempMax: data.daily.temperature_2m_max[0],
      tempMin: data.daily.temperature_2m_min[0],
    },
    hourly,
  };
}
