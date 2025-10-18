import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
}

export const GlowingCard = ({ children, className = "" }: GlowingCardProps) => {
  return (
    <div className="relative group">
      {/* Animated glow effect */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000 animate-pulse"
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
