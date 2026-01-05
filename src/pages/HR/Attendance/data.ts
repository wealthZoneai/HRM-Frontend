// data.ts

// ==============================
// DEPARTMENTS (static list)
// ==============================
export const DEPARTMENTS = [
  "Teams",
  "AWS",
  "Cyber Security",
  "Java",
  "Python",
  "QA",
  "React",
  "UI/UX",
];


// ==============================
// MONTHS – dynamic (last 12 months)
// example today = Jan 2026
// Output:
// Jan 2026, Dec 2025, Nov 2025 ... Feb 2025
// ==============================
export const MONTHS = (() => {
  const result: { label: string; value: string }[] = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    // Move backwards month by month
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");

    const label = d.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    result.push({
      label,             // January 2026
      value: `${year}-${month}`, // 2026-01
    });
  }

  return result;
})();


// ==============================
// BADGE STYLES USED IN UI
// ==============================
export const BADGE_STYLES = {
  Present: "bg-green-100 text-green-700 font-medium",
  Absent: "bg-red-100 text-red-700 font-medium",
  "On Leave": "bg-yellow-100 text-yellow-700 font-medium",
};
