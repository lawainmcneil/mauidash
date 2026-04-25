# PoolOps Dashboard MVP UI Build Spec

## Purpose

Build a web application dashboard for a small pool contractor that gives the owner a clear operating view of the business.

The MVP should focus on four core business questions:

1. Are we getting enough qualified leads?
2. Are we selling profitable jobs?
3. Are active projects on schedule?
4. Are cash and receivables healthy?

This MVP is intentionally simple. It uses mock data first, clean UI, and enough structure to connect real data later.

---

# 1. Product Name

**PoolOps Dashboard**

---

# 2. MVP Goal

Create a responsive dashboard web app for a pool contractor with:

- Executive Overview
- Sales Pipeline
- Active Jobs / Production
- Job Profitability
- Cash Flow
- Alerts / Insights

The app should be usable by a business owner, not just a data analyst.

The interface should be clean, direct, mobile-friendly, and focused on decisions.

---

# 3. Recommended Stack

Use this stack unless otherwise directed:

- **Framework:** React, Next.js, or Astro
- **Styling:** Tailwind CSS
- **Charts:** Recharts or Chart.js
- **Icons:** Lucide icons
- **Data:** Local mock data file first
- **Deployment:** Vercel or Cloudflare Pages

---

# 4. Primary User

## Owner / Operator

The owner wants to know:

- How much revenue is coming in?
- Which jobs are delayed?
- Which jobs are losing margin?
- Which lead sources are producing real contracts?
- How much cash is available?
- What must be handled this week?

---

# 5. MVP Pages

The MVP should include one main dashboard page with section tabs or stacked modules.

## Required Views

1. Executive Overview
2. Sales Pipeline
3. Job Profitability
4. Active Jobs
5. Cash Flow
6. Insights / Alerts

For the MVP, all sections may live on one `/dashboard` route.

---

# 6. Global Layout

## Header

Include:

- App name: **PoolOps Dashboard**
- Business name placeholder: **Bluewater Pool Co.**
- Date range selector:
  - This Month
  - Last Month
  - Quarter
  - Year
- Button: **Export Report**
- Button: **Add Job**

## Sidebar or Top Navigation

Navigation items:

- Overview
- Sales
- Jobs
- Profitability
- Cash Flow
- Customers
- Settings

For MVP, navigation links can scroll to sections.

---

# 7. Visual Design Direction

The design should feel:

- Professional
- Light
- Clear
- Operator-focused
- Not overly “techy”

Use:

- White or very light background
- Dark text
- Rounded cards
- Subtle borders
- Soft shadows
- Large KPI numbers
- Clear status labels
- Warning colors for urgent problems

Avoid:

- Clutter
- Tiny charts
- Excessive animation
- Vanity metrics without business meaning

---

# 8. Executive Overview Section

## Purpose

Give the owner a 30-second view of business health.

## KPI Cards

Display these cards in a responsive grid:

1. **Monthly Revenue**
   - Example: `$482,000`
   - Subtext: `+12% from last month`

2. **Gross Margin**
   - Example: `27.4%`
   - Subtext: `Target: 30%`

3. **Active Jobs**
   - Example: `14`
   - Subtext: `5 behind schedule`

4. **Backlog Value**
   - Example: `$1.28M`
   - Subtext: `Next 90 days`

5. **Cash on Hand**
   - Example: `$186,500`
   - Subtext: `2.8 months runway`

6. **Accounts Receivable**
   - Example: `$94,200`
   - Subtext: `$31,400 over 30 days`

7. **New Leads**
   - Example: `87`
   - Subtext: `22 qualified`

8. **Signed Contracts**
   - Example: `9`
   - Subtext: `$674K total value`

## Charts

Add:

- Revenue trend line chart
- Gross margin trend line chart
- Backlog bar chart

---

# 9. Alerts / Insights Panel

## Purpose

Convert raw metrics into useful owner insights.

Display an alerts panel near the top of the dashboard.

## Example Alerts

1. **Margin Warning**
   - “3 active jobs are projected below 20% gross margin.”

2. **Cash Warning**
   - “$31,400 in receivables is more than 30 days old.”

3. **Production Bottleneck**
   - “Electrical subcontractor delays are affecting 4 jobs.”

