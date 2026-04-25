export const navItems = [
  { href: "/dashboard", label: "Dashboard", short: "DB", note: "Daily pulse and cross-team visibility" },
  { href: "/jobs", label: "Jobs", short: "JB", note: "Dispatch, routes, and active work" },
  { href: "/customers", label: "Customers", short: "CU", note: "Health, renewals, and account mix" },
  { href: "/sales", label: "Sales", short: "SL", note: "Pipeline, quotes, and conversion" },
  { href: "/finance", label: "Finance", short: "FN", note: "Cash, margin, and collections" },
  { href: "/alerts", label: "Alerts", short: "AL", note: "Exceptions and action queue" },
];

export const dashboardKpis = [
  { label: "Monthly revenue", value: "$184.2k", detail: "+8.4% vs last month" },
  { label: "Gross margin", value: "31.8%", detail: "+2.1 pts this month" },
  { label: "Open jobs", value: "146", detail: "22 due in next 48 hrs" },
  { label: "Cash on hand", value: "$92.4k", detail: "19 days operating runway" },
];

export const alerts = [
  { title: "3 route gaps tomorrow", detail: "Northwest route is short 2 techs", tone: "danger" },
  { title: "AR over 30 days rising", detail: "$18.6k needs follow-up this week", tone: "warn" },
  { title: "Chemical spend stabilized", detail: "Unit cost down 4.1% over 14 days", tone: "good" },
  { title: "2 commercial renewals pending", detail: "Need quote review before Friday", tone: "warn" },
];

export const revenueMarginData = [
  { week: "W1", revenue: 38, margin: 27 },
  { week: "W2", revenue: 41, margin: 29 },
  { week: "W3", revenue: 39, margin: 28 },
  { week: "W4", revenue: 44, margin: 31 },
  { week: "W5", revenue: 46, margin: 33 },
  { week: "W6", revenue: 48, margin: 32 },
  { week: "W7", revenue: 45, margin: 30 },
  { week: "W8", revenue: 51, margin: 34 },
];

export const funnelData = [
  { value: 124, name: "Leads" },
  { value: 86, name: "Qualified" },
  { value: 49, name: "Quoted" },
  { value: 29, name: "Won" },
];

export const jobs = [
  {
    customer: "Oak Hollow HOA",
    service: "Weekly service",
    tech: "Maria R.",
    status: "Scheduled",
    amount: "$1,280",
    route: "Northwest",
    due: "Today, 1:30 PM",
  },
  {
    customer: "Briarstone Club",
    service: "Filter clean",
    tech: "Derek L.",
    status: "In progress",
    amount: "$780",
    route: "South",
    due: "Today, 3:00 PM",
  },
  {
    customer: "Pine Ridge Apt.",
    service: "Repair follow-up",
    tech: "Unassigned",
    status: "Needs tech",
    amount: "$940",
    route: "Central",
    due: "Tomorrow, 9:00 AM",
  },
  {
    customer: "Harbor View",
    service: "Startup visit",
    tech: "Kara S.",
    status: "Completed",
    amount: "$520",
    route: "West",
    due: "Completed",
  },
  {
    customer: "Westfield Estates",
    service: "Inspection",
    tech: "Jon P.",
    status: "At risk",
    amount: "$1,140",
    route: "Northwest",
    due: "Tomorrow, 11:00 AM",
  },
  {
    customer: "Lakeside Villas",
    service: "Pump replacement",
    tech: "Evan T.",
    status: "Scheduled",
    amount: "$2,260",
    route: "East",
    due: "Thursday, 8:00 AM",
  },
];

export const cashFlowData = [
  { name: "Receipts", value: 122 },
  { name: "Payroll", value: -58 },
  { name: "Chemicals", value: -17 },
  { name: "Vehicles", value: -11 },
  { name: "Other ops", value: -9 },
  { name: "Net", value: 27 },
];

export const routeBoard = [
  { route: "Northwest", fillRate: "81%", jobs: 18, gap: "2 techs short" },
  { route: "Central", fillRate: "93%", jobs: 24, gap: "Stable" },
  { route: "South", fillRate: "88%", jobs: 21, gap: "1 PM delay" },
  { route: "East", fillRate: "97%", jobs: 16, gap: "Stable" },
];

export const customers = [
  { name: "Oak Hollow HOA", type: "Commercial", contract: "Annual", mrr: "$5,800", health: "Healthy" },
  { name: "Harbor View", type: "Residential", contract: "Seasonal", mrr: "$1,420", health: "Watch" },
  { name: "Briarstone Club", type: "Commercial", contract: "Annual", mrr: "$4,900", health: "Healthy" },
  { name: "Pine Ridge Apt.", type: "Commercial", contract: "Annual", mrr: "$6,100", health: "At risk" },
  { name: "Westfield Estates", type: "HOA", contract: "Renewal due", mrr: "$3,750", health: "Renewal" },
];

export const customerSegments = [
  { name: "Commercial", value: 44 },
  { name: "Residential", value: 32 },
  { name: "HOA", value: 24 },
];

export const pipelineStages = [
  { name: "Inbound", deals: 42, value: 58 },
  { name: "Site visit", deals: 28, value: 44 },
  { name: "Proposal", deals: 17, value: 29 },
  { name: "Verbal yes", deals: 9, value: 16 },
];

export const quoteWinRate = [
  { month: "Jan", rate: 21 },
  { month: "Feb", rate: 24 },
  { month: "Mar", rate: 26 },
  { month: "Apr", rate: 29 },
  { month: "May", rate: 31 },
  { month: "Jun", rate: 34 },
];

export const financeKpis = [
  { label: "AR over 30 days", value: "$18.6k", detail: "+11% month over month" },
  { label: "Payroll ratio", value: "31%", detail: "Within target band" },
  { label: "Chemical spend", value: "$17.2k", detail: "-4.1% vs prior period" },
  { label: "Net cash", value: "$27.0k", detail: "Positive after payroll" },
];

export const marginBreakdown = [
  { name: "Service", margin: 38 },
  { name: "Repair", margin: 29 },
  { name: "Install", margin: 25 },
  { name: "Retail", margin: 18 },
];

export const alertQueue = [
  { title: "Unassigned repair visit", owner: "Dispatch", due: "Today", severity: "High" },
  { title: "Collections call for Pine Ridge", owner: "Finance", due: "Today", severity: "High" },
  { title: "Renewal quote for Westfield", owner: "Sales", due: "Tomorrow", severity: "Medium" },
  { title: "Vehicle maintenance slot", owner: "Ops", due: "Thursday", severity: "Low" },
];

export const dateRanges = ["Today", "This week", "This month"] as const;

export const salesReps = [
  { name: "Alyssa K.", openQuotes: 9, closeRate: "36%", nextStep: "2 site visits today" },
  { name: "Marco P.", openQuotes: 6, closeRate: "31%", nextStep: "Renewal pricing review" },
  { name: "Jen T.", openQuotes: 7, closeRate: "29%", nextStep: "Follow up on HOA board vote" },
];

export const collectionQueue = [
  { account: "Pine Ridge Apt.", bucket: "31-60 days", balance: "$8.4k", nextAction: "Call AP" },
  { account: "Harbor View", bucket: "1-30 days", balance: "$2.1k", nextAction: "Email invoice copy" },
  { account: "Westfield Estates", bucket: "31-60 days", balance: "$4.8k", nextAction: "Re-send renewal addendum" },
];
