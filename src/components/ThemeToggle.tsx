"use client";

import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  console.log("[v0] ThemeToggle rendered, current theme:", theme);

  const themes = [
    {
      value: "light",
      icon: Sun,
      label: "Light",
      color: "from-yellow-400 to-orange-400",
    },
    {
      value: "dark",
      icon: Moon,
      label: "Dark",
      color: "from-slate-600 to-slate-800",
    },
    {
      value: "system",
      icon: Monitor,
      label: "System",
      color: "from-gray-400 to-gray-600",
    },
  ] as const;

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  const handleThemeChange = (newTheme: typeof theme) => {
    console.log("[v0] Changing theme from", theme, "to", newTheme);
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 bg-card/80 hover:bg-card backdrop-blur-xl rounded-2xl transition-all duration-400 hover:scale-110 active:scale-95 border border-border/50 hover:border-primary/30 shadow-lg hover:shadow-xl"
        title={`Current theme: ${currentTheme.label}`}
      >
        <div
          className={`p-2 rounded-xl bg-gradient-to-br ${currentTheme.color} shadow-lg group-hover:shadow-xl transition-all duration-400 group-hover:scale-110`}
        >
          <currentTheme.icon className="h-4 w-4 text-white transition-transform duration-400 group-hover:rotate-12" />
        </div>
        <span className="hidden sm:inline text-sm font-semibold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          {currentTheme.label}
        </span>
        <Palette className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all duration-400 group-hover:rotate-12" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-3 z-50 min-w-[180px] bg-card/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300 glass-morphism">
            <div className="p-3 space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1">
                Choose Theme
              </div>
              {themes.map(({ value, icon: Icon, label, color }) => (
                <button
                  key={value}
                  onClick={() => handleThemeChange(value)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    theme === value
                      ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30 shadow-lg"
                      : "text-foreground hover:bg-muted/50 hover:shadow-md"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-br ${color} shadow-lg transition-transform duration-300 hover:scale-110`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="flex-1 text-left">{label}</span>
                  {theme === value && (
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <div
                        className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
