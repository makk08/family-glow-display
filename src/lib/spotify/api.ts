import {
  getValidSpotifyToken,
  refreshSpotifyToken,
} from "@/lib/spotify/auth";

export type SpotifyNowPlaying = {
  isPlaying: boolean;
  trackName: string;
  artistName: string;
  albumName: string;
  albumImageUrl: string;
  progressMs: number;
  durationMs: number;
};

async function spotifyFetch(path: string, init?: RequestInit, retry = true) {
  let token = await getValidSpotifyToken();

  if (!token) {
    throw new Error("NOT_AUTHENTICATED");
  }

  let response = await fetch(`https://api.spotify.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });

  if (response.status === 401 && retry) {
    token = await refreshSpotifyToken();

    response = await fetch(`https://api.spotify.com/v1${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(init?.headers || {}),
      },
    });
  }

  return response;
}

export async function fetchNowPlaying(): Promise<SpotifyNowPlaying | null> {
  const response = await spotifyFetch("/me/player/currently-playing");

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Spotify Abruf fehlgeschlagen: ${response.status}`);
  }

  const data = await response.json();

  if (!data?.item) {
    return null;
  }

  return {
    isPlaying: !!data.is_playing,
    trackName: data.item.name ?? "",
    artistName:
      data.item.artists?.map((a: { name: string }) => a.name).join(", ") ?? "",
    albumName: data.item.album?.name ?? "",
    albumImageUrl: data.item.album?.images?.[0]?.url ?? "",
    progressMs: data.progress_ms ?? 0,
    durationMs: data.item.duration_ms ?? 0,
  };
}

export async function playSpotify() {
  const response = await spotifyFetch("/me/player/play", { method: "PUT" });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Play fehlgeschlagen: ${response.status}`);
  }
}

export async function pauseSpotify() {
  const response = await spotifyFetch("/me/player/pause", { method: "PUT" });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Pause fehlgeschlagen: ${response.status}`);
  }
}

export async function nextSpotifyTrack() {
  const response = await spotifyFetch("/me/player/next", { method: "POST" });
  if (!response.ok && response.status !== 204) {
    throw new Error(`Next fehlgeschlagen: ${response.status}`);
  }
}
