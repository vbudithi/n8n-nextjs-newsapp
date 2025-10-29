import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log("API Key:", process.env.RESEND_API_KEY);
    console.log("Audience ID:", process.env.RESEND_AUDIENCE_ID);
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Add email to Resend audience
    const { data, error } = await resend.contacts.create({
      email: email,
      firstName: email.split("@")[0],
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    console.log("Resend response:", JSON.stringify(data, null, 2));
    if (!data?.id || error) {
      console.error("Resend failed:", error || data);
      return NextResponse.json(
        { error: "Resend failed to create contact." },
        { status: 500 }
      );
    }
    // Send welcome email
    try {
      const { error: emailError } = await resend.emails.send({
        from: "NewsPilot <vivek@newspilot.live>",
        to: email,
        subject:
          "Hey from Vivek - Welcome to the NewsPilot - Thanks for joining NewsPilot!!",
        html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
    <h2 style="color: #111827;">Welcome to <span style="color: #2563eb;">NewsPilot</span>! 🚀</h2>
    <p style="font-size: 16px; color: #374151;">
      Hey ${email.split("@")[0].split(/[._-]/)[0]},
      <br /><br />
      Thanks for subscribing to NewsPilot! We're excited to have you on board.
    </p>
    <p style="font-size: 16px; color: #374151;">
      You’ll start receiving curated global news and updates. Stay tuned!
    </p>
 <h3 style="color: #111827;">💬 Quote of the Week</h3>
<div style="font-size: 16px; color: #374151; border-left: 4px solid #2563eb; padding-left: 12px; margin: 12px 0;">
  <em>“The future will be built by those who understand both code and context.”</em><br />
  <span style="color: #6b7280;">— MIT Tech Review</span>
</div>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />
    <p style="font-size: 14px; color: #9ca3af;">
      If you didn’t subscribe or have questions, just reply to this email — we’re here to help.
    </p>
    
    <p style="font-size: 14px; color: #9ca3af;">— The NewsPilot Team</p>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e7eb;" />

  <p style="font-size: 12px; color: #9ca3af; text-align: center;">
    You’re receiving this email because you subscribed to NewsPilot.<br />
    <a href="https://newspilot.live/unsubscribe?email=${email}" style="color: #6b7280; text-decoration: underline;">Unsubscribe</a>
  </p>

  </div>
`,
      });

      if (emailError) {
        console.error("Email send failed:", emailError);
        return NextResponse.json(
          { error: "Contact created, but email failed to send." },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error("Email send exception:", err);
      return NextResponse.json(
        { error: "Contact created, but email failed to send." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully subscribed!", success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend error:", JSON.stringify(error, null, 2));

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
