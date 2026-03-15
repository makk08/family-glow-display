import { useQuery } from "@tanstack/react-query";
import { fetchNextBus } from "@/lib/transport/zvv";

export function useNextBus() {
  return useQuery({
    queryKey: ["next-bus"],
    queryFn: fetchNextBus,
    refetchInterval: 30000,
  });
}
