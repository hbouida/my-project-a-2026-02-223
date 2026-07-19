import { ComplianceStatus } from "./types";

export function statusFromDueDate(dueDate: Date, dueSoonDays = 90): ComplianceStatus {
  const today = new Date();
  const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilDue < 0) return "Overdue";
  if (daysUntilDue <= dueSoonDays) return "Due Soon";
  return "Compliant";
}
