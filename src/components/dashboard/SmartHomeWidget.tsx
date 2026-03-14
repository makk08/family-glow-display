import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Fan, Lock, Thermometer } from "lucide-react";

interface Toggle {
  id: string;
  label: string;
  icon: typeof Lightbulb;
  active: boolean;
}

const initialToggles: Toggle[] = [
  { id: "kitchen", label: "Kitchen", icon: Lightbulb, active: true },
  { id: "living", label: "Living Room", icon: Lightbulb, active: false },
  { id: "fan", label: "Fan", icon: Fan, active: false },
  { id: "lock", label: "Front Door", icon: Lock, active: true },
];

const SmartHomeWidget = () => {
  const [toggles, setToggles] = useState(initialToggles);

  const toggle = (id: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
        Home
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {toggles.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => toggle(item.id)}
            className={`touch-target flex flex-col items-center justify-center gap-2 rounded-2xl border p-5 transition-colors duration-200 ${
              item.active
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            <item.icon className="h-7 w-7" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SmartHomeWidget;
