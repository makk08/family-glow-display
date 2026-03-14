import { motion } from "framer-motion";
import { Music, Play, SkipForward, SkipBack } from "lucide-react";

const SpotifyWidget = () => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20">
          <Music className="h-7 w-7 text-accent" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-lg font-medium">Dinner Jazz</p>
          <p className="truncate text-sm text-muted-foreground">Miles Davis</p>
        </div>
      </div>

      <div className="h-1.5 rounded-full bg-secondary">
        <div className="h-full w-1/3 rounded-full bg-accent" />
      </div>

      <div className="flex items-center justify-center gap-6">
        <motion.button whileTap={{ scale: 0.85 }} className="touch-target flex items-center justify-center text-muted-foreground">
          <SkipBack className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="touch-target flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground"
        >
          <Play className="ml-0.5 h-7 w-7" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.85 }} className="touch-target flex items-center justify-center text-muted-foreground">
          <SkipForward className="h-6 w-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SpotifyWidget;
