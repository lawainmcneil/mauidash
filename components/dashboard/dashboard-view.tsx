"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Funnel,
  FunnelChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/ops/app-shell";
import { DetailCard, FilterChips, MetricGrid, SectionCard, SelectionPanel, StatusPill } from "@/components/ops/ui";
import { alerts, cashFlowData, dashboardKpis, funnelData, jobs, revenueMarginData } from "@/lib/mock-data";

const alertToneMap: Record<string, string> = {
  danger: "border-danger/20 bg-dangerSoft text-danger",
  warn: "border-warn/20 bg-warnSoft text-warn",
  good: "border-accent/20 bg-accentSoft text-accent",
};

export function DashboardView() {
  const [jobFilter, setJobFilter] = useState("All");
  const visibleJobs = useMemo(() => {
    if (jobFilter === "All") return jobs.slice(0, 5);
    return jobs.filter((job) => job.status === jobFilter).slice(0, 5);
  }, [jobFilter]);
  const [selectedJobKey, setSelectedJobKey] = useState(`${jobs[0].customer}-${jobs[0].service}`);
  const selectedJob = useMemo(
    () => visibleJobs.find((job) => `${job.customer}-${job.service}` === selectedJobKey) ?? visibleJobs[0] ?? jobs[0],
    [visibleJobs, selectedJobKey]
  );

  return (
    <AppShell
      title="Daily operating pulse for field ops, sales, and cash."
      description="Mock dashboard focused on what an operator needs first: revenue quality, route pressure, sales conversion, job movement, and cash position."
    >
      <MetricGrid items={dashboardKpis} />

      <section className="grid gap-4 md:grid-cols-3">
        <DetailCard label="Route pressure" value="Northwest" note="Lowest staffing coverage and most likely to slip tomorrow." />
        <DetailCard label="Best signal" value="Margin rising" note="Higher quality jobs are landing without adding overhead." />
        <DetailCard label="Operator watch" value="AR follow-up" note="Collections is the main blocker to near-term flexibility." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <SectionCard title="Revenue + Margin" subtitle="Eight-week trend" action="Revenue in $k, margin in %">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueMarginData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#1f6b4f" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#1f6b4f" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="marginFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#d68b2f" stopOpacity={0.24} />
                    <stop offset="95%" stopColor="#d68b2f" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#d7ddd6" strokeDasharray="3 3" vertical={false} />
                <XAxis axisLine={false} dataKey="week" tickLine={false} stroke="#5c6e61" />
                <YAxis axisLine={false} tickLine={false} stroke="#5c6e61" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7ddd6",
                    backgroundColor: "#fbfcfa",
                  }}
                />
                <Area dataKey="revenue" fill="url(#revenueFill)" fillOpacity={1} stroke="#1f6b4f" strokeWidth={3} type="monotone" />
                <Area dataKey="margin" fill="url(#marginFill)" fillOpacity={1} stroke="#d68b2f" strokeWidth={3} type="monotone" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Alerts" subtitle="Attention required">
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div className={`rounded-2xl border p-4 ${alertToneMap[alert.tone]}`} key={alert.title}>
                <p className="font-semibold">{alert.title}</p>
                <p className="mt-1 text-sm opacity-90">{alert.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr]">
        <SectionCard title="Sales Funnel" subtitle="Lead conversion">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7ddd6",
                    backgroundColor: "#fbfcfa",
                  }}
                />
                <Funnel data={funnelData} dataKey="value" isAnimationActive fill="#1f6b4f" stroke="#f5f7f4" />
              </FunnelChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {funnelData.map((step) => (
              <div className="rounded-2xl border border-line bg-white/80 p-4" key={step.name}>
                <p className="text-sm text-muted">{step.name}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">{step.value}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Jobs"
          subtitle="Active work queue"
          action={<FilterChips options={["All", "Scheduled", "In progress", "Needs tech", "At risk"]} selected={jobFilter} onSelect={setJobFilter} />}
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Tech</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {visibleJobs.map((job) => (
                  <tr
                    className={`cursor-pointer rounded-2xl transition ${
                      `${job.customer}-${job.service}` === `${selectedJob.customer}-${selectedJob.service}`
                        ? "bg-accentSoft/70"
                        : "bg-white/80 hover:bg-white"
                    }`}
                    key={`${job.customer}-${job.service}`}
                    onClick={() => setSelectedJobKey(`${job.customer}-${job.service}`)}
                  >
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-ink">{job.customer}</td>
                    <td className="px-4 py-4 text-sm text-muted">{job.service}</td>
                    <td className="px-4 py-4 text-sm text-muted">{job.tech}</td>
                    <td className="px-4 py-4 text-sm"><StatusPill label={job.status} /></td>
                    <td className="rounded-r-2xl px-4 py-4 text-sm font-semibold text-ink">{job.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 md:hidden">
            {visibleJobs.map((job) => (
              <button
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  `${job.customer}-${job.service}` === `${selectedJob.customer}-${selectedJob.service}`
                    ? "border-accent/30 bg-accentSoft/60"
                    : "border-line bg-white/80"
                }`}
                key={`${job.customer}-${job.service}`}
                type="button"
                onClick={() => setSelectedJobKey(`${job.customer}-${job.service}`)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{job.customer}</p>
                    <p className="mt-1 text-sm text-muted">{job.service}</p>
                  </div>
                  <StatusPill label={job.status} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-muted">
                  <span>Tech: {job.tech}</span>
                  <span>Value: {job.amount}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <SelectionPanel
              title={selectedJob.customer}
              subtitle="Selected queue item"
              items={[
                { label: "Service", value: selectedJob.service },
                { label: "Tech", value: selectedJob.tech },
                { label: "Route", value: selectedJob.route },
                { label: "Due", value: selectedJob.due },
                { label: "Status", value: selectedJob.status },
                { label: "Action", value: selectedJob.status === "Needs tech" ? "Dispatch coverage immediately" : "Keep field team on planned sequence" },
              ]}
            />
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <SectionCard title="Cash Flow" subtitle="This week movement" action="Net positive with payroll cleared">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData}>
                <CartesianGrid stroke="#d7ddd6" strokeDasharray="3 3" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} stroke="#5c6e61" />
                <YAxis axisLine={false} tickLine={false} stroke="#5c6e61" />
                <Tooltip
                  formatter={(value: number) => [`$${Math.abs(value)}k`, "Amount"]}
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7ddd6",
                    backgroundColor: "#fbfcfa",
                  }}
                />
                <Bar dataKey="value" radius={[12, 12, 0, 0]} fill="#1f6b4f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Cash Notes" subtitle="Near-term posture">
          <div className="space-y-4">
            <div className="rounded-2xl border border-line bg-white/80 p-4">
              <p className="text-sm text-muted">Expected inflow next 7 days</p>
              <p className="mt-2 text-2xl font-semibold text-ink">$41.5k</p>
            </div>
            <div className="rounded-2xl border border-line bg-white/80 p-4">
              <p className="text-sm text-muted">Largest payable due</p>
              <p className="mt-2 text-2xl font-semibold text-ink">$12.8k</p>
              <p className="mt-1 text-sm text-muted">Chemical supplier on Thursday</p>
            </div>
            <div className="rounded-2xl border border-accent/20 bg-accentSoft p-4 text-accent">
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">Operator note</p>
              <p className="mt-2 text-sm leading-6">
                Collections are supporting payroll, but AR pressure is the main constraint. Tighten follow-up before adding route capacity.
              </p>
            </div>
          </div>
        </SectionCard>
      </section>
    </AppShell>
  );
}
