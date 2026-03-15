import ICAL from "ical.js";
import type { CalendarEvent } from "@/types/calendar";

const ICS_URL = import.meta.env.VITE_ICS_URL;

function toDate(value: unknown): Date | null {
  if (!value) return null;

  if (value instanceof Date) return value;

  if (typeof value === "object" && value !== null && "toJSDate" in value) {
    const maybe = value as { toJSDate?: () => Date };
    if (typeof maybe.toJSDate === "function") {
      return maybe.toJSDate();
    }
  }

  return null;
}

function expandRecurringEvents(
  vevent: ICAL.Component,
  from: Date,
  to: Date
): CalendarEvent[] {
  const event = new ICAL.Event(vevent);
  const results: CalendarEvent[] = [];

  if (!event.isRecurring()) {
    const start = toDate(event.startDate);
    const end = toDate(event.endDate);

    if (!start || !end) return results;
    if (end < from || start > to) return results;

    results.push({
      id: event.uid || `${start.getTime()}-${event.summary ?? "event"}`,
      title: event.summary || "Ohne Titel",
      start,
      end,
      allDay: !!event.startDate?.isDate,
      location: event.location || "",
      description: event.description || "",
    });

    return results;
  }

  const iterator = event.iterator();
  let next: ICAL.Time | null;

  while ((next = iterator.next())) {
    const occurrenceStart = next.toJSDate();
    if (occurrenceStart > to) break;

    if (occurrenceStart >= from && occurrenceStart <= to) {
      const occurrence = event.getOccurrenceDetails(next);
      const start = occurrence.startDate.toJSDate();
      const end = occurrence.endDate.toJSDate();

      results.push({
        id: `${event.uid}-${start.getTime()}`,
        title: event.summary || "Ohne Titel",
        start,
        end,
        allDay: !!occurrence.startDate.isDate,
        location: event.location || "",
        description: event.description || "",
      });
    }
  }

  return results;
}

export async function fetchCalendarEvents(
  rangeStart: Date,
  rangeEnd: Date
): Promise<CalendarEvent[]> {
  if (!ICS_URL) {
    throw new Error("VITE_ICS_URL fehlt in der .env");
  }

  const response = await fetch(ICS_URL);

  if (!response.ok) {
    throw new Error(`ICS Abruf fehlgeschlagen: ${response.status}`);
  }

  const icsText = await response.text();
  const jcalData = ICAL.parse(icsText);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  const events = vevents.flatMap((vevent) =>
    expandRecurringEvents(vevent, rangeStart, rangeEnd)
  );

  return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function getTodayRange() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getWeekRange() {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const start = new Date(now);
  start.setDate(now.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getMonthRange() {
  const now = new Date();

  const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  return { start, end };
}
