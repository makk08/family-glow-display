const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const REDIRECT_URI =
  window.location.port === "5173"
    ? "http://127.0.0.1:5173/callback"
    : "http://127.0.0.1:4173/callback";

const SCOPES = [
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state",
];

function randomString(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64UrlEncode(buffer: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function loginWithSpotify() {
  if (!CLIENT_ID) {
    throw new Error("VITE_SPOTIFY_CLIENT_ID fehlt in .env");
  }

  const codeVerifier = randomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64UrlEncode(hashed);

  localStorage.setItem("spotify_code_verifier", codeVerifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    scope: SCOPES.join(" "),
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  if (!CLIENT_ID) {
    throw new Error("VITE_SPOTIFY_CLIENT_ID fehlt in .env");
  }

  const codeVerifier = localStorage.getItem("spotify_code_verifier");
  if (!codeVerifier) {
    throw new Error("PKCE Code Verifier fehlt");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Spotify Token-Austausch fehlgeschlagen: ${response.status}`);
  }

  const data = await response.json();
  const expiresAt = Date.now() + data.expires_in * 1000;

  localStorage.setItem("spotify_access_token", data.access_token);

  if (data.refresh_token) {
    localStorage.setItem("spotify_refresh_token", data.refresh_token);
  }

  localStorage.setItem("spotify_expires_at", String(expiresAt));
  localStorage.removeItem("spotify_code_verifier");

  return data.access_token as string;
}

export async function refreshSpotifyToken() {
  if (!CLIENT_ID) {
    throw new Error("VITE_SPOTIFY_CLIENT_ID fehlt in .env");
  }

  const refreshToken = localStorage.getItem("spotify_refresh_token");
  if (!refreshToken) {
    throw new Error("Kein Spotify Refresh Token vorhanden");
  }

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    throw new Error(`Spotify Token-Refresh fehlgeschlagen: ${response.status}`);
  }

  const data = await response.json();
  const expiresAt = Date.now() + data.expires_in * 1000;

  localStorage.setItem("spotify_access_token", data.access_token);
  localStorage.setItem("spotify_expires_at", String(expiresAt));

  if (data.refresh_token) {
    localStorage.setItem("spotify_refresh_token", data.refresh_token);
  }

  return data.access_token as string;
}

export async function getValidSpotifyToken() {
  const token = localStorage.getItem("spotify_access_token");
  const expiresAt = Number(localStorage.getItem("spotify_expires_at") || "0");

  if (token && Date.now() < expiresAt - 60_000) {
    return token;
  }

  const refreshToken = localStorage.getItem("spotify_refresh_token");
  if (refreshToken) {
    return refreshSpotifyToken();
  }

  return null;
}

export function logoutSpotify() {
  localStorage.removeItem("spotify_access_token");
  localStorage.removeItem("spotify_refresh_token");
  localStorage.removeItem("spotify_expires_at");
  localStorage.removeItem("spotify_code_verifier");
  localStorage.removeItem("spotify_code");
}
