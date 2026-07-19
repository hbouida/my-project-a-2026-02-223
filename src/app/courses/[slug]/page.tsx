import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourseBySlug } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.summary,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const related = courses.filter((c) => c.category === course.category && c.slug !== course.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <nav className="text-sm text-slate-500">
        <Link href="/courses" className="hover:text-slate-300">
          Courses
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-400">{course.category}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
              {course.category}
            </span>
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
              {course.level}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
              <svg className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
                <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z" />
              </svg>
              {course.rating} &middot; {course.studentsCount.toLocaleString()} students
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{course.title}</h1>
          <p className="mt-4 text-lg text-slate-400">{course.summary}</p>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">About this course</h2>
            <p className="mt-3 text-slate-400">{course.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">What you&apos;ll learn</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="mt-0.5 h-4 w-4 flex-none text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">Curriculum</h2>
            <div className="mt-4 space-y-3">
              {course.curriculum.map((mod) => (
                <div key={mod.module} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                  <h3 className="font-medium text-white">{mod.module}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="h-1 w-1 flex-none rounded-full bg-slate-600" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-lg border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-base font-semibold text-white">Instructor</h2>
            <p className="mt-1 text-sm text-slate-400">{course.instructorRole}</p>
            <p className="mt-2 text-xs text-slate-500">
              Instructor bio to be added — PEQ Academy instructors are
              practicing engineers and certified inspectors.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="text-3xl font-bold text-white">${course.price}</div>
            <p className="text-xs text-slate-500">USD, one-time</p>

            <Link
              href="/contact"
              className="mt-6 block w-full rounded-md bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Enroll Now
            </Link>

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
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-white">More in {course.category}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
