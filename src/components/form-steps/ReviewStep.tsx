import { format } from "date-fns";

interface ReviewStepProps {
  data: any;
}

export const ReviewStep = ({ data }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide border-b pb-2">
          Business & Address Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Business Name:</span>
            <p className="font-medium">{data.businessName || "-"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Business Email:</span>
            <p className="font-medium">{data.businessEmail || "-"}</p>
          </div>
          <div className="md:col-span-2">
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
          <div className="md:col-span-2">
            <span className="text-muted-foreground">Business Description:</span>
            <p className="font-medium">{data.businessDescription || "-"}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide border-b pb-2">
          Business Ownership
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide border-b pb-2">
          Bank Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
  );
};
