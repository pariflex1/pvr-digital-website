import { z } from "zod";

// Indian mobile regex: optional +91 or 0 prefix, followed by 10 digits starting with 6, 7, 8, or 9
export const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const leadFormSchema = z.object({
  services: z.array(z.string()).min(1, "Please select at least one service."),
  business_type: z.string().min(1, "Please select your business type."),
  budget_band: z.string().min(1, "Please select an estimated budget range."),
  timeline: z.string().min(1, "Please select your target timeline."),
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z
    .string()
    .trim()
    .regex(indianPhoneRegex, "Please enter a valid 10-digit Indian mobile number."),
  email: z.string().trim().email("Please enter a valid email address.").optional().or(z.literal("")),
  message: z.string().trim().max(1000, "Message cannot exceed 1000 characters.").optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy to continue."
  }),
  honeypot: z.string().max(0, "Bot detected").optional()
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