4. **Sales Insight**
   - “Referral leads closed at 42%, compared with 11% for paid ads.”

5. **Billing Alert**
   - “$58,000 in completed milestones has not yet been invoiced.”

Each alert should have:

- Severity: critical, warning, info
- Short title
- Plain-English explanation
- Suggested action

---

# 10. Sales Pipeline Section

## Purpose

Show where leads are coming from and where they drop off.

## Funnel Metrics

Display a funnel chart or stacked cards:

- Leads: 87
- Qualified Leads: 22
- Consultations Booked: 18
- Proposals Sent: 14
- Contracts Signed: 9

## KPI Cards

- Lead-to-Qualified Rate
- Consultation Booking Rate
- Proposal Close Rate
- Average Contract Value
- Average Sales Cycle
- Cost per Signed Job

## Lead Source Table

Columns:

- Source
- Leads
- Qualified Leads
- Proposals
- Signed Jobs
- Close Rate
- Revenue
- Estimated Gross Profit

Example sources:

- Google Organic
- Google Ads
- Referral
- Facebook
- Yard Signs
- Direct Mail
- Past Client

## Lost Deal Reasons

Display as a bar chart:

- Price too high
- Financing
- Timing
- Competitor
- Not responsive
- Project too small
- Outside service area

---

# 11. Active Jobs / Production Section

## Purpose

Show current jobs by phase and identify stuck work.

## Job Phase Cards

Display jobs grouped by phase:

1. Contract Signed
2. Design
3. Permitting
4. Excavation
5. Plumbing
6. Electrical
7. Shell / Structure
8. Decking
9. Finish
10. Inspection
11. Startup
12. Final Walkthrough

Each job card should include:

- Client name
- Project type
- Contract value
- Current phase
- Days in phase
- Projected completion
- Status:
  - On Track
  - At Risk
  - Delayed

## Production KPIs

- Active Jobs
- Jobs Behind Schedule
- Average Days per Phase
- Inspection Pass Rate
- Open Punch List Items
- Weather Delay Days
- Subcontractor Delay Days

## Delay Reasons

Display a horizontal bar chart:

- Permit delay
- Electrical subcontractor
- Weather
- Material delay
- Customer decision
- Inspection issue
- Crew availability

---

# 12. Job Profitability Section

## Purpose

Reveal margin leakage at the job level.

## Table Columns

- Job
- Client
- Contract Value
- Estimated Cost
- Actual Cost
- Estimated Margin
- Actual Margin
- Margin Variance
- Status

## Status Rules

- Healthy: actual margin >= 28%
- Watch: actual margin 20% to 27.9%
- Critical: actual margin below 20%

## Job Detail Drawer or Modal

When user clicks a job, show:

- Contract Value
- Estimated Cost
- Actual Cost
- Gross Profit
- Gross Margin
- Cost Variance
- Change Orders
- Rework Cost
- Billing Status

## Cost Breakdown

Display a table or chart with categories:

- Labor
- Materials
- Subcontractors
- Equipment
- Permits
- Rework
- Warranty

Each should show:

- Estimated
- Actual
- Variance

## Critical Insight Widget

Example:

> Smith Residence  
> Estimated Margin: 31%  
> Actual Margin: 18%  
> Margin Leakage: $18,700  
> Primary causes: Decking overrun, electrical change, rework.

---

# 13. Cash Flow Section

## Purpose

Show whether the business has enough cash to operate.

## KPI Cards

- Cash on Hand
- Accounts Receivable
- A/R Over 30 Days
- Work in Progress
- Cost to Complete Active Jobs
- Vendor Payables
- Next 30-Day Cash Need

## A/R Aging Table

Columns:

- Client
- Job
- Amount Due
- Due Date
- Days Outstanding
- Status

Buckets:

- Current
- 1–30 days
- 31–60 days
- 61+ days

## Billing Milestone Table

Columns:

- Job
- Milestone
- Amount
- Due
- Invoiced?
- Paid?
- Action Needed

Example milestones:

- Deposit
- Permit Approval
- Excavation
- Shell / Structure
- Decking / Finish
- Final Walkthrough

---

# 14. Customer Experience Section

For MVP, this can be a smaller section.

