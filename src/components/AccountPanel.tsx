"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function AccountPanel() {
  const { user, loaded, signIn, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    signIn({ name: name.trim(), email: email.trim() });
    const redirect = searchParams.get("redirect");
    router.push(redirect || "/dashboard");
  }

  if (!loaded) {
    return <div className="text-slate-500">Loading…</div>;
  }

  if (user) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <h2 className="text-lg font-semibold text-white">You&apos;re signed in as {user.name}</h2>
        <p className="mt-1 text-sm text-slate-400">{user.email}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={signOut}
            className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-slate-500"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm">
          <span className="text-slate-400">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-400">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Continue
        </button>
        <p className="text-xs text-slate-500">
          This is a local demo account system — it stores your name and email
          in this browser only, with no password and no server. It exists to
          demonstrate course progress tracking and the certification
          tracker. A production deployment should use a real authentication
          provider.
        </p>
      </form>
    </div>
  );
}
