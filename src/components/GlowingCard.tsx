import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowingCard = ({ children, className = "" }: GlowingCardProps) => {
  return (
    <div className="relative group">
      {/* Animated glow effect - responsive */}
      <div 
        className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-40 sm:opacity-50 group-hover:opacity-60 sm:group-hover:opacity-75 transition duration-1000 animate-pulse"
        style={{ animationDuration: '3s' }}
      />
      
      {/* Card content */}
      <Card 
        className={`relative backdrop-blur-2xl shadow-2xl animate-scale-in border-2 ${className}`}
        style={{ 
          background: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
          boxShadow: "var(--shadow-large), var(--shadow-glow)"
        }}
      >
        {children}
      </Card>
    </div>
  );
};
