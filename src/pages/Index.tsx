import { MerchantForm } from "@/components/MerchantForm";

const Index = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      style={{
        background: "var(--gradient-primary)",
      }}
    >
      <MerchantForm />
    </div>
  );
};

export default Index;
