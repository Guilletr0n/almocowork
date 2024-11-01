import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const contactEmail = import.meta.env.CONTACT_EMAIL;

async function verifyHCaptcha(token: string) {
  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: import.meta.env.HCAPTCHA_SECRET_KEY,
      response: token,
    }),
  });

  const data = await response.json();
  return data.success;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const hcaptchaResponse = formData.get("h-captcha-response") as string;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 },
      );
    }

    const isHCaptchaValid = await verifyHCaptcha(hcaptchaResponse);
    if (!isHCaptchaValid) {
      return new Response(JSON.stringify({ error: "Invalid captcha" }), {
        status: 400,
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
