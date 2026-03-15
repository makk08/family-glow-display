import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
}

// Mock-Daten — später mit RSS-Feed oder News-API ersetzen (z.B. SRF, 20 Minuten, Blick)
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Neue Tramstrecke in Zürich geplant – Baustart 2027",
    source: "20 Minuten",
    time: "vor 2 Std.",
    category: "Lokal",
  },
  {
    id: "2",
    title: "Bundesrat beschliesst neue Massnahmen für KI-Regulierung",
    source: "SRF News",
    time: "vor 3 Std.",
    category: "Politik",
  },
  {
    id: "3",
    title: "Frühling kommt: Temperaturen steigen nächste Woche",
    source: "MeteoSchweiz",
    time: "vor 4 Std.",
    category: "Wetter",
  },
  {
    id: "4",
    title: "ZSC Lions gewinnen entscheidendes Playoff-Spiel",
    source: "Blick",
    time: "vor 5 Std.",
    category: "Sport",
  },
  {
    id: "5",
    title: "Migros lanciert neues veganes Sortiment in allen Filialen",
    source: "Tages-Anzeiger",
    time: "vor 6 Std.",
    category: "Wirtschaft",
  },
];

const categoryColors: Record<string, string> = {
  Lokal: "bg-[hsl(var(--pastel-peach))]",
  Politik: "bg-[hsl(var(--pastel-lavender))]",
  Wetter: "bg-[hsl(var(--pastel-sky))]",
  Sport: "bg-[hsl(var(--pastel-mint))]",
  Wirtschaft: "bg-[hsl(var(--pastel-rose))]",
};

const NewsWidget = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Schlagzeilen
        </h2>
      </div>
      <div className="flex flex-col gap-2">
        {mockNews.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group flex cursor-pointer gap-3 rounded-xl border border-border bg-card/60 p-3 transition-colors hover:bg-card"
          >
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/80 ${categoryColors[item.category] || "bg-muted"}`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.source} · {item.time}
                </span>
              </div>
            </div>
            <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
