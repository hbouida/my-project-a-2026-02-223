import Link from "next/link";
import { Course } from "@/lib/types";

const levelColor: Record<Course["level"], string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  Intermediate: "bg-sky-500/10 text-sky-400 ring-sky-500/30",
  Advanced: "bg-fuchsia-500/10 text-fuchsia-400 ring-fuchsia-500/30",
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-amber-500/50 hover:bg-slate-900"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
          {course.category}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${levelColor[course.level]}`}>
          {course.level}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-white group-hover:text-amber-400">
        {course.title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-400">{course.summary}</p>

      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <span>{course.durationHours}h</span>
        <span aria-hidden>&middot;</span>
        <span>{course.format}</span>
        <span aria-hidden>&middot;</span>
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
          </svg>
          {course.rating}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-lg font-bold text-white">${course.price}</span>
        <span className="text-sm font-medium text-amber-400 group-hover:underline">
          View course &rarr;
        </span>
      </div>
    </Link>
  );
}
