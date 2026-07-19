import type { Metadata } from "next";
import EquipmentManager from "@/components/EquipmentManager";

export const metadata: Metadata = {
  title: "Equipment Manager",
  description:
    "Register your pressure vessels, boilers, piping circuits, and tanks and automatically track inspection due dates and compliance status.",
};

export default function EquipmentManagerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wide text-amber-400">
          Digital tool
        </span>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Equipment Manager</h1>
        <p className="mt-4 text-slate-400">
          Register every pressure vessel, boiler, piping circuit, tank, and
          relief device you&apos;re responsible for. We calculate the next
          inspection due date from the applicable code and flag anything
          due soon or overdue.
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Your data is stored locally in this browser — nothing is sent to a
          server. Upgrade to a Team plan for cloud sync across users and
          sites.
        </p>
      </div>

      <div className="mt-10">
        <EquipmentManager />
      </div>
    </div>
  );
}
