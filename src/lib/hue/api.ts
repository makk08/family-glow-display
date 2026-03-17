import type { HueRoom } from "@/types/hue";

function getHueBaseUrl() {
  return "/api/hue";
}

export async function fetchHueRooms(): Promise<HueRoom[]> {
  const response = await fetch(`${getHueBaseUrl()}/groups`);

  if (!response.ok) {
    throw new Error(`Hue Räume konnten nicht geladen werden: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data) && data[0]?.error) {
    throw new Error(data[0].error.description || "Hue Fehler");
  }

  return Object.entries(data)
    .map(([id, group]) => {
      const entry = group as {
        name: string;
        type: string;
        action?: { on?: boolean };
        state?: { any_on?: boolean; all_on?: boolean };
      };

      const isOn = entry.state?.any_on ?? entry.action?.on ?? false;

      return {
        id,
        name: entry.name,
        type: entry.type,
        isOn,
      };
    })
    .filter((group) => group.type === "Room")
    .sort((a, b) => a.name.localeCompare(b.name, "de-CH"));
}

export async function toggleHueRoom(id: string, nextState: boolean) {
  const response = await fetch(`${getHueBaseUrl()}/groups/${id}/action`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ on: nextState }),
  });

  if (!response.ok) {
    throw new Error(`Hue Raum konnte nicht geändert werden: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data) && data[0]?.error) {
    throw new Error(data[0].error.description || "Hue Fehler");
  }

  return data;
}
