"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CourseCard from "@/components/CourseCard";
import { categories, courses, levels } from "@/data/courses";
import { Course } from "@/lib/types";

export default function CourseCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as Course["category"] | null) ?? "All";

  const [category, setCategory] = useState<Course["category"] | "All">(
    categories.includes(initialCategory as Course["category"]) ? (initialCategory as Course["category"]) : "All"
  );
  const [level, setLevel] = useState<Course["level"] | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      if (category !== "All" && course.category !== category) return false;
      if (level !== "All" && course.level !== level) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!course.title.toLowerCase().includes(q) && !course.summary.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [category, level, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-md border border-slate-700 bg-slate-900 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Course["level"] | "All")}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="All">All levels</option>
            {levels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory("All")}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            category === "All"
              ? "bg-amber-500 text-slate-950"
              : "bg-slate-900 text-slate-300 ring-1 ring-inset ring-slate-700 hover:bg-slate-800"
          }`}
        >
          All categories
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              category === c
                ? "bg-amber-500 text-slate-950"
                : "bg-slate-900 text-slate-300 ring-1 ring-inset ring-slate-700 hover:bg-slate-800"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {filtered.length} course{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-slate-500">
          No courses match your filters. Try clearing the search or category.
        </div>
      )}
    </div>
  );
}
