import { MerchantMultiStepForm } from "@/components/MerchantMultiStepForm";

const Index = () => {
  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8"
      style={{
        background: "var(--gradient-primary)",
      }}
    >
      <MerchantMultiStepForm />
    </div>
  );
};

export default Index;