## KPIs

- Google Rating
- Review Count
- New Reviews This Month
- Referral Rate
- Open Warranty Claims
- Average Response Time

## Complaint Categories

Display a small chart:

- Communication
- Delay
- Cleanup
- Cost confusion
- Warranty
- Finish quality

---

# 15. Mock Data Requirements

Create a file:

`src/data/mockPoolDashboardData.ts`

Include mock data for:

- KPI summary
- Monthly trends
- Sales funnel
- Lead sources
- Jobs
- Job costs
- Cash flow
- Receivables
- Alerts
- Reviews

---

# 16. Mock Data Shape

```ts
export const dashboardSummary = {
  monthlyRevenue: 482000,
  monthlyRevenueChange: 12,
  grossMargin: 27.4,
  grossMarginTarget: 30,
  activeJobs: 14,
  jobsBehindSchedule: 5,
  backlogValue: 1280000,
  cashOnHand: 186500,
  cashRunwayMonths: 2.8,
  accountsReceivable: 94200,
  arOver30: 31400,
  newLeads: 87,
  qualifiedLeads: 22,
  signedContracts: 9,
  signedContractValue: 674000
};
```

```ts
export const salesFunnel = [
  { stage: "Leads", count: 87 },
  { stage: "Qualified", count: 22 },
  { stage: "Consultations", count: 18 },
  { stage: "Proposals", count: 14 },
  { stage: "Signed", count: 9 }
];
```

```ts
export const leadSources = [
  {
    source: "Google Organic",
    leads: 26,
    qualified: 9,
    proposals: 6,
    signed: 4,
    revenue: 328000,
    estimatedGrossProfit: 98400
  },
  {
    source: "Google Ads",
    leads: 31,
    qualified: 5,
    proposals: 4,
    signed: 1,
    revenue: 72000,
    estimatedGrossProfit: 14400
  },
  {
    source: "Referral",
    leads: 12,
    qualified: 8,
    proposals: 6,
    signed: 4,
    revenue: 274000,
    estimatedGrossProfit: 89000
  }
];
```

```ts
export const jobs = [
  {
    id: "job_001",
    client: "Smith Residence",
    projectType: "Gunite Pool",
    phase: "Decking",
    contractValue: 148000,
    estimatedCost: 102000,
    actualCost: 121300,
    projectedCompletion: "2026-05-18",
    daysInPhase: 11,
    status: "Critical",
    delayReason: "Decking overrun"
  },
  {
    id: "job_002",
    client: "Johnson Residence",
    projectType: "Fiberglass Pool",
    phase: "Electrical",
    contractValue: 92000,
    estimatedCost: 67000,
    actualCost: 66200,
    projectedCompletion: "2026-05-09",
    daysInPhase: 4,
    status: "On Track",
    delayReason: null
  }
];
```

---

# 17. Core UI Components

Build reusable components:

## Layout Components

- `DashboardLayout`
- `Sidebar`
- `TopBar`
- `SectionHeader`

## KPI Components

- `KpiCard`
- `MetricTrend`
- `StatusBadge`
- `AlertCard`

## Chart Components

- `RevenueTrendChart`
- `MarginTrendChart`
- `SalesFunnelChart`
- `LeadSourceBarChart`
- `DelayReasonChart`
- `CashTrendChart`

## Table Components

- `LeadSourceTable`
- `JobProfitabilityTable`
- `ReceivablesTable`
- `BillingMilestoneTable`

## Job Components

- `JobPhaseBoard`
- `JobCard`
- `JobDetailDrawer`

---

# 18. Suggested Routes

For MVP:

```txt
/
 redirects to /dashboard

/dashboard
 main dashboard page
```

For future:

```txt
/dashboard/sales
/dashboard/jobs
/dashboard/profitability
/dashboard/cash-flow
/dashboard/customers
/settings
```

---

# 19. Component Behavior

## KPI Card

Props:

```ts
type KpiCardProps = {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: number;
  status?: "healthy" | "warning" | "critical" | "neutral";
};
```

Behavior:

- Show green trend for positive movement
- Show red trend for negative movement
- Use warning status if below target

## Status Badge

Rules:

- On Track = green
- At Risk = yellow
- Delayed = red
- Critical = red
- Watch = yellow
- Healthy = green

