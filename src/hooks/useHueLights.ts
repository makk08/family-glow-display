import { useQuery } from "@tanstack/react-query";
import { fetchHueRooms } from "@/lib/hue/api";

export function useHueLights() {
  return useQuery({
    queryKey: ["hue-rooms"],
    queryFn: fetchHueRooms,
    refetchInterval: 15000,
    staleTime: 10000,
  });
}
