export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

/** Homepage testimonial set (distinct customers from the per-platform testimonials). */
export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "FlowZa Finance cut our month-end close from 5 days to just 6 hours. The AI catches errors we used to miss entirely. It's not just software — it's a financial partner.",
    name: "Khalid Al-Rashid",
    role: "CFO",
    company: "AlNoor Retail Group",
    initials: "KA",
  },
  {
    quote:
      "FlowZa Spa Master transformed how we run our five locations. Online bookings went up 230% in the first month. Staff actually enjoy using it — that alone is priceless.",
    name: "Lena Voss",
    role: "Operations Director",
    company: "Serenity Wellness",
    initials: "LV",
  },
  {
    quote:
      "FlowZa Fleetza gave us visibility we didn't know we were missing. Fuel costs dropped 22% within 90 days just from the route and behavior insights. The ROI was immediate.",
    name: "Omar Hassan",
    role: "Fleet Manager",
    company: "Swift Logistics MENA",
    initials: "OH",
  },
];
