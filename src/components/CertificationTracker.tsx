"use client";

import { useEffect, useMemo, useState } from "react";
import { statusFromDueDate } from "@/lib/complianceStatus";
import { Certification, commonCertifications, getCertifications, saveCertifications } from "@/lib/certifications";
import { ComplianceStatus } from "@/lib/types";

const statusLabels: Record<ComplianceStatus, string> = {
  Compliant: "Active",
  "Due Soon": "Renewal Due",
  Overdue: "Expired",
};

const statusStyles: Record<ComplianceStatus, string> = {
  Compliant: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
  "Due Soon": "bg-amber-500/10 text-amber-400 ring-amber-500/30",
  Overdue: "bg-red-500/10 text-red-400 ring-red-500/30",
};

function emptyForm(): Omit<Certification, "id"> {
  return {
    name: commonCertifications[0],
    issuingBody: "API",
    credentialId: "",
    issueDate: "",
    expiryDate: "",
    notes: "",
  };
}

export default function CertificationTracker({ email }: { email: string }) {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Certification, "id">>(emptyForm());

  useEffect(() => {
    // Syncing from localStorage after the hydration-matching first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCerts(getCertifications(email));
    setLoaded(true);
  }, [email]);

  useEffect(() => {
    if (!loaded) return;
    saveCertifications(email, certs);
  }, [certs, loaded, email]);

  const rows = useMemo(() => {
    return certs
      .map((cert) => ({ ...cert, status: statusFromDueDate(new Date(cert.expiryDate), 180) }))
      .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
  }, [certs]);

  function openAddForm() {
    setEditingId(null);
    setForm(emptyForm());
    setIsFormOpen(true);
  }

  function openEditForm(cert: Certification) {
    setEditingId(cert.id);
    const { id, ...rest } = cert;
    void id;
    setForm(rest);
    setIsFormOpen(true);
  }

  function handleDelete(id: string) {
    setCerts((prev) => prev.filter((c) => c.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.expiryDate) return;
    if (editingId) {
      setCerts((prev) => prev.map((c) => (c.id === editingId ? { ...form, id: editingId } : c)));
    } else {
      setCerts((prev) => [...prev, { ...form, id: `cert-${Date.now()}` }]);
    }
    setIsFormOpen(false);
  }

  if (!loaded) {
    return <div className="h-40 animate-pulse rounded-xl border border-slate-800 bg-slate-900/40" />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {certs.length === 0
            ? "No certifications tracked yet."
            : `Tracking ${certs.length} certification${certs.length === 1 ? "" : "s"}.`}
        </p>
        <button
          onClick={openAddForm}
          className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
        >
          + Add Certification
        </button>
      </div>

      {rows.length > 0 && (
        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Certification</th>
                <th className="px-4 py-3 font-medium">Issuing body</th>
                <th className="px-4 py-3 font-medium">Expires</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rows.map((cert) => (
                <tr key={cert.id} className="bg-slate-950/40">
                  <td className="px-4 py-3 font-semibold text-white">{cert.name}</td>
                  <td className="px-4 py-3 text-slate-300">{cert.issuingBody}</td>
                  <td className="px-4 py-3 text-slate-300">{cert.expiryDate}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[cert.status]}`}>
                      {statusLabels[cert.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEditForm(cert)} className="text-sm text-slate-400 hover:text-white">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="ml-4 text-sm text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 py-10 sm:items-center">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit certification" : "Add certification"}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-500 hover:text-white" aria-label="Close">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm sm:col-span-2">
                <span className="text-slate-400">Certification</span>
                <select
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                >
                  {commonCertifications.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Issuing body</span>
                <input
                  value={form.issuingBody}
                  onChange={(e) => setForm({ ...form, issuingBody: e.target.value })}
                  placeholder="API"
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Credential ID</span>
                <input
                  value={form.credentialId}
                  onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Issue date</span>
                <input
                  type="date"
                  value={form.issueDate}
                  onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="text-slate-400">Expiry date</span>
                <input
                  required
                  type="date"
                  value={form.expiryDate}
                  onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
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
                  {editingId ? "Save changes" : "Add certification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
