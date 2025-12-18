import { useState } from "react";
import { LayoutGrid, List, Users, FileText } from "lucide-react";

const tabs = [
  { name: "Kanban Board", icon: LayoutGrid },
  { name: "List View", icon: List },
  { name: "Members", icon: Users },
  { name: "Notes", icon: FileText },
];

export default function Navigation() {
  const [activeTab, setActiveTab] = useState("Kanban Board");

  return (
    <nav className="flex gap-1 px-8 border-t border-border bg-card">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.name;
        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`py-4 px-4 text-sm font-medium transition-all duration-200 flex items-center gap-2 border-b-2 ${
              isActive
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <Icon size={16} />
            {tab.name}
          </button>
        );
      })}
    </nav>
  );
}
