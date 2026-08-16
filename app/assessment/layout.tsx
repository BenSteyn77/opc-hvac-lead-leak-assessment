import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your HVAC Lead Leak Assessment",
  description: "Complete your HVAC lead-system assessment and receive a prioritized action plan.",
  robots: { index: false, follow: false },
};

export default function AssessmentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
