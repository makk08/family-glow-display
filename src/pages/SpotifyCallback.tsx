import { useEffect } from "react";

export default function SpotifyCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      localStorage.setItem("spotify_code", code);
    }

    window.location.href = "/";
  }, []);

  return <div>Connecting to Spotify...</div>;
}
