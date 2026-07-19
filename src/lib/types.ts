export type CourseCategory =
  | "Fundamentals"
  | "Codes & Standards"
  | "Inspection & NDE"
  | "Mechanical Integrity"
  | "Safety & Relief Systems"
  | "Welding & Fabrication"
  | "Certification Prep";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type CourseFormat = "Self-paced" | "Live cohort" | "Self-paced + Live Q&A";

export interface Course {
  slug: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  format: CourseFormat;
  durationHours: number;
  price: number;
  currency: "USD";
  rating: number;
  studentsCount: number;
  summary: string;
  description: string;
  outcomes: string[];
  curriculum: { module: string; lessons: string[] }[];
  instructorRole: string;
  ceCredits: number;
}

export type EquipmentType =
  | "Pressure Vessel"
  | "Fired Boiler"
  | "Piping Circuit"
  | "Storage Tank"
  | "Heat Exchanger"
  | "Compressor"
  | "Pressure Relief Device";

export type ApplicableCode =
  | "ASME BPVC VIII-1"
  | "ASME BPVC I"
  | "API 510"
  | "API 570"
  | "API 653"
  | "PED 2014/68/EU"
  | "NBIC"
  | "ASME B31.3";

export type ComplianceStatus = "Compliant" | "Due Soon" | "Overdue";

export interface Equipment {
  id: string;
  tag: string;
  type: EquipmentType;
  applicableCode: ApplicableCode;
  site: string;
  country: string;
  designPressure: string;
  installDate: string;
  lastInspectionDate: string;
  inspectionIntervalMonths: number;
  notes?: string;
}
