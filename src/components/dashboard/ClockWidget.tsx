import { useState, useEffect } from "react";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  const dayName = time.toLocaleDateString("en-US", { weekday: "long" });
  const date = time.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div className="flex flex-col">
      <h1 className="font-display text-[10rem] leading-[0.85] tracking-tighter tabular">
        {hours}
        <span className="text-muted-foreground">:</span>
        {minutes}
      </h1>
      <div className="mt-4 space-y-1">
        <p className="text-2xl font-medium">{dayName}</p>
        <p className="text-lg text-muted-foreground">{date}</p>
      </div>
    </div>
  );
};

export default ClockWidget;
