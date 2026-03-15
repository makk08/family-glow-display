import ClockWidget from "@/components/dashboard/ClockWidget";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import NewsWidget from "@/components/dashboard/NewsWidget";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import TodoWidget from "@/components/dashboard/TodoWidget";
import SpotifyWidget from "@/components/dashboard/SpotifyWidget";
import SmartHomeWidget from "@/components/dashboard/SmartHomeWidget";
import NextBusWidget from "@/components/dashboard/NextBusWidget";

const Index = () => {
  return (
    <div className="grid h-full grid-cols-12 gap-6">
      {/* L1: Überblick — Uhr + Wetter + News */}
      <section className="col-span-4 flex flex-col gap-6">
        <ClockWidget />
        <WeatherWidget />
        <div className="flex-1 overflow-auto rounded-2xl border border-border bg-card/40 p-5">
          <NewsWidget />
        </div>
      </section>

      {/* L2: Agenda — Kalender + Aufgaben */}
      <section className="col-span-5 flex flex-col gap-6">
        <div className="flex-1 rounded-2xl border border-border bg-card/40 p-6">
          <CalendarWidget />
        </div>
        <div className="flex-1 rounded-2xl border border-border bg-card/40 p-6">
          <TodoWidget />
        </div>
      </section>

      {/* L3: Steuerung — Spotify + Smart Home + Nächster Bus */}
      <section className="col-span-3 flex flex-col gap-6">
        <SpotifyWidget />
        <SmartHomeWidget />
        <NextBusWidget />
      </section>
    </div>
  );
};

export default Index;
