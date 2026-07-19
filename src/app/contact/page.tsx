import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with PEQ Academy about courses, certification prep, or team plans.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Get in touch</h1>
      <p className="mt-4 text-slate-400">
        Questions about a course, certification prep, or a Team plan for your
        organization? Send us a message and we&apos;ll follow up.
      </p>

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/60 p-8">
        <ContactForm />
      </div>
    </div>
  );
}