## Alert Card

Props:

```ts
type AlertCardProps = {
  severity: "critical" | "warning" | "info";
  title: string;
  message: string;
  action: string;
};
```

---

# 20. Calculations

Create utility file:

`src/lib/calculations.ts`

Include:

```ts
export function grossProfit(revenue: number, actualCost: number) {
  return revenue - actualCost;
}

export function grossMargin(revenue: number, actualCost: number) {
  if (revenue === 0) return 0;
  return ((revenue - actualCost) / revenue) * 100;
}

export function costVariance(estimatedCost: number, actualCost: number) {
  return estimatedCost - actualCost;
}

export function closeRate(signed: number, proposals: number) {
  if (proposals === 0) return 0;
  return (signed / proposals) * 100;
}

export function leadQualificationRate(qualified: number, leads: number) {
  if (leads === 0) return 0;
  return (qualified / leads) * 100;
}

export function costPerSignedJob(spend: number, signedJobs: number) {
  if (signedJobs === 0) return 0;
  return spend / signedJobs;
}
```

---

# 21. MVP Acceptance Criteria

The MVP is complete when:

- Dashboard loads successfully
- KPI cards display mock data
- Charts render correctly
- Sales funnel displays conversion stages
- Lead source table displays source performance
- Active jobs display by status or phase
- Job profitability table calculates margin
- Cash flow section displays A/R and billing data
- Alerts panel displays business insights
- UI is responsive on desktop and mobile
- No dead navigation links
- Code is organized into reusable components

---

# 22. Visual Layout Order

The dashboard should render in this order:

1. Header / Top Bar
2. Executive KPI Cards
3. Alerts / Insights Panel
4. Revenue + Margin Charts
5. Sales Pipeline Section
6. Active Jobs Section
7. Job Profitability Section
8. Cash Flow Section
9. Customer Experience Section

---

# 23. Codex Build Prompt

Use this prompt in Codex:

```txt
Build a responsive MVP web application dashboard called PoolOps Dashboard using the attached Markdown specification.

Use React or Next.js with Tailwind CSS and Recharts. Create clean reusable components, local mock data, KPI cards, charts, tables, alerts, and job status sections.

Focus on the /dashboard page first. Use mock data only. Do not connect external APIs yet.

The dashboard should include:
- Executive overview KPI cards
- Alerts / insights panel
- Revenue and gross margin charts
- Sales funnel
- Lead source performance table
- Active jobs / production section
- Job profitability table with gross margin calculations
- Cash flow and receivables section
- Customer experience summary

Keep the UI clean, modern, professional, and mobile-responsive. The primary user is the owner of a small pool contractor business. The goal is to show where money is leaking, where jobs are stuck, and where cash is trapped.
```

---

# 24. Suggested File Structure

```txt
src/
  app/
    dashboard/
      page.tsx
  components/
    layout/
      DashboardLayout.tsx
      Sidebar.tsx
      TopBar.tsx
    dashboard/
      KpiCard.tsx
      AlertCard.tsx
      RevenueTrendChart.tsx
      MarginTrendChart.tsx
      SalesFunnelChart.tsx
      LeadSourceTable.tsx
      JobPhaseBoard.tsx
      JobProfitabilityTable.tsx
      ReceivablesTable.tsx
      CashFlowSummary.tsx
      CustomerExperienceSummary.tsx
  data/
    mockPoolDashboardData.ts
  lib/
    calculations.ts
    formatters.ts
```

---

# 25. Future Enhancements

After MVP:

1. Add authentication
2. Add QuickBooks integration
3. Add CRM integration
4. Add Google Ads and Google Business Profile data
5. Add job detail pages
6. Add production calendar
7. Add proposal pipeline
8. Add PDF reporting
9. Add role-based permissions
10. Add AI-generated weekly owner insights

---

# 26. Strategic Product Note

The dashboard should avoid vanity metrics.

The owner does not need “more data.”

The owner needs operational truth:

- Which jobs are profitable?
- Which jobs are stuck?
- Which leads are worth buying?
- Which invoices need attention?
- Which parts of the business are quietly breaking?

This product should be built as a decision system, not a reporting toy.
