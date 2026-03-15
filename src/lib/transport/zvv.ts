import type { Departure } from "@/types/transport";

const STATION = "Zürich, Gutstrasse";

export async function fetchNextBus(): Promise<Departure[]> {
  const response = await fetch(
    `https://transport.opendata.ch/v1/stationboard?station=${encodeURIComponent(STATION)}&limit=20`
  );

  if (!response.ok) {
    throw new Error("Busdaten konnten nicht geladen werden");
  }

  const data = await response.json();

  const buses = data.stationboard
    .filter(
      (entry: any) =>
        entry.number === "67" &&
        entry.to.toLowerCase().includes("wiedikon")
    )
    .slice(0, 3)
    .map((entry: any) => ({
      line: entry.number,
      destination: entry.to,
      departure: entry.stop.departure,
    }));

  return buses;
}

export function minutesUntil(time: string) {
  const now = new Date();
  const dep = new Date(time);

  return Math.round((dep.getTime() - now.getTime()) / 60000);
}
