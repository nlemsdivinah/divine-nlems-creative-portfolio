import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  projectType: z.string().trim().max(100).optional(),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10).max(3000),
  turnstileToken: z.string().min(10),
  // Honeypot: real users never fill this hidden field. Bots often do.
  company: z.string().max(0).optional(),
});

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const json = await req.json();
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please check your form fields and try again." },
        { status: 400 }
      );
    }

    const { name, email, projectType, budget, message, turnstileToken, company } = parsed.data;

    // Honeypot tripped — silently accept without sending, so the bot thinks it worked.
    if (company) {
      return NextResponse.json({ ok: true });
    }

    const humanVerified = await verifyTurnstileToken(turnstileToken, ip);
    if (!humanVerified) {
      return NextResponse.json(
        { ok: false, error: "Spam verification failed. Please retry the form." },
        { status: 400 }
      );
    }

    // Send the email. Swap in your provider of choice (Resend shown here).
    // Requires RESEND_API_KEY and CONTACT_TO_EMAIL in your environment.
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <contact@yourdomain.com>",
          to: process.env.CONTACT_TO_EMAIL,
          reply_to: email,
          subject: `New project inquiry from ${escapeHtml(name)}`,
          html: `
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Project type:</strong> ${escapeHtml(projectType || "—")}</p>
            <p><strong>Budget:</strong> ${escapeHtml(budget || "—")}</p>
            <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
          `,
        }),
      });

      if (!emailRes.ok) {
        console.error("Email provider error", await emailRes.text());
        return NextResponse.json(
          { ok: false, error: "Message could not be sent right now. Please email directly." },
          { status: 502 }
        );
      }
    } else {
      console.warn("RESEND_API_KEY / CONTACT_TO_EMAIL not set — contact message logged only.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error", err);
    return NextResponse.json({ ok: false, error: "Unexpected server error." }, { status: 500 });
  }
}
