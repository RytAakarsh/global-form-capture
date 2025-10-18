import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { MerchantMultiStepForm } from "@/components/MerchantMultiStepForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingOrbs } from "@/components/FloatingOrbs";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen w-full flex items-center justify-center"
        style={{
          background: "var(--gradient-primary)",
        }}
      >
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div 
      className="min-h-screen w-full flex flex-col p-4 md:p-8 relative overflow-hidden"
      style={{ background: "var(--gradient-primary)" }}
    >
      {/* Animated floating orbs */}
      <FloatingOrbs />
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--vignette)" }}
      />
      
      <div className="w-full max-w-5xl mx-auto mb-4 flex justify-end gap-3 relative z-10">
        <ThemeToggle />
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="backdrop-blur-xl bg-card/50 border-border/50 hover:bg-accent/20 transition-all hover:scale-105 shadow-lg font-semibold"
        >
          Sign Out
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center relative z-10">
        <MerchantMultiStepForm />
      </div>
    </div>
  );
};

export default Index;
