import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, getCourseBySlug } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import CourseEnrollSidebar from "@/components/CourseEnrollSidebar";
import CourseCurriculumList from "@/components/CourseCurriculumList";
import { CourseEnrollmentProvider } from "@/components/CourseEnrollmentContext";

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

      <CourseEnrollmentProvider course={course}>
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
            <CourseCurriculumList course={course} />
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
          <CourseEnrollSidebar course={course} />
        </div>
      </div>
      </CourseEnrollmentProvider>

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
