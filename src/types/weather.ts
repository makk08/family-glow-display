export type WeatherData = {
  current: {
    temperature: number;
    weatherCode: number;
    isDay: number;
  };
  today: {
    tempMax: number;
    tempMin: number;
  };
  hourly: Array<{
    time: string;
    temperature: number;
    weatherCode: number;
  }>;
};
