import { useState } from "react";

const DAYS_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const MONTHS = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];

type View = "day" | "week" | "month";

// Mock-Daten — später mit Outlook ICS-Kalender ersetzen
const events = [
  { id: 1, time: "09:00", title: "Schule bringen", location: "Primarschule Wiedikon", color: "hsl(var(--accent))", day: 15 },
  { id: 2, time: "10:30", title: "Team Standup", location: "Zoom", color: "hsl(200, 80%, 55%)", day: 15 },
  { id: 3, time: "13:00", title: "Mittagessen mit Mama", location: "Café Roma", color: "hsl(340, 70%, 55%)", day: 15 },
  { id: 4, time: "15:30", title: "Klavierstunde", location: "Musikschule", color: "hsl(270, 60%, 55%)", day: 15 },
  { id: 5, time: "18:00", title: "Familienessen", location: "Zuhause", color: "hsl(var(--accent))", day: 15 },
  { id: 6, time: "08:00", title: "Fitness", location: "FitLife", color: "hsl(200, 80%, 55%)", day: 10 },
  { id: 7, time: "11:00", title: "Zahnarzt", location: "Dr. Müller", color: "hsl(340, 70%, 55%)", day: 11 },
  { id: 8, time: "16:00", title: "Fussballtraining", location: "Sportplatz Sihlhölzli", color: "hsl(270, 60%, 55%)", day: 12 },
  { id: 9, time: "09:30", title: "Einkaufen", location: "Migros", color: "hsl(var(--accent))", day: 16 },
  { id: 10, time: "14:00", title: "Buchclub", location: "Bibliothek", color: "hsl(200, 80%, 55%)", day: 17 },
  { id: 11, time: "10:00", title: "Spielnachmittag", location: "Bei Jakobs", color: "hsl(340, 70%, 55%)", day: 19 },
  { id: 12, time: "17:00", title: "Date Night", location: "Innenstadt", color: "hsl(270, 60%, 55%)", day: 21 },
];

const CalendarWidget = () => {
  const [view, setView] = useState<View>("day");
  const now = new Date();
  const today = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const viewOptions: { label: string; value: View }[] = [
    { label: "Tag", value: "day" },
    { label: "Woche", value: "week" },
    { label: "Monat", value: "month" },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          {view === "day" ? "Heute" : view === "week" ? "Diese Woche" : MONTHS[currentMonth]}
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
        {view === "day" && <DayView today={today} />}
        {view === "week" && <WeekView today={today} />}
        {view === "month" && <MonthView today={today} month={currentMonth} year={currentYear} />}
      </div>
    </div>
  );
};

const DayView = ({ today }: { today: number }) => {
  const dayEvents = events.filter((e) => e.day === today);
  return (
    <div className="space-y-4">
      {dayEvents.map((event) => (
        <div key={event.id} className="flex items-start gap-4 border-l-4 pl-4" style={{ borderColor: event.color }}>
          <span className="mt-0.5 w-14 shrink-0 font-sans text-base tabular text-muted-foreground">{event.time}</span>
          <div>
            <p className="text-lg font-medium leading-tight">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.location}</p>
          </div>
        </div>
      ))}
      {dayEvents.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">Keine Termine heute</p>
      )}
    </div>
  );
};

const WeekView = ({ today }: { today: number }) => {
  const weekStart = today - ((new Date().getDay() + 6) % 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => weekStart + i);

  return (
    <div className="space-y-1">
      {weekDays.map((day, i) => {
        const dayEvents = events.filter((e) => e.day === day);
        const isToday = day === today;
        return (
          <div key={day} className={`rounded-lg p-3 transition-colors ${isToday ? "bg-secondary" : ""}`}>
            <div className="mb-1 flex items-center gap-2">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${isToday ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
                {day}
              </span>
              <span className={`text-xs uppercase tracking-wide ${isToday ? "text-accent" : "text-muted-foreground"}`}>
                {DAYS_SHORT[i]}
              </span>
            </div>
            {dayEvents.length > 0 ? (
              <div className="ml-9 space-y-1">
                {dayEvents.map((e) => (
                  <div key={e.id} className="flex items-center gap-2">
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
                    <span className="text-xs tabular text-muted-foreground">{e.time}</span>
                    <span className="truncate text-sm">{e.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ml-9"><span className="text-xs text-muted-foreground/50">—</span></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const MonthView = ({ today, month, year }: { today: number; month: number; year: number }) => {
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: startOffset + daysInMonth }, (_, i) =>
    i < startOffset ? null : i - startOffset + 1
  );
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS_SHORT.map((d) => (
          <div key={d} className="text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;
          const hasEvents = events.some((e) => e.day === day);
          const isToday = day === today;
          return (
            <div key={i} className={`relative flex flex-col items-center rounded-md py-1.5 text-sm transition-colors ${isToday ? "bg-accent font-bold text-accent-foreground" : "text-foreground hover:bg-secondary"}`}>
              {day}
              {hasEvents && !isToday && <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-accent" />}
              {hasEvents && isToday && <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-accent-foreground" />}
            </div>
          );
        })}
      </div>
      <div className="mt-4 border-t border-border pt-3">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Heute — {today}. {MONTHS[month]}
        </p>
        <div className="space-y-2">
          {events.filter((e) => e.day === today).slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center gap-2">
              <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="text-xs tabular text-muted-foreground">{e.time}</span>
              <span className="truncate text-sm">{e.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
