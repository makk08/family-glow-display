import { useQuery } from "@tanstack/react-query";
import { fetchNowPlaying } from "@/lib/spotify/api";

export function useSpotifyNowPlaying() {
  return useQuery({
    queryKey: ["spotify-now-playing"],
    queryFn: fetchNowPlaying,
    refetchInterval: 10000,
    staleTime: 5000,
    retry: false,
  });
}
