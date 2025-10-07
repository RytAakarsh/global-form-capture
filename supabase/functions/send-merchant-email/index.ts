import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MerchantFormData {
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  federalTaxId: string;
  corporationDate: string;
  businessType: string;
  country: string;
  stateProvince: string;
  city: string;
  zipPostalCode: string;
  businessDescription: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: MerchantFormData = await req.json();

    console.log("Received merchant form submission:", formData);

    const emailResponse = await resend.emails.send({
      from: "Merchant Form <onboarding@resend.dev>",
      to: ["iaakarshmishra@gmail.com"],
      subject: `New Merchant Form Submission - ${formData.businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #9b59b6 0%, #3498db 50%, #00bcd4 100%);">
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            <h1 style="color: #3498db; margin-bottom: 20px; border-bottom: 3px solid #3498db; padding-bottom: 10px;">New Merchant Form Submission</h1>
            
            <h2 style="color: #9b59b6; margin-top: 30px;">Business Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Business Name:</td>
                <td style="padding: 10px;">${formData.businessName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Business Email:</td>
                <td style="padding: 10px;">${formData.businessEmail}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Business Type:</td>
                <td style="padding: 10px;">${formData.businessType}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Federal Tax ID:</td>
                <td style="padding: 10px;">${formData.federalTaxId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Corporation Date:</td>
                <td style="padding: 10px;">${formData.corporationDate}</td>
              </tr>
            </table>

            <h2 style="color: #9b59b6; margin-top: 30px;">Address Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Street Address:</td>
                <td style="padding: 10px;">${formData.businessAddress}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">City:</td>
                <td style="padding: 10px;">${formData.city}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">State/Province:</td>
                <td style="padding: 10px;">${formData.stateProvince}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Zip/Postal Code:</td>
                <td style="padding: 10px;">${formData.zipPostalCode}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Country:</td>
                <td style="padding: 10px;">${formData.country}</td>
              </tr>
            </table>

            <h2 style="color: #9b59b6; margin-top: 30px;">Business Description</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db;">
              ${formData.businessDescription}
            </div>

            <p style="color: #888; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; text-align: center;">
              This submission was received from the Merchant Form
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-merchant-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
