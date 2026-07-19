"use client";

import { useEffect, useMemo, useState } from "react";
import {
  applicableCodes,
  computeNextDueDate,
  computeStatus,
  defaultIntervalMonths,
  equipmentTypes,
  sampleEquipment,
} from "@/data/equipment";
import { ApplicableCode, ComplianceStatus, Equipment, EquipmentType } from "@/lib/types";

const STORAGE_KEY = "peq-academy-equipment-registry";

const statusStyles: Record<ComplianceStatus, string> = {
  Compliant: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  "Due Soon": "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  Overdue: "bg-red-500/10 text-red-400 ring-red-500/30",
};

function emptyForm(): Omit<Equipment, "id"> {
  return {
    tag: "",
    type: "Pressure Vessel",
    applicableCode: "ASME BPVC VIII-1",
    site: "",
    country: "",
    designPressure: "",
    installDate: "",
    lastInspectionDate: new Date().toISOString().slice(0, 10),
    inspectionIntervalMonths: defaultIntervalMonths["ASME BPVC VIII-1"],
    notes: "",
  };
}

export default function EquipmentManager() {
  const [equipment, setEquipment] = useState<Equipment[]>(sampleEquipment);
  const [loaded, setLoaded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Equipment, "id">>(emptyForm());
  const [statusFilter, setStatusFilter] = useState<ComplianceStatus | "All">("All");
  const [typeFilter, setTypeFilter] = useState<EquipmentType | "All">("All");

  useEffect(() => {
    // Syncing from localStorage (an external system) on mount, after the
    // hydration-matching first render — required to avoid a hydration mismatch.
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setEquipment(JSON.parse(raw));
      } catch {
        // ignore malformed storage
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(equipment));
  }, [equipment, loaded]);

  const rows = useMemo(() => {
    return equipment
      .map((eq) => ({
        ...eq,
        status: computeStatus(eq.lastInspectionDate, eq.inspectionIntervalMonths),
        dueDate: computeNextDueDate(eq.lastInspectionDate, eq.inspectionIntervalMonths),
      }))
      .filter((eq) => (statusFilter === "All" ? true : eq.status === statusFilter))
      .filter((eq) => (typeFilter === "All" ? true : eq.type === typeFilter))
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [equipment, statusFilter, typeFilter]);

  const counts = useMemo(() => {
    const all = equipment.map((eq) => computeStatus(eq.lastInspectionDate, eq.inspectionIntervalMonths));
    return {
      total: equipment.length,
      compliant: all.filter((s) => s === "Compliant").length,
      dueSoon: all.filter((s) => s === "Due Soon").length,
      overdue: all.filter((s) => s === "Overdue").length,
    };
  }, [equipment]);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm());
    setIsFormOpen(true);
  }

  function openEditForm(eq: Equipment) {
    setEditingId(eq.id);
    const { id, ...rest } = eq;
    void id;
    setForm(rest);
    setIsFormOpen(true);
  }

  function handleDelete(id: string) {
    setEquipment((prev) => prev.filter((eq) => eq.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.tag.trim()) return;

    if (editingId) {
      setEquipment((prev) => prev.map((eq) => (eq.id === editingId ? { ...form, id: editingId } : eq)));
    } else {
      setEquipment((prev) => [...prev, { ...form, id: `eq-${Date.now()}` }]);
    }
    setIsFormOpen(false);
  }

  function handleCodeChange(code: ApplicableCode) {
    setForm((prev) => ({ ...prev, applicableCode: code, inspectionIntervalMonths: defaultIntervalMonths[code] }));
  }

  function exportCsv() {
    const header = [
      "Tag",
      "Type",
      "Applicable Code",
      "Site",
      "Country",
      "Design Pressure",
      "Install Date",
      "Last Inspection Date",
      "Inspection Interval (months)",
      "Next Due Date",
      "Status",
      "Notes",
    ];
    const lines = equipment.map((eq) => {
      const status = computeStatus(eq.lastInspectionDate, eq.inspectionIntervalMonths);
      const due = computeNextDueDate(eq.lastInspectionDate, eq.inspectionIntervalMonths);
      return [
        eq.tag,
        eq.type,
        eq.applicableCode,
        eq.site,
        eq.country,
        eq.designPressure,
        eq.installDate,
        eq.lastInspectionDate,
        String(eq.inspectionIntervalMonths),
        due.toISOString().slice(0, 10),
        status,
        eq.notes ?? "",
      ]
        .map((field) => `"${String(field).replace(/"/g, '""')}"`)
        .join(",");
    });
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "peq-academy-equipment-registry.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Dashboard */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-2xl font-bold text-white">{counts.total}</div>
          <div className="mt-1 text-sm text-slate-400">Total assets</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-2xl font-bold text-emerald-400">{counts.compliant}</div>
          <div className="mt-1 text-sm text-slate-400">Compliant</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-2xl font-bold text-amber-400">{counts.dueSoon}</div>
          <div className="mt-1 text-sm text-slate-400">Due soon (90d)</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="text-2xl font-bold text-red-400">{counts.overdue}</div>
          <div className="mt-1 text-sm text-slate-400">Overdue</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ComplianceStatus | "All")}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="All">All statuses</option>
            <option value="Compliant">Compliant</option>
            <option value="Due Soon">Due Soon</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as EquipmentType | "All")}
            className="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-amber-500 focus:outline-none"
          >
            <option value="All">All types</option>
            {equipmentTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportCsv}
            className="rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:border-slate-500"
          >
            Export CSV
          </button>
          <button
            onClick={openAddForm}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            + Add Equipment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Tag</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Site / Country</th>
              <th className="px-4 py-3 font-medium">Next Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((eq) => (
              <tr key={eq.id} className="bg-slate-950/40">
                <td className="px-4 py-3 font-semibold text-white">{eq.tag}</td>
                <td className="px-4 py-3 text-slate-300">{eq.type}</td>
                <td className="px-4 py-3 text-slate-300">{eq.applicableCode}</td>
                <td className="px-4 py-3 text-slate-300">
                  {eq.site}
                  <span className="block text-xs text-slate-500">{eq.country}</span>
                </td>
                <td className="px-4 py-3 text-slate-300">{eq.dueDate.toISOString().slice(0, 10)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[eq.status]}`}>
                    {eq.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEditForm(eq)} className="text-sm text-slate-400 hover:text-white">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(eq.id)}
                    className="ml-4 text-sm text-red-400 hover:text-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No equipment matches your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Form modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10 sm:items-center">
          <div className="w-full max-w-xl rounded-xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit equipment" : "Add equipment"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-500 hover:text-white"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-slate-400">Tag / ID</span>
                <input
                  required
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  placeholder="V-101"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Type</span>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as EquipmentType })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  {equipmentTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Applicable code</span>
                <select
                  value={form.applicableCode}
                  onChange={(e) => handleCodeChange(e.target.value as ApplicableCode)}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  {applicableCodes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Inspection interval (months)</span>
                <input
                  required
                  type="number"
                  min={1}
                  value={form.inspectionIntervalMonths}
                  onChange={(e) => setForm({ ...form, inspectionIntervalMonths: Number(e.target.value) })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Site</span>
                <input
                  value={form.site}
                  onChange={(e) => setForm({ ...form, site: e.target.value })}
                  placeholder="Riverside Processing Plant"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Country</span>
                <input
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="United States"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Design pressure</span>
                <input
                  value={form.designPressure}
                  onChange={(e) => setForm({ ...form, designPressure: e.target.value })}
                  placeholder="150 psig"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Install date</span>
                <input
                  type="date"
                  value={form.installDate}
                  onChange={(e) => setForm({ ...form, installDate: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Last inspection date</span>
                <input
                  required
                  type="date"
                  value={form.lastInspectionDate}
                  onChange={(e) => setForm({ ...form, lastInspectionDate: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm sm:col-span-2">
                <span className="text-slate-400">Notes</span>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <div className="flex justify-end gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-400"
                >
                  {editingId ? "Save changes" : "Add equipment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
