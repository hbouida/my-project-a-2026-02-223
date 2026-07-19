import { ApplicableCode, ComplianceStatus, Equipment, EquipmentType } from "@/lib/types";

export const equipmentTypes: EquipmentType[] = [
  "Pressure Vessel",
  "Fired Boiler",
  "Piping Circuit",
  "Storage Tank",
  "Heat Exchanger",
  "Compressor",
  "Pressure Relief Device",
];

export const applicableCodes: ApplicableCode[] = [
  "ASME BPVC VIII-1",
  "ASME BPVC I",
  "API 510",
  "API 570",
  "API 653",
  "PED 2014/68/EU",
  "NBIC",
  "ASME B31.3",
];

export const defaultIntervalMonths: Record<ApplicableCode, number> = {
  "ASME BPVC VIII-1": 60,
  "ASME BPVC I": 12,
  "API 510": 120,
  "API 570": 60,
  "API 653": 240,
  "PED 2014/68/EU": 72,
  NBIC: 60,
  "ASME B31.3": 60,
};

export const sampleEquipment: Equipment[] = [
  {
    id: "eq-sample-1",
    tag: "V-101",
    type: "Pressure Vessel",
    applicableCode: "ASME BPVC VIII-1",
    site: "Riverside Processing Plant",
    country: "United States",
    designPressure: "150 psig",
    installDate: "2016-03-14",
    lastInspectionDate: "2022-01-10",
    inspectionIntervalMonths: 60,
    notes: "Sample asset — edit or delete to start your own registry.",
  },
  {
    id: "eq-sample-2",
    tag: "B-04",
    type: "Fired Boiler",
    applicableCode: "ASME BPVC I",
    site: "Northfield Utilities Building",
    country: "Canada",
    designPressure: "250 psig",
    installDate: "2011-08-01",
    lastInspectionDate: "2025-05-20",
    inspectionIntervalMonths: 12,
    notes: "Sample asset — edit or delete to start your own registry.",
  },
  {
    id: "eq-sample-3",
    tag: "TK-220",
    type: "Storage Tank",
    applicableCode: "API 653",
    site: "Harbor Terminal 2",
    country: "Netherlands",
    designPressure: "Atmospheric",
    installDate: "2005-11-30",
    lastInspectionDate: "2019-02-15",
    inspectionIntervalMonths: 240,
    notes: "Sample asset — edit or delete to start your own registry.",
  },
];

export function computeNextDueDate(lastInspectionDate: string, intervalMonths: number): Date {
  const d = new Date(lastInspectionDate);
  d.setMonth(d.getMonth() + intervalMonths);
  return d;
}

export function computeStatus(lastInspectionDate: string, intervalMonths: number): ComplianceStatus {
  const due = computeNextDueDate(lastInspectionDate, intervalMonths);
  const today = new Date();
  const daysUntilDue = Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilDue < 0) return "Overdue";
  if (daysUntilDue <= 90) return "Due Soon";
  return "Compliant";
}
