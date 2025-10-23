import { UseFormReturn } from "react-hook-form";
import {
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

interface BankInformationStepProps {
  form: UseFormReturn<any>;
}

const accountTypes = ["Checking", "Savings", "Business"];

export const BankInformationStep = ({ form }: BankInformationStepProps) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="h-1.5 lg:h-2 w-14 lg:w-18 bg-gradient-to-r from-primary to-secondary rounded-full" />
        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground">
          Bank Information
        </h3>
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the Bank</FormLabel>
                <FormControl>
                  <Input placeholder="Name of the Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="settlementTransitAba"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Settlement Transit ABA</FormLabel>
                <FormControl>
                  <Input placeholder="Settlement Transit ABA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          <FormField
            control={form.control}
            name="bankSwift"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Swift</FormLabel>
                <FormControl>
                  <Input placeholder="Swift" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depositAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deposit Account</FormLabel>
                <FormControl>
                  <Input placeholder="Deposit Account" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          <FormField
            control={form.control}
            name="confirmDepositAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Deposit Account</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Deposit Account" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover z-50">
                    {accountTypes.map((type) => (
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          <FormField
            control={form.control}
            name="customerServiceNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Service No.</FormLabel>
                <FormControl>
                  <Input placeholder="Customer Service No." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="webAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Web Address</FormLabel>
                <FormControl>
                  <Input placeholder="Web Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bankContactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Contact Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
