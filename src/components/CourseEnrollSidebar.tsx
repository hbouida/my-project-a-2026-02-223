"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useCourseEnrollment } from "@/components/CourseEnrollmentContext";
import { Course } from "@/lib/types";

export default function CourseEnrollSidebar({ course }: { course: Course }) {
  const { user, loaded } = useAuth();
  const { enrollment, ready, enrollNow } = useCourseEnrollment();

  const totalLessons = course.curriculum.reduce((sum, mod) => sum + mod.lessons.length, 0);
  const progress =
    enrollment && totalLessons > 0 ? Math.round((enrollment.completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="sticky top-24 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="text-3xl font-bold text-white">${course.price}</div>
      <p className="text-xs text-slate-500">USD, one-time</p>

      {!loaded || !ready ? (
        <div className="mt-6 h-11 animate-pulse rounded-md bg-slate-800" />
      ) : !user ? (
        <Link
          href={`/account?redirect=/courses/${course.slug}`}
          className="mt-6 block w-full rounded-md bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Sign in to Enroll
        </Link>
      ) : enrollment ? (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Your progress</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <a
            href="#curriculum"
            className="mt-4 block w-full rounded-md bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            {progress > 0 ? "Continue learning" : "Start learning"}
          </a>
          <Link
            href="/dashboard"
            className="mt-2 block w-full rounded-md border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-slate-500"
          >
            View in Dashboard
          </Link>
        </div>
      ) : (
        <button
          onClick={enrollNow}
          className="mt-6 block w-full rounded-md bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Enroll Now
        </button>
      )}

      <dl className="mt-6 space-y-3 border-t border-slate-800 pt-6 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-500">Format</dt>
          <dd className="text-slate-300">{course.format}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Duration</dt>
          <dd className="text-slate-300">{course.durationHours} hours</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">Level</dt>
          <dd className="text-slate-300">{course.level}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-500">CE credits</dt>
          <dd className="text-slate-300">{course.ceCredits}</dd>
        </div>
      </dl>

      <ul className="mt-6 space-y-2 border-t border-slate-800 pt-6 text-sm text-slate-400">
        <li>Certificate of completion</li>
        <li>Lifetime access to course materials</li>
        <li>Downloadable reference sheets</li>
        <li>Access to the Equipment Manager tool</li>
      </ul>
    </div>
  );
}
