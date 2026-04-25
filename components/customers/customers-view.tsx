"use client";

import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { AppShell } from "@/components/ops/app-shell";
import { DetailCard, FilterChips, SectionCard, SelectionPanel, StatusPill } from "@/components/ops/ui";
import { customerSegments, customers } from "@/lib/mock-data";

const colors = ["#1f6b4f", "#d68b2f", "#6d8bb5"];

export function CustomersView() {
  const [healthFilter, setHealthFilter] = useState("All");
  const filteredCustomers = useMemo(() => {
    if (healthFilter === "All") return customers;
    return customers.filter((customer) => customer.health === healthFilter);
  }, [healthFilter]);
  const [selectedCustomerName, setSelectedCustomerName] = useState(customers[0].name);
  const selectedCustomer = useMemo(
    () => filteredCustomers.find((customer) => customer.name === selectedCustomerName) ?? filteredCustomers[0] ?? customers[0],
    [filteredCustomers, selectedCustomerName]
  );

  return (
    <AppShell
      title="Customer health, contracts, and account mix."
      description="A fast account-level view for renewals, service mix, and which customers need attention."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <DetailCard label="Renewals due" value="3 accounts" note="Two HOA contracts and one commercial renewal this month." />
        <DetailCard label="At-risk revenue" value="$9.9k MRR" note="Concentrated in one apartment account and one seasonal customer." />
        <DetailCard label="Avg tenure" value="3.7 yrs" note="Commercial base remains stable and sticky." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.4fr]">
        <SectionCard title="Segments" subtitle="Customer mix">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={customerSegments} dataKey="value" nameKey="name" innerRadius={60} outerRadius={96}>
                  {customerSegments.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "1px solid #d7ddd6",
                    backgroundColor: "#fbfcfa",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {customerSegments.map((segment, index) => (
              <div className="rounded-2xl border border-line bg-white/80 p-4" key={segment.name}>
                <div className="h-2 w-10 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                <p className="mt-3 text-sm text-muted">{segment.name}</p>
                <p className="mt-2 text-2xl font-semibold text-ink">{segment.value}%</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Accounts"
          subtitle="Top accounts and renewals"
          action={<FilterChips options={["All", "Healthy", "Watch", "At risk", "Renewal"]} selected={healthFilter} onSelect={setHealthFilter} />}
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted">
                  <th className="pb-2 font-medium">Account</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Contract</th>
                  <th className="pb-2 font-medium">MRR</th>
                  <th className="pb-2 font-medium">Health</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    className={`cursor-pointer rounded-2xl transition ${
                      customer.name === selectedCustomer.name ? "bg-accentSoft/70" : "bg-white/80 hover:bg-white"
                    }`}
                    key={customer.name}
                    onClick={() => setSelectedCustomerName(customer.name)}
                  >
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-ink">{customer.name}</td>
                    <td className="px-4 py-4 text-sm text-muted">{customer.type}</td>
                    <td className="px-4 py-4 text-sm text-muted">{customer.contract}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-ink">{customer.mrr}</td>
                    <td className="rounded-r-2xl px-4 py-4 text-sm"><StatusPill label={customer.health} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 md:hidden">
            {filteredCustomers.map((customer) => (
              <button
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  customer.name === selectedCustomer.name ? "border-accent/30 bg-accentSoft/60" : "border-line bg-white/80"
                }`}
                key={customer.name}
                type="button"
                onClick={() => setSelectedCustomerName(customer.name)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{customer.name}</p>
                    <p className="mt-1 text-sm text-muted">{customer.type}</p>
                  </div>
                  <StatusPill label={customer.health} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-muted">
                  <span>Contract: {customer.contract}</span>
                  <span>MRR: {customer.mrr}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4">
            <SelectionPanel
              title={selectedCustomer.name}
              subtitle="Account detail"
              items={[
                { label: "Type", value: selectedCustomer.type },
                { label: "Contract", value: selectedCustomer.contract },
                { label: "MRR", value: selectedCustomer.mrr },
                { label: "Health", value: selectedCustomer.health },
                { label: "Owner note", value: selectedCustomer.health === "At risk" ? "Needs service recovery and billing reset" : "Relationship is steady with normal engagement cadence" },
                { label: "Next action", value: selectedCustomer.health === "Renewal" ? "Finalize renewal quote and board approval" : "Maintain scheduled service and check-in rhythm" },
              ]}
            />
          </div>
        </SectionCard>
      </section>
    </AppShell>
  );
}
