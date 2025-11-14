export const payrollSummary = {
  latestPayslipDate: "Nov 15, 2025",
  netPay: 4500,
  grossPay: 6250,
  deductions: 850,
  taxes: 900,
  paidOn: "Nov 20, 2024",
};

export const paymentHistory = {
  2023: [
    { date: "Nov 20, 2023", net: 4500 },
    { date: "Oct 20, 2023", net: 4500 },
    { date: "Sep 20, 2023", net: 4500 },
    { date: "Aug 20, 2023", net: 4500 },
  ],
  2024: [
    { date: "Nov 20, 2024", net: 4800 },
    { date: "Oct 20, 2024", net: 4700 },
  ],
  2025: [
    { date: "Nov 15, 2025", net: 4500 },
  ],
  2026: [] // No data yet
};

export const breakdown = [
  {
    category: "Earnings",
    icon: "+",
    amount: 6250,
    items: [
      { label: "Base Salary", amount: 6000 },
      { label: "Bonus", amount: 250 },
    ]
  },
  {
    category: "Deduction",
    icon: "-",
    amount: -850,
    items: [
      { label: "PF Deduction", amount: -500 },
      { label: "Insurance", amount: -350 },
    ]
  },
  {
    category: "Taxes",
    icon: "*",
    amount: -900,
    items: [
      { label: "TDS", amount: -900 }
    ]
  }
];
