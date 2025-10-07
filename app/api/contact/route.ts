import { contactFormSchema } from "@/lib/validations/contact";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with a fallback for build time
const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function POST(request: NextRequest) {
  try {
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "re_placeholder"
    ) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate the form data
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "Abid Al Wassie - Portfolio <onboarding@resend.dev>",
      to: ["abidalwassie@gmail.com"], // Must match your Resend account email
      replyTo: email, // User's email for easy reply
      subject: `New Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              💡 You can reply directly to this email to respond to ${name}
            </p>
          </div>
        </div>
      `,
      text: `
New Portfolio Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}

---
Reply to this email to respond directly to ${name}.
      `,
    });

    if (emailResponse.error) {
      console.error("Resend error:", emailResponse.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        id: emailResponse.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
