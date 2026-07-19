import { Suspense } from "react";
import type { Metadata } from "next";
import CourseCatalog from "@/components/CourseCatalog";

export const metadata: Metadata = {
  title: "Course Catalog",
  description:
    "Browse online courses on pressure vessels, boilers, piping, codes and standards, inspection, and certification exam prep.",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Course Catalog</h1>
        <p className="mt-4 text-slate-400">
          Self-paced courses and live cohorts covering the full lifecycle of
          pressure equipment — from fundamentals through certification exam
          prep.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={<div className="text-slate-500">Loading courses…</div>}>
          <CourseCatalog />
        </Suspense>
      </div>
    </div>
  );
}
