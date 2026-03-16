import { useEffect } from "react";
import { exchangeCodeForToken } from "@/lib/spotify/auth";

export default function SpotifyCallback() {
  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        window.location.href = "/";
        return;
      }

      try {
        await exchangeCodeForToken(code);
      } catch (error) {
        console.error("Spotify callback failed:", error);
      } finally {
        window.location.href = "/";
      }
    };

    run();
  }, []);

  return <div>Connecting to Spotify...</div>;
}
