import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BusinessOwnershipStepProps {
  form: UseFormReturn<any>;
}

export const BusinessOwnershipStep = ({ form }: BusinessOwnershipStepProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
        <h3 className="text-lg font-bold text-foreground">
          Business Ownership Details
        </h3>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerHomeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Input placeholder="Home Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerPassport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport</FormLabel>
                <FormControl>
                  <Input placeholder="Passport" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ownershipPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ownership Percentage</FormLabel>
                <FormControl>
                  <Input placeholder="Ownership Percentage" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerHomeCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home City</FormLabel>
                <FormControl>
                  <Input placeholder="Home City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerPassport2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport (2)</FormLabel>
                <FormControl>
                  <Input placeholder="Passport (2)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ownerBusinessEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Business Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerHomeStateProvince"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home State/Province</FormLabel>
                <FormControl>
                  <Input placeholder="Home State/Province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerDateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
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
                          <span>dd-mm-yyyy</span>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ownerPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerHomeZipPostalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Zip/Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Home Zip/Postal Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerDl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DL</FormLabel>
                <FormControl>
                  <Input placeholder="DL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ownerSkypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skype ID</FormLabel>
                <FormControl>
                  <Input placeholder="Skype ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerHomeCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Country</FormLabel>
                <FormControl>
                  <Input placeholder="Home Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerDlStateCountry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DL State/Country</FormLabel>
                <FormControl>
                  <Input placeholder="DL State/Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hasCoOwner"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Is there a Co-Owner?</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
