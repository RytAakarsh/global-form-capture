import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { MerchantMultiStepForm } from "@/components/MerchantMultiStepForm";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
      style={{
        background: "var(--gradient-primary)",
      }}
    >
      {/* Animated mesh background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "var(--gradient-mesh)",
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      <div className="w-full max-w-5xl mx-auto mb-4 flex justify-end relative z-10">
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="backdrop-blur-xl bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all hover:scale-105 shadow-lg"
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
