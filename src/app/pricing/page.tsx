import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans for individual learners, teams, and enterprises using PEQ Academy courses and the Equipment Manager.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Explore the platform and try the Equipment Manager.",
    features: [
      "1 free introductory course",
      "Equipment Manager — up to 5 assets",
      "Browse the full course catalog",
      "Community discussion access",
    ],
    cta: "Get started",
    href: "/courses",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$49",
    period: "/month",
    description: "Full access for individual engineers and inspectors.",
    features: [
      "Full course library, including certification prep",
      "Certificates of completion & CE credit tracking",
      "Equipment Manager — unlimited assets",
      "CSV export & inspection due-date alerts",
      "Live Q&A sessions on eligible courses",
    ],
    cta: "Start Professional",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Team & Enterprise",
    price: "Custom",
    period: "",
    description: "For maintenance, inspection, and integrity teams managing shared assets.",
    features: [
      "Everything in Professional, per seat",
      "Cloud-synced Equipment Manager, multi-user & multi-site",
      "Role-based access and audit trail",
      "SSO and API access",
      "Dedicated onboarding and account manager",
    ],
    cta: "Talk to sales",
    href: "/contact",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Is PEQ Academy affiliated with ASME, API, or the European Commission?",
    a: "No. PEQ Academy is an independent training provider. Our courses reference public codes and standards for educational purposes, but we are not affiliated with or endorsed by the organizations that publish them.",
  },
  {
    q: "Do courses guarantee I'll pass a certification exam?",
    a: "Certification prep courses are designed to build the knowledge and calculation fluency tested on exams like API 510, API 570, and API 653, but passing depends on the certifying body's own exam and eligibility requirements.",
  },
  {
    q: "Where is my Equipment Manager data stored?",
    a: "On the Starter and Professional plans, equipment data is stored locally in your browser. Team and Enterprise plans add optional cloud sync so multiple users can share one registry.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Professional is billed monthly with no long-term contract. Team and Enterprise agreements are set during onboarding.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Pricing</h1>
        <p className="mt-4 text-slate-400">
          Straightforward plans for individuals, teams, and enterprises
          working with pressure equipment.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-xl border p-8 ${
              plan.highlighted
                ? "border-amber-500 bg-slate-900 ring-1 ring-amber-500"
                : "border-slate-800 bg-slate-900/60"
            }`}
          >
            {plan.highlighted && (
              <span className="mb-4 inline-block w-fit rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-slate-950">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-white">{plan.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              {plan.period && <span className="text-sm text-slate-500">{plan.period}</span>}
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-8 block rounded-md px-4 py-3 text-center text-sm font-semibold transition ${
                plan.highlighted
                  ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                  : "border border-slate-700 text-white hover:border-slate-500"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-3xl">
        <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-slate-800 pb-6">
              <h3 className="font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-slate-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
