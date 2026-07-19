export interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  credentialId: string;
  issueDate: string;
  expiryDate: string;
  notes?: string;
}

export const commonCertifications: string[] = [
  "API 510 — Pressure Vessel Inspector",
  "API 570 — Piping Inspector",
  "API 653 — Aboveground Storage Tank Inspector",
  "API 580 — Risk-Based Inspection Professional",
  "CWI — Certified Welding Inspector",
  "ASNT NDT Level II",
  "ASNT NDT Level III",
  "PED Notified Body Auditor",
  "NBIC Commission (National Board)",
];

function storageKey(email: string) {
  return `peq-academy-certifications:${email.trim().toLowerCase()}`;
}

export function getCertifications(email: string): Certification[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(storageKey(email));
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Certification[];
  } catch {
    return [];
  }
}

export function saveCertifications(email: string, certs: Certification[]) {
  window.localStorage.setItem(storageKey(email), JSON.stringify(certs));
}
