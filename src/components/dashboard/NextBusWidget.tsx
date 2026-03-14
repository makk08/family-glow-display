import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bus, Clock, MapPin, RefreshCw } from "lucide-react";

interface Departure {
  id: string;
  line: string;
  direction: string;
  minutesUntil: number;
  scheduledTime: string;
  lineColor: string;
}

// Mock data — replace with ZVV/OpenData Transport API
// API endpoint: https://transport.opendata.ch/v1/stationboard?station=YOUR_STOP&limit=6
const getMockDepartures = (): Departure[] => {
  const now = new Date();
  return [
    {
      id: "1",
      line: "31",
      direction: "Hegibachplatz",
      minutesUntil: 2,
      scheduledTime: new Date(now.getTime() + 2 * 60000).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" }),
      lineColor: "bg-[hsl(210,70%,65%)]",
    },
    {
      id: "2",
      line: "7",
      direction: "Wollishofen",
      minutesUntil: 5,
      scheduledTime: new Date(now.getTime() + 5 * 60000).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" }),
      lineColor: "bg-[hsl(0,60%,60%)]",
    },
    {
      id: "3",
      line: "13",
      direction: "Albisgütli",
      minutesUntil: 8,
      scheduledTime: new Date(now.getTime() + 8 * 60000).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" }),
      lineColor: "bg-[hsl(45,80%,55%)]",
    },
    {
      id: "4",
      line: "31",
      direction: "Schlieren",
      minutesUntil: 12,
      scheduledTime: new Date(now.getTime() + 12 * 60000).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" }),
      lineColor: "bg-[hsl(210,70%,65%)]",
    },
  ];
};

const STATION_NAME = "Zürich, Paradeplatz"; // Change to your stop

const NextBusWidget = () => {
  const [departures, setDepartures] = useState<Departure[]>(getMockDepartures());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refresh = () => {
    // TODO: Replace with real API call
    // fetch(`https://transport.opendata.ch/v1/stationboard?station=${encodeURIComponent(STATION_NAME)}&limit=6`)
    //   .then(res => res.json())
    //   .then(data => { parse and setDepartures })
    setDepartures(getMockDepartures());
    setLastUpdated(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refresh, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bus className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Next Bus
          </h2>
        </div>
        <button
          onClick={refresh}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        <span className="font-medium">{STATION_NAME}</span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {departures.map((dep, i) => (
          <motion.div
            key={dep.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-3 py-2"
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white ${dep.lineColor}`}
            >
              {dep.line}
            </span>
            <span className="flex-1 truncate text-sm font-medium text-foreground">
              {dep.direction}
            </span>
            <div className="flex items-center gap-1.5 text-right">
              {dep.minutesUntil <= 1 ? (
                <span className="text-sm font-bold text-primary animate-pulse">now</span>
              ) : (
                <>
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    {dep.minutesUntil}'
                  </span>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground/60">
        Updated {lastUpdated.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
};

export default NextBusWidget;
