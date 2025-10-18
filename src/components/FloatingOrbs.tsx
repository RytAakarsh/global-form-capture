export const FloatingOrbs = () => {
  return (
    <>
      {/* Large animated orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '2s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '5.5s', animationDelay: '1.5s' }} />
      
      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{ background: "var(--gradient-mesh)" }} 
      />
    </>
  );
};
