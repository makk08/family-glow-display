import ClockWidget from "@/components/dashboard/ClockWidget";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import CalendarWidget from "@/components/dashboard/CalendarWidget";
import TodoWidget from "@/components/dashboard/TodoWidget";
import SpotifyWidget from "@/components/dashboard/SpotifyWidget";
import SmartHomeWidget from "@/components/dashboard/SmartHomeWidget";

const Index = () => {
  return (
    <div className="grid h-svh grid-cols-12 gap-6 bg-background p-8 text-foreground">
      {/* L1: The Glance — Clock + Weather */}
      <section className="col-span-4 flex flex-col justify-between">
        <ClockWidget />
        <WeatherWidget />
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

      {/* L3: The Controls — Spotify + Smart Home */}
      <section className="col-span-3 flex flex-col gap-6">
        <SpotifyWidget />
        <div className="flex-1">
          <SmartHomeWidget />
        </div>
      </section>
    </div>
  );
};

export default Index;
