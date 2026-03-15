import { useEffect } from "react";
import { Play, Pause, SkipForward, Music2, LogIn, LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSpotifyNowPlaying } from "@/hooks/useSpotifyNowPlaying";
import {
  exchangeCodeForToken,
  loginWithSpotify,
  logoutSpotify,
} from "@/lib/spotify/auth";
import {
  nextSpotifyTrack,
  pauseSpotify,
  playSpotify,
} from "@/lib/spotify/api";

const SpotifyWidget = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useSpotifyNowPlaying();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (!code) return;

    exchangeCodeForToken(code)
      .then(() => {
        url.searchParams.delete("code");
        window.history.replaceState({}, "", url.toString());
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refetch]);

  const handlePlayPause = async () => {
    if (!data) return;

    if (data.isPlaying) {
      await pauseSpotify();
    } else {
      await playSpotify();
    }

    await queryClient.invalidateQueries({ queryKey: ["spotify-now-playing"] });
  };

  const handleNext = async () => {
    await nextSpotifyTrack();
    await queryClient.invalidateQueries({ queryKey: ["spotify-now-playing"] });
  };

  const notAuthenticated =
    error instanceof Error && error.message === "NOT_AUTHENTICATED";

  return (
    <div className="rounded-2xl border border-border bg-card/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Spotify
        </p>

        {!notAuthenticated && (
          <button
            onClick={() => {
              logoutSpotify();
              queryClient.invalidateQueries({ queryKey: ["spotify-now-playing"] });
            }}
            className="text-muted-foreground transition hover:text-foreground"
            aria-label="Spotify trennen"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>

      {notAuthenticated ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <Music2 className="h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Spotify noch nicht verbunden
          </p>
          <button
            onClick={loginWithSpotify}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            <LogIn className="h-4 w-4" />
            Spotify verbinden
          </button>
        </div>
      ) : isLoading ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Spotify wird geladen...
        </div>
      ) : error ? (
        <div className="py-8 text-center text-sm text-destructive">
          {error instanceof Error ? error.message : "Spotify Fehler"}
        </div>
      ) : !data ? (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Aktuell läuft nichts
        </div>
      ) : (
        <div>
          {data.albumImageUrl ? (
            <img
              src={data.albumImageUrl}
              alt={data.albumName}
              className="mb-4 aspect-square w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="mb-4 flex aspect-square w-full items-center justify-center rounded-2xl bg-secondary">
              <Music2 className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <p className="truncate text-base font-semibold">{data.trackName}</p>
          <p className="truncate text-sm text-muted-foreground">{data.artistName}</p>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent"
              style={{
                width: `${data.durationMs ? (data.progressMs / data.durationMs) * 100 : 0}%`,
              }}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={handlePlayPause}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
              aria-label={data.isPlaying ? "Pause" : "Play"}
            >
              {data.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>

            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground"
              aria-label="Nächster Titel"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyWidget;
