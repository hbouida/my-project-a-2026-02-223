import Link from "next/link";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "Course Catalog" },
      { href: "/courses?category=Certification+Prep", label: "Certification Prep" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/equipment-manager", label: "Equipment Manager" },
      { href: "/pricing", label: "Team & Enterprise" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About PEQ Academy" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 font-bold text-slate-950">
                PEQ
              </span>
              <span className="text-lg font-semibold text-white">PEQ Academy</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-400">
              The worldwide academy for pressure equipment professionals — pressure
              vessels, boilers, piping, and storage tanks. Courses, certification
              prep, and digital tools for equipment compliance, from one platform.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} PEQ Academy. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Independent training provider. Not affiliated with ASME, API, or the
            European Commission. Course content references public codes and
            standards for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
