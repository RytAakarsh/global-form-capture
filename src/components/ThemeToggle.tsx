import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
    <Button
      variant="outline"
      size="sm"
      className="backdrop-blur-xl bg-card/50 border-border/50 hover:bg-accent/20 transition-all hover:scale-105 shadow-lg h-8 w-8 sm:h-10 sm:w-10"
    >
      <Sun className="h-3 w-3 sm:h-[1.2rem] sm:w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="backdrop-blur-xl bg-card/50 border-border/50 hover:bg-accent/20 transition-all hover:scale-105 shadow-lg relative overflow-hidden group h-8 w-8 sm:h-10 sm:w-10"
    >
      <Sun className="h-3 w-3 sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
      <Moon className="absolute h-3 w-3 sm:h-[1.2rem] sm:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
      <span className="sr-only">Toggle theme</span>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Button>
  );
}
