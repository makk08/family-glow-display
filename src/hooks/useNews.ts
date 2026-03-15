import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "@/lib/news/rss";

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 10,
  });
}
