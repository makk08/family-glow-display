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
      {/* L1: Überblick */}
      <section className="col-span-4 flex h-full min-h-0 flex-col gap-6">
        <ClockWidget />
        <WeatherWidget />

        <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-border bg-card/40 p-5">
          <NewsWidget />
        </div>
      </section>

      {/* L2: Agenda */}
      <section className="col-span-5 flex h-full min-h-0 flex-col gap-6">
        <div className="min-h-0 flex-[1.2] rounded-2xl border border-border bg-card/40 p-6">
          <CalendarWidget />
        </div>

        <div className="min-h-0 flex-[0.8] rounded-2xl border border-border bg-card/40 p-5">
          <TodoWidget />
        </div>
      </section>

      {/* L3: Steuerung */}
      <section className="col-span-3 flex h-full min-h-0 flex-col gap-6">
        <SpotifyWidget />
        <SmartHomeWidget />
        <NextBusWidget />
      </section>
    </div>
  );
};

export default Index;
