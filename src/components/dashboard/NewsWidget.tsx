import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "New Study Shows Benefits of Family Meal Planning",
    source: "Health Today",
    time: "2h ago",
    category: "Health",
  },
  {
    id: "2",
    title: "Smart Home Tech Trends for 2026",
    source: "TechCrunch",
    time: "3h ago",
    category: "Tech",
  },
  {
    id: "3",
    title: "Weekend Weather: Sunny Skies Expected",
    source: "Weather Central",
    time: "4h ago",
    category: "Weather",
  },
  {
    id: "4",
    title: "Local Schools Announce Spring Break Dates",
    source: "City News",
    time: "5h ago",
    category: "Local",
  },
  {
    id: "5",
    title: "Best Family-Friendly Recipes This Spring",
    source: "Food Network",
    time: "6h ago",
    category: "Food",
  },
];

const categoryColors: Record<string, string> = {
  Health: "bg-[hsl(160,45%,80%)]",
  Tech: "bg-[hsl(260,55%,82%)]",
  Weather: "bg-[hsl(200,70%,82%)]",
  Local: "bg-[hsl(20,90%,85%)]",
  Food: "bg-[hsl(340,60%,82%)]",
};

const NewsWidget = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Newspaper className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Headlines
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
