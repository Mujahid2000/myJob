export type JobListing = {
    _id: string; // MongoDB ObjectId as string
    userId: string;
    companyId: string;
    jobTitle: string;
    tags: string[];
    jobRole: string;
    salaryType: "hourly" | "monthly" | "annual"; // আপনি চাইলে Enum বানাতে পারেন
    minSalary: number;
    maxSalary: number;
    education: string;
    experience: string;
    jobType: "full-time" | "part-time" | "remote" | string; // আপনার values অনুযায়ী narrow করতে পারেন
    expireDate: string; // ISO Date string
    vacancy: string; // string বা number, আপনার স্কিমা অনুযায়ী ঠিক করুন
    jobLevel: string;
    description: string;
    responsibilities: string;
    location: string;
    status: "open" | "closed" | string;
    promotedSystem?: "top" | "highlight" | string | null; // optional, কারণ সব জব প্রমোটেড নাও হতে পারে
    logo?: string | null; // কোম্পানির লোগো, এটি optional কারণ কিছু ক্ষেত্রে নাও থাকতে পারে
  };
  