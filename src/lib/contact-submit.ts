import { z } from "zod";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { SERVICE_OPTIONS } from "@/content/contact";

/**
 * Client-side contact submission.
 *
 * This was a server action until the site moved to a static export for
 * Cloudflare Pages — an export has no server to act on, so the same logic now
 * runs in the browser via React 19's `useActionState`, which accepts any async
 * function. Validation here is UX, not security: the honeypot filters dumb
 * bots, zod produces the field errors, and the only real boundary is Supabase
 * RLS, exactly as it was when this ran on the server.
 */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, { message: "Please choose a service of interest." }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(4000),
});

type ContactField = keyof z.infer<typeof contactSchema>;

export interface ContactFormState {
  status: "idle" | "success" | "error" | "unavailable";
  errors?: Partial<Record<ContactField, string>>;
  formError?: string;
  /**
   * Echoed back so the form can repopulate itself: React 19 resets uncontrolled
   * fields once a form action resolves, which would otherwise wipe everything
   * the visitor typed whenever validation fails.
   */
  values?: Partial<Record<ContactField, string>>;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots fill every field; humans never see this one.
  if (formData.get("hp_channel")) {
    console.warn("contact form: honeypot triggered, submission dropped");
    return { status: "success" };
  }

  const field = (key: ContactField) => String(formData.get(key) ?? "");
  const raw: Record<ContactField, string> = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    company: field("company"),
    service: field("service"),
    message: field("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: NonNullable<ContactFormState["errors"]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField;
      errors[key] ??= issue.message;
    }
    return { status: "error", errors, values: raw };
  }

  if (!isSupabaseConfigured) {
    return { status: "unavailable", values: raw };
  }

  const { name, email, phone, company, service, message } = parsed.data;

  // Row shape matches the existing admin portal exactly:
  // service → subject; company prepended to the message body.
  const supabase = getSupabase()!;
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone: phone || null,
    subject: service,
    message: company ? `Company: ${company}\n\n${message}` : message,
  });

  if (error) {
    console.error("contact_submissions insert failed:", error.message);
    return {
      status: "error",
      values: raw,
      formError:
        "Something went wrong sending your message. Please try again or reach us on WhatsApp.",
    };
  }

  return { status: "success" };
}
