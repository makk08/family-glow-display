const events = [
  { id: 1, time: "09:00", title: "School Drop-off", location: "Main Street Elementary", color: "hsl(var(--accent))" },
  { id: 2, time: "10:30", title: "Team Standup", location: "Zoom", color: "hsl(200, 80%, 55%)" },
  { id: 3, time: "13:00", title: "Lunch with Mom", location: "Café Roma", color: "hsl(340, 70%, 55%)" },
  { id: 4, time: "15:30", title: "Piano Lesson", location: "Music Academy", color: "hsl(270, 60%, 55%)" },
  { id: 5, time: "18:00", title: "Family Dinner", location: "Home", color: "hsl(var(--accent))" },
];

const CalendarWidget = () => {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent">
        Today's Schedule
      </h2>
      <div className="space-y-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-4 border-l-4 pl-4"
            style={{ borderColor: event.color }}
          >
            <span className="mt-0.5 w-14 shrink-0 font-sans text-base tabular text-muted-foreground">
              {event.time}
            </span>
            <div>
              <p className="text-xl font-medium leading-tight">{event.title}</p>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
