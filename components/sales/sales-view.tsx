"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { AppShell } from "@/components/ops/app-shell";
import { DetailCard, FilterChips, SectionCard } from "@/components/ops/ui";
import { funnelData, pipelineStages, quoteWinRate, salesReps } from "@/lib/mock-data";

export function SalesView() {
  const [repFilter, setRepFilter] = useState("All reps");
  const visibleReps = useMemo(() => {
    if (repFilter === "All reps") return salesReps;
    return salesReps.filter((rep) => rep.name === repFilter);
  }, [repFilter]);

  return (
    <AppShell
      title="Pipeline, proposals, and sales conversion."
      description="Sales visibility tuned for operators who need to know what will turn into work, not just what is sitting in CRM."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <DetailCard label="Weighted pipeline" value="$147k" note="Strongest in commercial retrofits and renewals." />
        <DetailCard label="Avg quote cycle" value="11 days" note="Speed improved after faster site-visit turnaround." />
        <DetailCard label="Won this month" value="9 deals" note="Mostly service upgrades and HOA service contracts." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.35fr]">
        <SectionCard title="Pipeline" subtitle="Stage value by deal flow" action="Value in $k">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineStages}>
                <CartesianGrid stroke="#d7ddd6" strokeDasharray="3 3" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} stroke="#5c6e61" />
                <YAxis axisLine={false} tickLine={false} stroke="#5c6e61" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7ddd6",
                    backgroundColor: "#fbfcfa",
                  }}
                />
                <Bar dataKey="value" fill="#1f6b4f" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Quote Win Rate" subtitle="Six-month conversion trend" action="Percent won">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={quoteWinRate}>
                <defs>
                  <linearGradient id="winRateFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#1f6b4f" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#1f6b4f" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#d7ddd6" strokeDasharray="3 3" vertical={false} />
                <XAxis axisLine={false} dataKey="month" tickLine={false} stroke="#5c6e61" />
                <YAxis axisLine={false} tickLine={false} stroke="#5c6e61" />
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7ddd6",
                    backgroundColor: "#fbfcfa",
                  }}
                />
                <Area dataKey="rate" type="monotone" stroke="#1f6b4f" strokeWidth={3} fill="url(#winRateFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {funnelData.map((step) => (
          <article className="metric-card" key={step.name}>
            <p className="text-sm text-muted">{step.name}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{step.value}</p>
            <p className="mt-2 text-sm text-muted">Current active count in this stage</p>
          </article>
        ))}
      </section>

      <SectionCard
        title="Rep Drill-Down"
        subtitle="Quotes by owner"
        action={<FilterChips options={["All reps", ...salesReps.map((rep) => rep.name)]} selected={repFilter} onSelect={setRepFilter} />}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {visibleReps.map((rep) => (
            <div className="rounded-2xl border border-line bg-white/80 p-4" key={rep.name}>
              <p className="font-semibold text-ink">{rep.name}</p>
              <p className="mt-3 text-sm text-muted">Open quotes</p>
              <p className="mt-1 text-2xl font-semibold text-ink">{rep.openQuotes}</p>
              <p className="mt-3 text-sm text-muted">Close rate</p>
              <p className="mt-1 text-lg font-semibold text-ink">{rep.closeRate}</p>
              <p className="mt-3 text-sm text-muted">{rep.nextStep}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </AppShell>
  );
}
