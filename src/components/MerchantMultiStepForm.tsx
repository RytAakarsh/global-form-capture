import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { MerchantForm } from "./MerchantForm";
import { BusinessOwnershipStep } from "./form-steps/BusinessOwnershipStep";
import { BankInformationStep } from "./form-steps/BankInformationStep";
import { ReviewStep } from "./form-steps/ReviewStep";

const formSchema = z.object({
  businessName: z.string().min(2),
  businessEmail: z.string().email(),
  businessAddress: z.string().min(5),
  federalTaxId: z.string().min(5),
  corporationDate: z.date(),
  businessType: z.string().min(1),
  country: z.string().min(1),
  stateProvince: z.string().min(1),
  city: z.string().min(2),
  zipPostalCode: z.string().min(3),
  businessDescription: z.string().min(10),
  ownerName: z.string().optional(),
  ownerHomeAddress: z.string().optional(),
  ownerPassport: z.string().optional(),
  ownershipPercentage: z.string().optional(),
  ownerHomeCity: z.string().optional(),
  ownerPassport2: z.string().optional(),
  ownerBusinessEmail: z.string().optional(),
  ownerHomeStateProvince: z.string().optional(),
  ownerDateOfBirth: z.date().optional(),
  ownerPhoneNumber: z.string().optional(),
  ownerHomeZipPostalCode: z.string().optional(),
  ownerDl: z.string().optional(),
  ownerSkypeId: z.string().optional(),
  ownerHomeCountry: z.string().optional(),
  ownerDlStateCountry: z.string().optional(),
  hasCoOwner: z.boolean().optional(),
  bankName: z.string().optional(),
  settlementTransitAba: z.string().optional(),
  bankSwift: z.string().optional(),
  depositAccount: z.string().optional(),
  confirmDepositAccount: z.string().optional(),
  accountType: z.string().optional(),
  customerServiceNo: z.string().optional(),
  webAddress: z.string().optional(),
  bankContactEmail: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const MerchantMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error: dbError } = await supabase
        .from("merchant_submissions")
        .insert({
          business_name: data.businessName,
          business_email: data.businessEmail,
          business_address: data.businessAddress,
          federal_tax_id: data.federalTaxId,
          corporation_date: format(data.corporationDate, "yyyy-MM-dd"),
          business_type: data.businessType,
          country: data.country,
          state_province: data.stateProvince,
          city: data.city,
          zip_postal_code: data.zipPostalCode,
          business_description: data.businessDescription,
          owner_name: data.ownerName,
          owner_home_address: data.ownerHomeAddress,
          owner_passport: data.ownerPassport,
          ownership_percentage: data.ownershipPercentage,
          owner_home_city: data.ownerHomeCity,
          owner_passport_2: data.ownerPassport2,
          owner_date_of_birth: data.ownerDateOfBirth ? format(data.ownerDateOfBirth, "yyyy-MM-dd") : null,
          owner_phone_number: data.ownerPhoneNumber,
          owner_home_zip_postal_code: data.ownerHomeZipPostalCode,
          owner_dl: data.ownerDl,
          owner_skype_id: data.ownerSkypeId,
          owner_home_country: data.ownerHomeCountry,
          owner_dl_state_country: data.ownerDlStateCountry,
          has_co_owner: data.hasCoOwner || false,
          bank_name: data.bankName,
          settlement_transit_aba: data.settlementTransitAba,
          bank_swift: data.bankSwift,
          deposit_account: data.depositAccount,
          confirm_deposit_account: data.confirmDepositAccount,
          account_type: data.accountType,
          customer_service_no: data.customerServiceNo,
          web_address: data.webAddress,
          bank_contact_email: data.bankContactEmail,
        });

      if (dbError) throw dbError;

      await supabase.functions.invoke("send-merchant-email", {
        body: { ...data, corporationDate: format(data.corporationDate, "PPP") },
      });

      toast.success("Form submitted successfully!");
      form.reset();
      setCurrentStep(1);
    } catch (error) {
      toast.error("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-lg p-8 shadow-[var(--form-shadow)]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-4">Merchant Form</h2>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && <MerchantForm form={form} />}
          {currentStep === 2 && <BusinessOwnershipStep form={form} />}
          {currentStep === 3 && <BankInformationStep form={form} />}
          {currentStep === 4 && <ReviewStep data={form.getValues()} />}

          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                BACK
              </Button>
            )}
            <Button
              type="submit"
              className="ml-auto bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {currentStep < 4 ? "NEXT" : isSubmitting ? "Submitting..." : "SUBMIT"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
