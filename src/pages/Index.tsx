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
      
      <div className="w-full max-w-[90rem] mx-auto mb-3 sm:mb-4 lg:mb-6 flex justify-end gap-2 sm:gap-3 lg:gap-4 relative z-10">
        <ThemeToggle />
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="backdrop-blur-xl bg-card/50 border-border/50 hover:bg-accent/20 transition-all hover:scale-105 shadow-lg font-semibold text-xs sm:text-sm lg:text-base xl:text-lg h-8 sm:h-10 lg:h-12 xl:h-14 px-3 sm:px-4 lg:px-6 xl:px-8"
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
