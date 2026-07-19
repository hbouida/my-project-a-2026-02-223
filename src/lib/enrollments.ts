export interface EnrollmentRecord {
  slug: string;
  enrolledAt: string;
  completedLessons: string[];
}

function storageKey(email: string) {
  return `peq-academy-enrollments:${email.trim().toLowerCase()}`;
}

export function getEnrollments(email: string): EnrollmentRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(storageKey(email));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as EnrollmentRecord[];
  } catch {
    return [];
  }
}

function saveEnrollments(email: string, records: EnrollmentRecord[]) {
  window.localStorage.setItem(storageKey(email), JSON.stringify(records));
}

export function getEnrollment(email: string, slug: string): EnrollmentRecord | undefined {
  return getEnrollments(email).find((e) => e.slug === slug);
}

export function enroll(email: string, slug: string): EnrollmentRecord[] {
  const records = getEnrollments(email);
  if (!records.some((e) => e.slug === slug)) {
    records.push({ slug, enrolledAt: new Date().toISOString(), completedLessons: [] });
    saveEnrollments(email, records);
  }
  return records;
}

export function toggleLesson(email: string, slug: string, lessonKey: string): EnrollmentRecord[] {
  const records = getEnrollments(email);
  const rec = records.find((e) => e.slug === slug);
  if (!rec) return records;
  rec.completedLessons = rec.completedLessons.includes(lessonKey)
    ? rec.completedLessons.filter((l) => l !== lessonKey)
    : [...rec.completedLessons, lessonKey];
  saveEnrollments(email, records);
  return records;
}
