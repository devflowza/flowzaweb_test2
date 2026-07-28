"use client";

import * as React from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { submitContact, type ContactFormState } from "@/lib/actions/contact";
import { CONTACT_PAGE, SERVICE_OPTIONS } from "@/content/contact";
import { CONTACT } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/layout/social-icons";

const INITIAL: ContactFormState = { status: "idle" };

function Required() {
  return (
    <span aria-hidden="true" className="text-red-600">
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} aria-live="polite" className="mt-1.5 min-h-4 text-[0.8125rem] text-red-700">
      {message}
    </p>
  );
}

function Outcome({ tone, children }: { tone: "success" | "muted"; children: React.ReactNode }) {
  return (
    <div
      role="status"
      className={
        tone === "success"
          ? "flex h-full flex-col items-center justify-center gap-4 rounded-card border border-emerald-200 bg-emerald-50/60 p-10 text-center"
          : "flex h-full flex-col items-center justify-center gap-4 rounded-card border border-line bg-surface-tint p-10 text-center"
      }
    >
      {children}
      <Button asChild variant="whatsapp" size="lg">
        <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon className="size-4.5" />
          Chat on WhatsApp
        </a>
      </Button>
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = React.useActionState(submitContact, INITIAL);
  const serviceRef = React.useRef<HTMLSelectElement>(null);

  /**
   * Preselect from `?service=` after hydration rather than with useSearchParams:
   * reading search params during render forces a client-side bailout, which would
   * strip the whole form out of the prerendered HTML.
   */
  React.useEffect(() => {
    const select = serviceRef.current;
    if (!select || select.value) return;
    const requested = new URLSearchParams(window.location.search).get("service");
    if (!requested) return;
    const match = SERVICE_OPTIONS.find((s) => s.toLowerCase() === requested.toLowerCase());
    if (match) select.value = match;
  }, []);

  if (state.status === "success") {
    return (
      <Outcome tone="success">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-7" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="text-h4 text-ink">{CONTACT_PAGE.successTitle}</h3>
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-gray">
          {CONTACT_PAGE.successBody}
        </p>
      </Outcome>
    );
  }

  if (state.status === "unavailable") {
    return (
      <Outcome tone="muted">
        <p className="max-w-md text-[0.9375rem] leading-relaxed text-gray">
          {CONTACT_PAGE.fallbackBody}
        </p>
      </Outcome>
    );
  }

  const v = state.values;

  return (
    <form action={action} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">
            Full Name <Required />
          </Label>
          <Input
            id="cf-name"
            name="name"
            autoComplete="name"
            required
            defaultValue={v?.name}
            aria-invalid={state.errors?.name ? true : undefined}
            aria-describedby="cf-name-error"
            placeholder="Your name"
          />
          <FieldError id="cf-name-error" message={state.errors?.name} />
        </div>
        <div>
          <Label htmlFor="cf-email">
            Email <Required />
          </Label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v?.email}
            aria-invalid={state.errors?.email ? true : undefined}
            aria-describedby="cf-email-error"
            placeholder="you@company.com"
          />
          <FieldError id="cf-email-error" message={state.errors?.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-phone">Phone (optional)</Label>
          <Input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v?.phone}
            aria-invalid={state.errors?.phone ? true : undefined}
            aria-describedby="cf-phone-error"
            placeholder="+968 ..."
          />
          <FieldError id="cf-phone-error" message={state.errors?.phone} />
        </div>
        <div>
          <Label htmlFor="cf-company">Company Name (optional)</Label>
          <Input
            id="cf-company"
            name="company"
            autoComplete="organization"
            defaultValue={v?.company}
            aria-invalid={state.errors?.company ? true : undefined}
            aria-describedby="cf-company-error"
            placeholder="Your company"
          />
          <FieldError id="cf-company-error" message={state.errors?.company} />
        </div>
      </div>

      <div>
        <Label htmlFor="cf-service">
          Service of Interest <Required />
        </Label>
        <Select
          ref={serviceRef}
          id="cf-service"
          name="service"
          required
          defaultValue={v?.service ?? ""}
          aria-invalid={state.errors?.service ? true : undefined}
          aria-describedby="cf-service-error"
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {SERVICE_OPTIONS.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </Select>
        <FieldError id="cf-service-error" message={state.errors?.service} />
      </div>

      <div>
        <Label htmlFor="cf-message">
          Message <Required />
        </Label>
        <Textarea
          id="cf-message"
          name="message"
          required
          defaultValue={v?.message}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby="cf-message-error"
          placeholder="Tell us about your business and what you're looking for…"
        />
        <FieldError id="cf-message-error" message={state.errors?.message} />
      </div>

      {/* Honeypot — deliberately not named "website"/"url" so browser autofill
          can't populate it and get a real visitor silently dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
        <label htmlFor="cf-hp">Do not fill this field</label>
        <input
          id="cf-hp"
          name="hp_channel"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {state.formError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.formError}
        </p>
      ) : null}

      <div className="flex flex-col gap-4">
        <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
          {pending ? (
            <>
              <LoaderCircle className="size-4.5 animate-spin" strokeWidth={2} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="size-4.5" strokeWidth={1.75} aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>
        <p className="text-[0.8125rem] leading-relaxed text-gray">
          {CONTACT_PAGE.consentLead}{" "}
          <a
            href="/privacy"
            className="font-medium text-accent-deep underline underline-offset-4 hover:text-accent-deep"
          >
            Privacy Policy
          </a>
          {CONTACT_PAGE.consentTail}
        </p>
      </div>
    </form>
  );
}
