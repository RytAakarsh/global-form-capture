import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FloatingOrbs } from "@/components/FloatingOrbs";
import { GlowingCard } from "@/components/GlowingCard";
import { Building2, Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validation = authSchema.safeParse({ email, password });
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Account created successfully. You can now sign in.",
      });
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message || "An error occurred during sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validation = authSchema.safeParse({ email, password });
      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden"
      style={{ background: "var(--gradient-primary)" }}
    >
      {/* Animated floating orbs */}
      <FloatingOrbs />
      
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--vignette)" }}
      />
      
      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      
      {/* Feature badges */}
      <div className="absolute top-8 left-8 z-10 space-y-3 hidden lg:block animate-fade-in">
        <div className="flex items-center gap-3 backdrop-blur-xl bg-card/30 px-4 py-2 rounded-full border border-primary/20">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Bank-Level Security</span>
        </div>
        <div className="flex items-center gap-3 backdrop-blur-xl bg-card/30 px-4 py-2 rounded-full border border-secondary/20">
          <Zap className="h-5 w-5 text-secondary" />
          <span className="text-sm font-medium">Instant Processing</span>
        </div>
        <div className="flex items-center gap-3 backdrop-blur-xl bg-card/30 px-4 py-2 rounded-full border border-accent/20">
          <TrendingUp className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium">99.9% Uptime</span>
        </div>
      </div>
      
      <GlowingCard className="w-full max-w-md">
        <CardHeader className="space-y-6 pb-8">
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl blur-xl opacity-60 animate-pulse" />
              <div className="relative p-5 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-display font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-fade-in">
            Merchant Portal
          </CardTitle>
          <CardDescription className="text-center text-base flex items-center justify-center gap-2 text-muted-foreground">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="font-medium">Welcome to the future of business</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1.5 bg-muted/40 backdrop-blur-sm rounded-xl">
              <TabsTrigger 
                value="signin" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:via-secondary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:font-semibold transition-all data-[state=active]:shadow-lg font-medium"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:via-secondary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:font-semibold transition-all data-[state=active]:shadow-lg font-medium"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-6 mt-8">
                <div className="space-y-3">
                  <Label htmlFor="signin-email" className="text-sm font-semibold">Email Address</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-background/60 backdrop-blur-sm focus:border-primary transition-all text-base border-2 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="signin-password" className="text-sm font-semibold">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-background/60 backdrop-blur-sm focus:border-primary transition-all text-base border-2 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] relative overflow-hidden group" 
                  disabled={isLoading}
                  style={{ boxShadow: "var(--shadow-glow)" }}
                >
                  <span className="relative z-10">{isLoading ? "Signing in..." : "Sign In"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-6 mt-8">
                <div className="space-y-3">
                  <Label htmlFor="signup-email" className="text-sm font-semibold">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-background/60 backdrop-blur-sm focus:border-primary transition-all text-base border-2 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="signup-password" className="text-sm font-semibold">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-background/60 backdrop-blur-sm focus:border-primary transition-all text-base border-2 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] relative overflow-hidden group" 
                  disabled={isLoading}
                  style={{ boxShadow: "var(--shadow-glow)" }}
                >
                  <span className="relative z-10">{isLoading ? "Creating account..." : "Sign Up"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </GlowingCard>
    </div>
  );
};

export default Auth;
