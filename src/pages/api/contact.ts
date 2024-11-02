import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_APIKEY);
const contactEmail = import.meta.env.CONTACT_EMAIL;

async function verifyHCaptcha(token: string) {
  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: import.meta.env.HCAPTCHA_SECRET,
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
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        { status: 400 },
      );
    }

    const isHCaptchaValid = await verifyHCaptcha(hcaptchaResponse);
    if (!isHCaptchaValid) {
      console.log("Invalid captcha");
      return new Response(JSON.stringify({ error: "Captcha no válido" }), {
        status: 400,
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Web Coworking <info@coworkingalmonaster.site>",
      to: [
        "gonzalezdecastro.guillermo@gmail.com",
        // "juanjovazquezlimon@gmail.com",
      ],
      subject: `Formulario Coworking Almonaster de ${name}`,
      html: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    if (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ error: "Algo ha fallado, no se ha enviado el email" }),
        {
          status: 500,
        },
      );
    }

    return new Response(
      JSON.stringify({ message: "Se ha enviado el email correctamente" }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fallo del servidor" }), {
      status: 500,
    });
  }
};
