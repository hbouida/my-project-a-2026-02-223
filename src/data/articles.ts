export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  publishedDate: string;
  readTimeMinutes: number;
  sections: { heading: string; body: string }[];
}

export const articles: Article[] = [
  {
    slug: "api-510-vs-570-vs-653",
    title: "API 510 vs. API 570 vs. API 653: Which Certification Should You Pursue First?",
    category: "Certification",
    excerpt:
      "Three certifications, three equipment classes. Here's how to decide which one matches your day-to-day work.",
    publishedDate: "2026-02-10",
    readTimeMinutes: 6,
    sections: [
      {
        heading: "They cover different equipment, not different skill levels",
        body: "API 510 certifies inspectors for pressure vessels, API 570 for in-service piping systems, and API 653 for aboveground storage tanks. None is a prerequisite for the others, and none is objectively \"harder\" — the right first choice depends on what equipment you actually inspect day to day.",
      },
      {
        heading: "Start with what's in front of you",
        body: "If your facility's inspection backlog is dominated by vessels — reactors, columns, drums — API 510 gives you the most immediate return. Piping-heavy environments like refineries and chemical plants often lean toward API 570 first, since piping circuits usually outnumber vessels by a wide margin. Terminal and tank farm inspectors typically go straight to API 653.",
      },
      {
        heading: "The overlap is real, and it compounds",
        body: "All three exams draw on a shared foundation: corrosion mechanisms, minimum thickness calculations, and remaining-life estimates. Once you hold one certification, the incremental study load for the next is smaller than it looks — mostly the equipment-specific repair, alteration, and rerating rules.",
      },
      {
        heading: "A reasonable sequence for a generalist",
        body: "If you inspect across all three equipment types and truly have no reason to prioritize one, most inspectors find the API 510 → API 570 → API 653 order to be a comfortable ramp, since it moves roughly from the most tightly scoped code to the broadest one. But this is a preference, not a rule — go where your equipment is.",
      },
    ],
  },
  {
    slug: "understanding-mawp",
    title: "Understanding MAWP: What It Is and Why It's Not the Same as Design Pressure",
    category: "Fundamentals",
    excerpt:
      "Design pressure and MAWP get used interchangeably on the shop floor. They shouldn't be — here's the distinction that matters.",
    publishedDate: "2026-01-22",
    readTimeMinutes: 5,
    sections: [
      {
        heading: "Design pressure is a decision, MAWP is a calculation",
        body: "Design pressure is chosen by the engineer before fabrication — it's an input, usually set with margin above the expected operating pressure. Maximum Allowable Working Pressure (MAWP) is the output of a calculation performed after the vessel is built, using the as-built (not nominal) wall thickness of the weakest component.",
      },
      {
        heading: "Why MAWP is usually higher than design pressure",
        body: "Plate and pipe are manufactured in standard thicknesses, so the actual wall thickness used almost always exceeds the minimum required for the design pressure alone. That extra thickness translates into a calculated MAWP that's typically higher — sometimes significantly higher — than the design pressure stamped on the original data sheet.",
      },
      {
        heading: "Why this matters for in-service inspection",
        body: "As a vessel corrodes, its actual MAWP decreases over time, even though the original design pressure never changes. Inspectors compare the current calculated MAWP against the operating pressure — not the original design pressure — when deciding whether a vessel remains fit for continued service.",
      },
      {
        heading: "The nameplate reference",
        body: "Some nameplates list MAWP directly; others list only design pressure, requiring the inspector to reconstruct MAWP from thickness readings and the applicable code formulas. Knowing which one you're looking at — and why they differ — is a distinction every pressure equipment inspector needs before touching a UT gauge.",
      },
    ],
  },
  {
    slug: "risk-based-inspection-small-facilities",
    title: "A Practical Guide to Risk-Based Inspection for Small Facilities",
    category: "Mechanical Integrity",
    excerpt:
      "RBI has a reputation as an enterprise-scale program. Here's how smaller sites can apply the same logic without the overhead.",
    publishedDate: "2026-03-05",
    readTimeMinutes: 7,
    sections: [
      {
        heading: "RBI is a prioritization method, not a software purchase",
        body: "At its core, risk-based inspection ranks equipment by probability of failure times consequence of failure, then directs inspection resources toward the highest-risk items first. That logic scales down just as well as it scales up — you don't need an enterprise RBI platform to apply it.",
      },
      {
        heading: "Start qualitative before going quantitative",
        body: "API 580 explicitly allows qualitative risk screening: a simple high/medium/low matrix built from known damage mechanisms and consequence categories (safety, environmental, financial). For a facility with a few dozen pieces of equipment, a well-reasoned spreadsheet applying this matrix captures most of the benefit that a full quantitative model would provide.",
      },
      {
        heading: "The highest-leverage step is damage mechanism identification",
        body: "Most of the value in RBI comes from correctly identifying which damage mechanisms are credible for each piece of equipment given its service — not from precise probability math. A vessel in wet H2S service and one in dry, non-corrosive gas service should never be on the same inspection interval, and RBI is what makes that difference explicit and defensible.",
      },
      {
        heading: "Keep it a living program, not a one-time exercise",
        body: "Inspection results should feed back into the risk ranking. A corrosion rate that comes in higher than assumed should shorten that equipment's next interval — even in a lightweight, spreadsheet-based program. RBI's value comes from that feedback loop, not from the sophistication of the initial model.",
      },
    ],
  },
  {
    slug: "ped-vs-asme",
    title: "PED vs. ASME: Comparing Europe's and North America's Pressure Equipment Frameworks",
    category: "Codes & Standards",
    excerpt:
      "Different continents, different regulatory philosophies. Here's what changes — and what doesn't — when equipment crosses the Atlantic.",
    publishedDate: "2026-04-18",
    readTimeMinutes: 8,
    sections: [
      {
        heading: "A directive vs. a design code",
        body: "The EU's Pressure Equipment Directive (PED 2014/68/EU) is a legal instrument that sets essential safety requirements and conformity assessment obligations — it doesn't itself contain design formulas. ASME's Boiler and Pressure Vessel Code, by contrast, is a design and construction code with the calculation rules built directly into it. In practice, PED-covered equipment is usually designed to a harmonized standard like EN 13445, with PED governing how conformity is assessed and documented.",
      },
      {
        heading: "Categorization changes the compliance path",
        body: "PED sorts equipment into categories I through IV based on fluid group, pressure, and volume, with each category triggering a different conformity assessment route — from simple manufacturer self-declaration at Category I up to full quality system audits and Notified Body involvement at Category IV. ASME Section VIII, by comparison, applies broadly across a wider band of vessels with third-party (Authorized Inspector) involvement built into the code itself, not tiered by category.",
      },
      {
        heading: "CE marking has no direct ASME equivalent",
        body: "Equipment placed on the EU market under PED must carry CE marking and a Declaration of Conformity — administrative requirements with no parallel in the ASME system, where code stamps (like the 'U' stamp) serve an analogous but structurally different purpose tied to the manufacturer's ASME certification.",
      },
      {
        heading: "Manufacturers exporting between markets need both, not one translated into the other",
        body: "A vessel designed to ASME Section VIII isn't automatically PED-compliant, and vice versa — the two frameworks require separate technical files, even when the underlying engineering is similar. Manufacturers serving both markets typically maintain dual documentation rather than trying to satisfy one regime with the other's paperwork.",
      },
    ],
  },
  {
    slug: "mechanical-integrity-audit-findings",
    title: "5 Common Findings in Mechanical Integrity Audits (and How to Avoid Them)",
    category: "Mechanical Integrity",
    excerpt:
      "The same handful of gaps show up in audit after audit. Here's how to close them before an auditor finds them for you.",
    publishedDate: "2026-05-30",
    readTimeMinutes: 6,
    sections: [
      {
        heading: "1. Inspection intervals that were never recalculated after a repair",
        body: "A repair or rerate should trigger a fresh look at inspection interval and corrosion rate assumptions. Auditors routinely find equipment still running on an interval set before a repair that changed its remaining life calculation.",
      },
      {
        heading: "2. Deferred inspections without a documented risk justification",
        body: "Deferring an inspection past its due date is sometimes defensible — but only with a documented, risk-based rationale and management sign-off. \"We were busy\" is the finding auditors write up most often when that documentation is missing.",
      },
      {
        heading: "3. CML data that doesn't match the field",
        body: "Condition monitoring locations drift over time as insulation, supports, or piping configurations change, but the CML register doesn't always get updated to match. An auditor walking the unit with the CML list in hand is one of the fastest ways this gap gets exposed.",
      },
      {
        heading: "4. Overdue inspections buried in a backlog metric",
        body: "A facility-wide \"95% on schedule\" metric can hide a small number of significantly overdue, high-risk items. Auditors look past the aggregate number to the aging of the specific overdue items — and that's usually where the real finding is.",
      },
      {
        heading: "5. Management of change (MOC) not linked to the MI program",
        body: "A process change that alters temperature, pressure, or fluid composition can invalidate the damage mechanism assumptions behind an equipment's inspection plan. When MOC and mechanical integrity are run as separate, unconnected programs, this link is the first thing to fall through the cracks — and one of the first things an auditor checks.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
