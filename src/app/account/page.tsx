import { Suspense } from "react";
import type { Metadata } from "next";
import AccountPanel from "@/components/AccountPanel";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to PEQ Academy to track course progress and manage your certifications.",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold text-white">Sign in</h1>
      <p className="mt-3 text-center text-slate-400">
        Track your course progress and manage your certifications.
      </p>
      <div className="mt-10">
        <Suspense fallback={<div className="text-slate-500">Loading…</div>}>
          <AccountPanel />
        </Suspense>
      </div>
    </div>
  );
}
