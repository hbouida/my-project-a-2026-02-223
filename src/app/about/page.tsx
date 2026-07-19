import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "PEQ Academy's mission is to make pressure equipment expertise accessible to engineers, inspectors, and asset owners worldwide.",
};

const values = [
  {
    title: "Code-accurate, always",
    description: "Every lesson maps back to a real clause in ASME, API, PED, or NBIC — no hand-waving.",
  },
  {
    title: "Built for practitioners",
    description: "Courses are designed for people who will use this knowledge on the job, not just pass a quiz.",
  },
  {
    title: "Accessible worldwide",
    description: "Self-paced formats, multi-timezone live sessions, and pricing that works across markets.",
  },
  {
    title: "Tools, not just theory",
    description: "The Equipment Manager exists because learning should connect directly to the equipment you manage.",
  },
];

const team = [
  {
    role: "Lead Instructor — Pressure Vessels & Codes",
    focus: "ASME Section VIII, PED compliance",
  },
  {
    role: "Lead Instructor — Inspection & Mechanical Integrity",
    focus: "API 510 / 570 / 653, risk-based inspection",
  },
  {
    role: "Lead Instructor — Boilers & Safety Systems",
    focus: "ASME Section I, relief system design",
  },
  {
    role: "Head of Curriculum",
    focus: "Course design and certification exam alignment",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">About PEQ Academy</h1>
        <p className="mt-4 text-lg text-slate-400">
          Pressure equipment failures are rare precisely because the field
          takes training seriously. PEQ Academy exists to make that training —
          and the tools that support it — accessible to engineers, inspectors,
          and asset owners wherever they work.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="font-semibold text-white">{v.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{v.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center">
        <h2 className="text-2xl font-bold text-white">A global community</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Our learners work in refining, chemical processing, power
          generation, manufacturing, and equipment fabrication across more
          than 60 countries — from independent inspectors to enterprise
          integrity teams.
        </p>
      </div>

      <div className="mt-20">
        <h2 className="text-2xl font-bold text-white">Instructor team</h2>
        <p className="mt-2 text-slate-400">
          PEQ Academy instructors are practicing engineers and certified
          inspectors. Full bios are being published as the team grows.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <div key={member.role} className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-slate-800 text-slate-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">{member.role}</div>
                <div className="text-sm text-slate-500">{member.focus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
