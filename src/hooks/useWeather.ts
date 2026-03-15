import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/weather/openMeteo";

export function useWeather() {
  return useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
  });
}
