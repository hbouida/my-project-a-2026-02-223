import type { Metadata } from "next";
import DashboardContent from "@/components/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your course progress and certification tracker on PEQ Academy.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <DashboardContent />
    </div>
  );
}
