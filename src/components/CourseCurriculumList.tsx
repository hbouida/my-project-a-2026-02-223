"use client";

import { useCourseEnrollment } from "@/components/CourseEnrollmentContext";
import { Course } from "@/lib/types";

export default function CourseCurriculumList({ course }: { course: Course }) {
  const { enrollment, toggleLesson } = useCourseEnrollment();

  return (
    <div id="curriculum" className="mt-4 space-y-3 scroll-mt-24">
      {course.curriculum.map((mod, modIndex) => (
        <div key={mod.module} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="font-medium text-white">{mod.module}</h3>
          <ul className="mt-2 space-y-1.5">
            {mod.lessons.map((lesson, lessonIndex) => {
              const lessonKey = `${modIndex}-${lessonIndex}`;
              const isComplete = enrollment?.completedLessons.includes(lessonKey) ?? false;

              if (!enrollment) {
                return (
                  <li key={lesson} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="h-1 w-1 flex-none rounded-full bg-slate-600" />
                    {lesson}
                  </li>
                );
              }

              return (
                <li key={lesson}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={isComplete}
                      onChange={() => toggleLesson(lessonKey)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-amber-500 focus:ring-amber-500"
                    />
                    <span className={isComplete ? "text-slate-500 line-through" : ""}>{lesson}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      {!enrollment && (
        <p className="text-xs text-slate-500">Enroll in this course to track lesson-by-lesson progress.</p>
      )}
    </div>
  );
}
