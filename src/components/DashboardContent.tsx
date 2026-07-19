"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import CertificationTracker from "@/components/CertificationTracker";
import { EnrollmentRecord, getEnrollments } from "@/lib/enrollments";
import { getCourseBySlug } from "@/data/courses";

export default function DashboardContent() {
  const { user, loaded } = useAuth();
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>([]);
  const [enrollmentsLoaded, setEnrollmentsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      // Syncing from localStorage after the hydration-matching first render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEnrollments(getEnrollments(user.email));
    }
    setEnrollmentsLoaded(true);
  }, [user]);

  if (!loaded || !enrollmentsLoaded) {
    return <div className="h-40 animate-pulse rounded-xl border border-slate-800 bg-slate-900/40" />;
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <h2 className="text-lg font-semibold text-white">Sign in to see your dashboard</h2>
        <p className="mt-2 text-sm text-slate-400">
          Your course progress and certifications are tracked per account.
        </p>
        <Link
          href="/account?redirect=/dashboard"
          className="mt-6 inline-block rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-slate-400">{user.email}</p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-white">My Courses</h2>
        {enrollments.length === 0 ? (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center">
            <p className="text-slate-400">You haven&apos;t enrolled in any courses yet.</p>
            <Link href="/courses" className="mt-4 inline-block text-sm font-semibold text-amber-400 hover:underline">
              Browse the catalog &rarr;
            </Link>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {enrollments.map((enrollment) => {
              const course = getCourseBySlug(enrollment.slug);
              if (!course) return null;
              const totalLessons = course.curriculum.reduce((sum, mod) => sum + mod.lessons.length, 0);
              const progress =
                totalLessons > 0 ? Math.round((enrollment.completedLessons.length / totalLessons) * 100) : 0;
              return (
                <Link
                  key={enrollment.slug}
                  href={`/courses/${enrollment.slug}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-amber-500/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                      {course.category}
                    </span>
                    <span className="text-xs text-slate-500">{progress}% complete</span>
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{course.title}</h3>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: `${progress}%` }} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-white">My Certifications</h2>
        <p className="mt-1 text-sm text-slate-400">
          Track your professional certifications and renewal deadlines — separate from the equipment fleet
          tracked in the Equipment Manager.
        </p>
        <div className="mt-4">
          <CertificationTracker email={user.email} />
        </div>
      </section>
    </div>
  );
}
