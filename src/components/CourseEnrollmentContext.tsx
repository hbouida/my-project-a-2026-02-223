"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { EnrollmentRecord, enroll as enrollInCourse, getEnrollment, toggleLesson as toggleLessonRecord } from "@/lib/enrollments";
import { Course } from "@/lib/types";

interface CourseEnrollmentContextValue {
  enrollment: EnrollmentRecord | undefined;
  ready: boolean;
  enrollNow: () => void;
  toggleLesson: (lessonKey: string) => void;
}

const CourseEnrollmentContext = createContext<CourseEnrollmentContextValue | undefined>(undefined);

export function CourseEnrollmentProvider({ course, children }: { course: Course; children: React.ReactNode }) {
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState<EnrollmentRecord | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Syncing from localStorage after the hydration-matching first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnrollment(user ? getEnrollment(user.email, course.slug) : undefined);
    setReady(true);
  }, [user, course.slug]);

  function enrollNow() {
    if (!user) return;
    const records = enrollInCourse(user.email, course.slug);
    setEnrollment(records.find((r) => r.slug === course.slug));
  }

  function toggleLesson(lessonKey: string) {
    if (!user) return;
    const records = toggleLessonRecord(user.email, course.slug, lessonKey);
    setEnrollment(records.find((r) => r.slug === course.slug));
  }

  return (
    <CourseEnrollmentContext.Provider value={{ enrollment, ready, enrollNow, toggleLesson }}>
      {children}
    </CourseEnrollmentContext.Provider>
  );
}

export function useCourseEnrollment() {
  const ctx = useContext(CourseEnrollmentContext);
  if (!ctx) throw new Error("useCourseEnrollment must be used within a CourseEnrollmentProvider");
  return ctx;
}
