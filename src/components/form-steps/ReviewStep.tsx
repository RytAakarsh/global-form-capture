import { format } from "date-fns";

interface ReviewStepProps {
  data: any;
}

export const ReviewStep = ({ data }: ReviewStepProps) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex items-center gap-3 lg:gap-4 mb-6">
        <div className="h-1.5 lg:h-2 w-14 lg:w-18 bg-gradient-to-r from-primary to-secondary rounded-full" />
        <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-foreground">
          Review Your Submission
        </h3>
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
          <h4 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
            <div className="h-2.5 w-2.5 lg:h-3 lg:w-3 bg-primary rounded-full" />
            Business & Address Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 text-sm sm:text-base lg:text-lg">
          <div>
            <span className="text-muted-foreground">Business Name:</span>
            <p className="font-medium">{data.businessName || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Business Email:</span>
            <p className="font-medium">{data.businessEmail || "-"}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Business Address:</span>
            <p className="font-medium">{data.businessAddress || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Federal Tax ID:</span>
            <p className="font-medium">{data.federalTaxId || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Corporation Date:</span>
            <p className="font-medium">
              {data.corporationDate ? format(data.corporationDate, "PPP") : "-"}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Business Type:</span>
            <p className="font-medium">{data.businessType || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Country:</span>
            <p className="font-medium">{data.country || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">State/Province:</span>
            <p className="font-medium">{data.stateProvince || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">City:</span>
            <p className="font-medium">{data.city || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Zip/Postal Code:</span>
            <p className="font-medium">{data.zipPostalCode || "-"}</p>
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Business Description:</span>
            <p className="font-medium">{data.businessDescription || "-"}</p>
          </div>
        </div>
        </div>
      </div>

      <div className="space-y-10 lg:space-y-14 xl:space-y-18">
        <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 lg:p-12 xl:p-16 border border-white/10">
          <h4 className="text-xl lg:text-3xl xl:text-4xl font-semibold text-foreground mb-6 lg:mb-10 flex items-center gap-3 lg:gap-4">
            <div className="h-3 w-3 lg:h-4 lg:w-4 bg-secondary rounded-full" />
            Business Ownership
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 lg:gap-10 xl:gap-14 text-base sm:text-lg lg:text-xl xl:text-2xl">
          <div>
            <span className="text-muted-foreground">Name:</span>
            <p className="font-medium">{data.ownerName || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Home Address:</span>
            <p className="font-medium">{data.ownerHomeAddress || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Passport:</span>
            <p className="font-medium">{data.ownerPassport || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Ownership %:</span>
            <p className="font-medium">{data.ownershipPercentage || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Home City:</span>
            <p className="font-medium">{data.ownerHomeCity || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Date of Birth:</span>
            <p className="font-medium">
              {data.ownerDateOfBirth ? format(data.ownerDateOfBirth, "PPP") : "-"}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span>
            <p className="font-medium">{data.ownerPhoneNumber || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">DL:</span>
            <p className="font-medium">{data.ownerDl || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Skype ID:</span>
            <p className="font-medium">{data.ownerSkypeId || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Has Co-Owner:</span>
            <p className="font-medium">{data.hasCoOwner ? "Yes" : "No"}</p>
          </div>
        </div>
        </div>
      </div>

      <div className="space-y-10 lg:space-y-14 xl:space-y-18">
        <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 lg:p-12 xl:p-16 border border-white/10">
          <h4 className="text-xl lg:text-3xl xl:text-4xl font-semibold text-foreground mb-6 lg:mb-10 flex items-center gap-3 lg:gap-4">
            <div className="h-3 w-3 lg:h-4 lg:w-4 bg-accent rounded-full" />
            Bank Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7 lg:gap-10 xl:gap-14 text-base sm:text-lg lg:text-xl xl:text-2xl">
          <div>
            <span className="text-muted-foreground">Bank Name:</span>
            <p className="font-medium">{data.bankName || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Settlement Transit ABA:</span>
            <p className="font-medium">{data.settlementTransitAba || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Swift:</span>
            <p className="font-medium">{data.bankSwift || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Deposit Account:</span>
            <p className="font-medium">{data.depositAccount || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Account Type:</span>
            <p className="font-medium">{data.accountType || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Customer Service No:</span>
            <p className="font-medium">{data.customerServiceNo || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Web Address:</span>
            <p className="font-medium">{data.webAddress || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Contact Email:</span>
            <p className="font-medium">{data.bankContactEmail || "-"}</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
