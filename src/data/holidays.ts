export interface Holiday {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    type: "Federal" | "Company" | "Optional";
}

export const STATIC_HOLIDAYS: Holiday[] = [
    // January
    { id: "h1", name: "New Year’s Day", date: "2026-01-01", type: "Optional" },
    { id: "h2", name: "Lohri / Bhogi", date: "2026-01-13", type: "Optional" },
    { id: "h3", name: "Makar Sankranti / Pongal", date: "2026-01-14", type: "Optional" },
    { id: "h4", name: "Makara Sankranti", date: "2026-01-15", type: "Optional" },
    { id: "h5", name: "Kanuma", date: "2026-01-16", type: "Optional" },
    { id: "h6", name: "Vasant Panchami", date: "2026-01-23", type: "Optional" },
    { id: "h7", name: "Republic Day", date: "2026-01-26", type: "Federal" }, // National

    // February
    { id: "h8", name: "Maha Shivaratri", date: "2026-02-15", type: "Optional" },

    // March
    { id: "h9", name: "Holika Dahan / Holi", date: "2026-03-03", type: "Optional" }, // Date range 3-4, picked 3
    { id: "h10", name: "Holi", date: "2026-03-04", type: "Optional" },
    { id: "h11", name: "Ugadi / Gudi Padwa", date: "2026-03-19", type: "Optional" },
    { id: "h12", name: "Eid-ul-Fitr", date: "2026-03-20", type: "Optional" }, // Moon based 20-21
    { id: "h13", name: "Ram Navami", date: "2026-03-26", type: "Optional" },
    { id: "h14", name: "Mahavir Jayanti", date: "2026-03-31", type: "Optional" },

    // April
    { id: "h15", name: "Good Friday", date: "2026-04-03", type: "Optional" },
    { id: "h16", name: "Akshaya Tritiya", date: "2026-04-19", type: "Optional" },

    // May
    { id: "h17", name: "Labour Day", date: "2026-05-01", type: "Federal" }, // Often a holiday
    { id: "h18", name: "Eid ul-Adha / Bakrid", date: "2026-05-27", type: "Optional" },

    // June
    { id: "h19", name: "Jyeshtha Purnima", date: "2026-06-16", type: "Optional" },

    // July
    { id: "h20", name: "Rath Yatra", date: "2026-07-16", type: "Optional" },

    // August
    { id: "h21", name: "Independence Day", date: "2026-08-15", type: "Federal" }, // National
    { id: "h22", name: "Onam", date: "2026-08-25", type: "Optional" },
    { id: "h23", name: "Raksha Bandhan", date: "2026-08-28", type: "Optional" },

    // September
    { id: "h24", name: "Janmashtami", date: "2026-09-04", type: "Optional" },
    { id: "h25", name: "Ganesh Chaturthi", date: "2026-09-15", type: "Optional" },
    { id: "h26", name: "Vishwakarma Puja", date: "2026-09-17", type: "Optional" },

    // October
    { id: "h27", name: "Gandhi Jayanti", date: "2026-10-02", type: "Federal" }, // National
    { id: "h28", name: "Navratri Start", date: "2026-10-11", type: "Optional" },
    { id: "h29", name: "Dussehra", date: "2026-10-20", type: "Optional" },
    { id: "h30", name: "Karwa Chauth", date: "2026-10-29", type: "Optional" },

    // November
    { id: "h31", name: "Dhanteras", date: "2026-11-06", type: "Optional" },
    { id: "h32", name: "Diwali", date: "2026-11-08", type: "Federal" }, // Major festival
    { id: "h33", name: "Govardhan Puja", date: "2026-11-10", type: "Optional" },
    { id: "h34", name: "Bhai Dooj", date: "2026-11-11", type: "Optional" },
    { id: "h35", name: "Chhath Puja", date: "2026-11-15", type: "Optional" },
    { id: "h36", name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Optional" },

    // December
    { id: "h37", name: "Christmas Day", date: "2026-12-25", type: "Federal" }, // Major
];
