import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/inventar", label: "Inventar", icon: Package },
];

const TabNavigation = () => {
  return (
    <nav className="flex items-center gap-1 rounded-2xl bg-card/60 border border-border p-1.5 backdrop-blur-sm">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all",
              isActive
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )
          }
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default TabNavigation;
