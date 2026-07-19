"use client";

import { useState } from "react";
import { courses } from "@/data/courses";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <h2 className="text-lg font-semibold text-white">Thanks, {name || "there"}.</h2>
        <p className="mt-2 text-sm text-slate-300">
          We received your message and will follow up at {email || "the address you provided"} shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <label className="block text-sm sm:col-span-1">
        <span className="text-slate-400">Full name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm sm:col-span-1">
        <span className="text-slate-400">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm sm:col-span-1">
        <span className="text-slate-400">Country</span>
        <input
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm sm:col-span-1">
        <span className="text-slate-400">Course of interest</span>
        <select className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none">
          <option value="">Not sure yet</option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm sm:col-span-2">
        <span className="text-slate-400">Message</span>
        <textarea
          rows={4}
          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
        />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Send message
        </button>
        <p className="mt-3 text-xs text-slate-500">
          This form is a working demo — connect it to an email service or CRM
          to start receiving real enrollment inquiries.
        </p>
      </div>
    </form>
  );
}
