import { useMemo, useState } from "react";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import type { CalendarEvent } from "@/types/calendar";

const DAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

type View = "day" | "week" | "month";

const ACCENT_COLORS = [
  "hsl(var(--accent))",
  "hsl(200 80% 55%)",
  "hsl(340 70% 55%)",
  "hsl(270 60% 55%)",
];

function getEventColor(event: CalendarEvent) {
  const str = `${event.title}-${event.location ?? ""}`;
  let hash = 0;

  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

function formatTime(date: Date, allDay: boolean) {
  if (allDay) return "Ganztägig";

  return new Intl.DateTimeFormat("de-CH", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

const CalendarWidget = () => {
  const [view, setView] = useState<View>("day");
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const { data: events = [], isLoading, error } = useCalendarEvents(view);

  const viewOptions: { label: string; value: View }[] = [
    { label: "Tag", value: "day" },
    { label: "Woche", value: "week" },
    { label: "Monat", value: "month" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {view === "day"
            ? "Heute"
            : view === "week"
            ? "Diese Woche"
            : MONTHS[currentMonth]}
        </h2>

        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          {viewOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setView(opt.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                view === opt.value
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {isLoading && (
          <p className="py-8 text-center text-muted-foreground">
            Kalender wird geladen...
          </p>
        )}

        {error && (
          <p className="py-8 text-center text-sm text-destructive">
            Kalender konnte nicht geladen werden.
          </p>
        )}

        {!isLoading && !error && view === "day" && <DayView events={events} />}
        {!isLoading && !error && view === "week" && <WeekView events={events} />}
        {!isLoading && !error && view === "month" && (
          <MonthView events={events} month={currentMonth} year={currentYear} />
        )}
      </div>
    </div>
  );
};

const DayView = ({ events }: { events: CalendarEvent[] }) => {
  const today = new Date();
  const dayEvents = events.filter((e) => isSameDay(e.start, today));

  return (
    <div className="space-y-4">
      {dayEvents.map((event) => {
        const color = getEventColor(event);

        return (
          <div
            key={event.id}
            className="flex items-start gap-4 border-l-4 pl-4"
            style={{ borderColor: color }}
          >
            <span className="mt-0.5 w-20 shrink-0 font-sans text-base tabular text-muted-foreground">
              {formatTime(event.start, event.allDay)}
            </span>
            <div>
              <p className="text-lg font-medium leading-tight">{event.title}</p>
              {event.location ? (
                <p className="text-sm text-muted-foreground">{event.location}</p>
              ) : null}
            </div>
          </div>
        );
      })}

      {dayEvents.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">
          Keine Termine heute
        </p>
      )}
    </div>
  );
};

const WeekView = ({ events }: { events: CalendarEvent[] }) => {
  const now = new Date();
  const jsDay = now.getDay();
  const diffToMonday = jsDay === 0 ? -6 : 1 - jsDay;

  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });

  return (
    <div className="space-y-1">
      {weekDays.map((dayDate, i) => {
        const dayEvents = events.filter((e) => isSameDay(e.start, dayDate));
        const isToday = isSameDay(dayDate, now);

        return (
          <div
            key={dayDate.toISOString()}
            className={`rounded-lg p-3 transition-colors ${
              isToday ? "bg-secondary" : ""
            }`}
          >
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                  isToday
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {dayDate.getDate()}
              </span>
              <span
                className={`text-xs uppercase tracking-wide ${
                  isToday ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {DAYS_SHORT[i]}
              </span>
            </div>

            {dayEvents.length > 0 ? (
              <div className="ml-9 space-y-1">
                {dayEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: getEventColor(event) }}
                    />
                    <span className="text-xs tabular text-muted-foreground">
                      {formatTime(event.start, event.allDay)}
                    </span>
                    <span className="truncate text-sm">{event.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ml-9">
                <span className="text-xs text-muted-foreground/50">—</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MonthView = ({
  events,
  month,
  year,
}: {
  events: CalendarEvent[];
  month: number;
  year: number;
}) => {
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());

  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array.from({ length: startOffset + daysInMonth }, (_, i) =>
    i < startOffset ? null : i - startOffset + 1
  );

  while (cells.length % 7 !== 0) cells.push(null);

  const selectedDate = new Date(year, month, selectedDay);

  const selectedEvents = useMemo(
    () => events.filter((e) => isSameDay(e.start, selectedDate)),
    [events, selectedDate]
  );

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS_SHORT.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;

          const date = new Date(year, month, day);
          const hasEvents = events.some((e) => isSameDay(e.start, date));
          const isToday = isSameDay(date, today);
          const isSelected = day === selectedDay;

          return (
            <button
              key={i}
              onClick={() => setSelectedDay(day)}
              className={`relative flex min-h-[44px] flex-col items-center rounded-md py-1.5 text-sm transition-colors ${
                isSelected
                  ? "bg-secondary"
                  : isToday
                  ? "bg-accent font-bold text-accent-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {day}
              {hasEvents && !isToday && (
                <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-accent" />
              )}
              {hasEvents && isToday && (
                <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-accent-foreground" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {selectedDay}. {MONTHS[month]}
        </p>

        <div className="space-y-2">
          {selectedEvents.slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center gap-2">
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: getEventColor(event) }}
              />
              <span className="text-xs tabular text-muted-foreground">
                {formatTime(event.start, event.allDay)}
              </span>
              <span className="truncate text-sm">{event.title}</span>
            </div>
          ))}

          {selectedEvents.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Keine Termine an diesem Tag
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
