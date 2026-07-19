import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";
import { articles } from "@/data/articles";

const stats = [
  { value: "60+", label: "Countries reached" },
  { value: "14", label: "Courses & certification tracks" },
  { value: "20,000+", label: "Learners trained" },
  { value: "4.8/5", label: "Average course rating" },
];

const domains = [
  {
    title: "Pressure Vessels",
    description: "Design, fabrication, and in-service inspection of vertical and horizontal vessels.",
  },
  {
    title: "Boilers",
    description: "Firetube and watertube steam systems — construction, controls, and safe operation.",
  },
  {
    title: "Piping Systems",
    description: "Process piping design, circuit classification, and condition monitoring.",
  },
  {
    title: "Codes & Standards",
    description: "ASME BPVC, PED 2014/68/EU, API 510/570/653, NBIC, and ASME B31.3.",
  },
  {
    title: "Inspection & NDE",
    description: "RT, UT, MT, PT, and risk-based inspection methodology.",
  },
  {
    title: "Mechanical Integrity",
    description: "Program design, KPI tracking, and audit readiness across equipment classes.",
  },
];

const steps = [
  {
    title: "Learn",
    description: "Work through self-paced courses or live cohorts taught around code-referenced curriculum.",
  },
  {
    title: "Certify",
    description: "Prepare for API 510, API 570, API 653, and other industry certification exams.",
  },
  {
    title: "Manage",
    description: "Register your equipment fleet in the Equipment Manager and track inspection status.",
  },
  {
    title: "Stay Compliant",
    description: "Get ahead of due dates with dashboard alerts before an inspection lapses.",
  },
];

// Placeholder testimonials — replace with real learner quotes before launch.
const testimonials = [
  {
    quote:
      "The API 510 prep cohort was the most structured, exam-focused course I found anywhere — the weekly drills made the difference.",
    name: "Inspection Engineer",
    context: "Refining sector, 60,000+ bbl/day facility",
  },
  {
    quote:
      "We use the Equipment Manager to track inspection dates across three sites. It's simple, but it's already caught two due dates we'd have missed.",
    name: "Maintenance Planner",
    context: "Industrial gas plant",
  },
  {
    quote:
      "PED compliance was a black box for our export team until we went through the course module by module.",
    name: "Compliance Manager",
    context: "Pressure equipment manufacturer, EU export",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_-10%,rgba(245,158,11,0.15),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.12),transparent_40%)]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
              Now enrolling learners in 60+ countries
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Master Pressure Equipment.
              <span className="block text-amber-400">Anywhere in the world.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400">
              PEQ Academy is the worldwide training and compliance platform for
              pressure vessels, boilers, piping, and storage tanks — online
              courses, certification prep, and the digital tools to manage your
              equipment fleet&apos;s inspection compliance.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="w-full rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 sm:w-auto"
              >
                Browse Courses
              </Link>
              <Link
                href="/equipment-manager"
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 sm:w-auto"
              >
                Try the Equipment Manager
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-800 bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Domain overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white">One domain. Complete depth.</h2>
          <p className="mt-4 text-slate-400">
            Every course, tool, and resource on PEQ Academy is built around a
            single field: pressure equipment. Nothing generic — every module
            maps back to real codes and real equipment.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <div key={domain.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-semibold text-white">{domain.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{domain.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured courses</h2>
              <p className="mt-2 text-slate-400">
                From fundamentals to certification exam prep.
              </p>
            </div>
            <Link href="/courses" className="text-sm font-semibold text-amber-400 hover:underline">
              View full catalog &rarr;
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Manager feature */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-amber-400">
              Digital tool
            </span>
            <h2 className="mt-2 text-3xl font-bold text-white">
              Manage your equipment fleet, not just your learning.
            </h2>
            <p className="mt-4 text-slate-400">
              The Equipment Manager is a free asset registry built into PEQ
              Academy. Log every pressure vessel, boiler, piping circuit, and
              tank you&apos;re responsible for, assign the applicable code, and
              let the dashboard track inspection due dates automatically.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                "Automatic due-date calculation from last inspection + code interval",
                "Compliant / Due Soon / Overdue status at a glance",
                "Filter and sort by site, type, or status",
                "Export your registry to CSV anytime",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/equipment-manager"
              className="mt-8 inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Open Equipment Manager
            </Link>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-semibold text-white">Equipment Registry</span>
              <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">Preview</span>
            </div>
            <div className="mt-3 space-y-2">
              {[
                { tag: "V-101", type: "Pressure Vessel", status: "Compliant", color: "bg-emerald-500" },
                { tag: "B-04", type: "Fired Boiler", status: "Due Soon", color: "bg-amber-500" },
                { tag: "TK-220", type: "Storage Tank", status: "Overdue", color: "bg-red-500" },
              ].map((row) => (
                <div
                  key={row.tag}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{row.tag}</div>
                    <div className="text-xs text-slate-500">{row.type}</div>
                  </div>
                  <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-white ${row.color}`}>
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white">How PEQ Academy works</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white">Trusted by teams worldwide</h2>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <blockquote className="text-sm text-slate-300">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-white">{t.name}</span>
                <span className="block text-slate-500">{t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* From the blog */}
      <section className="border-t border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold text-white">From the blog</h2>
              <p className="mt-2 text-slate-400">Practical reads on pressure equipment, free to everyone.</p>
            </div>
            <Link href="/resources" className="text-sm font-semibold text-amber-400 hover:underline">
              View all resources &rarr;
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-amber-500/50"
              >
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {article.category}
                </span>
                <h3 className="mt-3 font-semibold text-white">{article.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Start your certification path today.
          </h2>
          <p className="mt-4 text-slate-400">
            Join engineers, inspectors, and asset owners in 60+ countries
            building expertise in pressure equipment.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="w-full rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 sm:w-auto"
            >
              Browse Courses
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500 sm:w-auto"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
