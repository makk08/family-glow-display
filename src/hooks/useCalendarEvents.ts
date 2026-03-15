import { useQuery } from "@tanstack/react-query";
import {
  fetchCalendarEvents,
  getMonthRange,
  getTodayRange,
  getWeekRange,
} from "@/lib/calendar/ics";

type ViewMode = "day" | "week" | "month";

export function useCalendarEvents(view: ViewMode) {
  const range =
    view === "day"
      ? getTodayRange()
      : view === "week"
      ? getWeekRange()
      : getMonthRange();

  return useQuery({
    queryKey: [
      "calendar-events",
      view,
      range.start.toISOString(),
      range.end.toISOString(),
    ],
    queryFn: () => fetchCalendarEvents(range.start, range.end),
    staleTime: 1000 * 60 * 5,
  });
}
