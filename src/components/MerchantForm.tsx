import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessEmail: z.string().email("Invalid email address"),
  businessAddress: z.string().min(5, "Address is required"),
  federalTaxId: z.string().min(5, "Tax ID is required"),
  corporationDate: z.date({
    required_error: "Corporation date is required",
  }),
  businessType: z.string().min(1, "Please select a business type"),
  country: z.string().min(1, "Please select a country"),
  stateProvince: z.string().min(1, "State/Province is required"),
  city: z.string().min(2, "City is required"),
  zipPostalCode: z.string().min(3, "Zip/Postal code is required"),
  businessDescription: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const businessTypes = [
  "LLC",
  "Corporation",
  "Partnership",
  "Sole Proprietorship",
  "Non-Profit",
];

const countries = ["United States", "United Kingdom", "Germany", "France", "Spain", "Italy"];

const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

const ukRegions = [
  "England", "Scotland", "Wales", "Northern Ireland"
];

const europeanProvinces = [
  "Île-de-France", "Provence-Alpes-Côte d'Azur", "Bavaria", "Berlin",
  "Lombardy", "Catalonia", "Madrid", "Andalusia"
];

export const MerchantForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessAddress: "",
      federalTaxId: "",
      stateProvince: "",
      city: "",
      zipPostalCode: "",
      businessDescription: "",
    },
  });

  const getStatesForCountry = (country: string) => {
    if (country === "United States") return usStates;
    if (country === "United Kingdom") return ukRegions;
    return europeanProvinces;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Insert into database
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
        });

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke(
        "send-merchant-email",
        {
          body: {
            businessName: data.businessName,
            businessEmail: data.businessEmail,
            businessAddress: data.businessAddress,
            federalTaxId: data.federalTaxId,
            corporationDate: format(data.corporationDate, "PPP"),
            businessType: data.businessType,
            country: data.country,
            stateProvince: data.stateProvince,
            city: data.city,
            zipPostalCode: data.zipPostalCode,
            businessDescription: data.businessDescription,
          },
        }
      );

      if (emailError) {
        console.error("Email error:", emailError);
        // Don't throw - form was saved successfully
      }

      toast.success("Form submitted successfully!", {
        description: "Your merchant application has been received.",
      });
      
      form.reset();
      setSelectedCountry("");
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-lg p-8 shadow-[var(--form-shadow)]">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Merchant Form</h2>
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Business & Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Business Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Business Contact Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="businessAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Business Address Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="federalTaxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Federal Tax ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Federal Tax ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="corporationDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Company Corporation Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Company Corporation Date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover z-50">
                        {businessTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value);
                        form.setValue("stateProvince", "");
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover z-50">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stateProvince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!selectedCountry}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state/province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover z-50 max-h-[300px]">
                        {selectedCountry &&
                          getStatesForCountry(selectedCountry).map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zipPostalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Zip/Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Business Zip/Postal Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Business Description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Next"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
