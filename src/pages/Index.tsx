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
    <div className="grid h-svh grid-cols-12 gap-6 bg-background p-8 text-foreground">
      {/* L1: The Glance — Clock + Weather + News */}
      <section className="col-span-4 flex flex-col gap-6">
        <ClockWidget />
        <WeatherWidget />
        <div className="flex-1 overflow-auto rounded-2xl border border-border bg-card/40 p-5">
          <NewsWidget />
        </div>
      </section>

      {/* L2: The Agenda — Calendar + Todos */}
      <section className="col-span-5 flex flex-col gap-6">
        <div className="flex-1 rounded-2xl border border-border bg-card/40 p-6">
          <CalendarWidget />
        </div>
        <div className="flex-1 rounded-2xl border border-border bg-card/40 p-6">
          <TodoWidget />
        </div>
      </section>

      {/* L3: The Controls — Spotify + Smart Home + Next Bus */}
      <section className="col-span-3 flex flex-col gap-6">
        <SpotifyWidget />
        <SmartHomeWidget />
        <NextBusWidget />
      </section>
    </div>
  );
};

export default Index;
