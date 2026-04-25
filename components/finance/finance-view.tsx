"use client";

import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell } from "@/components/ops/app-shell";
import { useOpsState } from "@/components/ops/ops-state";
import { ActionButton, DetailCard, FilterChips, MetricGrid, SectionCard, SelectionPanel, SlideOver } from "@/components/ops/ui";
import { cashFlowData, collectionQueue, financeKpis, marginBreakdown } from "@/lib/mock-data";

export function FinanceView() {
  const { addActivity, pushToast } = useOpsState();
  const [collections, setCollections] = useState(collectionQueue);
  const [collectionFilter, setCollectionFilter] = useState("All");
  const visibleCollections = useMemo(() => {
    if (collectionFilter === "All") return collections;
    return collections.filter((item) => item.bucket === collectionFilter);
  }, [collectionFilter, collections]);
  const [selectedAccount, setSelectedAccount] = useState(collectionQueue[0].account);
  const selectedCollection = useMemo(
    () => visibleCollections.find((item) => item.account === selectedAccount) ?? visibleCollections[0] ?? collections[0] ?? null,
    [visibleCollections, selectedAccount]
  );
  const [draftAction, setDraftAction] = useState(collectionQueue[0].nextAction);
  const [collectionMessage, setCollectionMessage] = useState("Use these controls to simulate collections follow-up.");
  const [createOpen, setCreateOpen] = useState(false);
  const [newFollowUp, setNewFollowUp] = useState({
    account: "",
    bucket: "1-30 days",
    balance: "$1.8k",
    nextAction: "Call AP contact",
  });

  useEffect(() => {
    if (!selectedCollection) return;
    setDraftAction(selectedCollection.nextAction);
  }, [selectedCollection]);

  function saveCollectionAction() {
    if (!selectedCollection) return;
    setCollections((current) =>
      current.map((item) =>
        item.account === selectedCollection.account ? { ...item, nextAction: draftAction } : item
      )
    );
    const message = `Updated next step for ${selectedCollection.account}.`;
    setCollectionMessage(message);
    pushToast(message);
    addActivity({
      title: "Collections note updated",
      detail: `${selectedCollection.account} now shows "${draftAction}".`,
      tone: "neutral",
    });
  }

  function markPromiseToPay() {
    if (!selectedCollection) return;
    setCollections((current) =>
      current.map((item) =>
        item.account === selectedCollection.account
          ? { ...item, bucket: "1-30 days", nextAction: "Confirmed promise to pay" }
          : item
      )
    );
    const message = `Logged promise to pay for ${selectedCollection.account}.`;
    setCollectionMessage(message);
    pushToast(message);
    addActivity({
      title: "Promise to pay logged",
      detail: `${selectedCollection.account} moved into 1-30 days with a confirmed payment promise.`,
      tone: "good",
    });
  }

  return (
    <AppShell
      title="Cash, margin, and collections posture."
      description="Finance summarized for operating decisions: what is coming in, what is leaking out, and where margin needs attention."
    >
      <MetricGrid items={financeKpis} />

      <section className="grid gap-4 md:grid-cols-3">
        <DetailCard label="Expected receipts" value="$41.5k" note="Heaviest deposit day is Thursday after commercial ACH batch." />
        <DetailCard label="Cash runway" value="19 days" note="Safe for now, but collections need to stay tight." />
        <DetailCard label="Largest drag" value="Payroll" note="Crew hours rose with repair work and overtime coverage." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <SectionCard title="Cash Flow" subtitle="Weekly movement" action="All figures in $k">
          <div className="h-80">
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
                <Bar dataKey="value" fill="#1f6b4f" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Margin" subtitle="By revenue stream">
          <div className="space-y-3">
            {marginBreakdown.map((item) => (
              <div className="rounded-2xl border border-line bg-white/80 p-4" key={item.name}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="text-sm text-muted">{item.margin}% margin</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#edf1ec]">
                  <div className="h-2 rounded-full bg-accent" style={{ width: `${item.margin}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Collections"
        subtitle="Accounts requiring follow-up"
        action={
          <div className="flex flex-wrap items-center justify-end gap-2">
            <FilterChips options={["All", "1-30 days", "31-60 days"]} selected={collectionFilter} onSelect={setCollectionFilter} />
            <ActionButton onClick={() => setCreateOpen(true)}>New follow-up</ActionButton>
          </div>
        }
      >
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted">
                <th className="pb-2 font-medium">Account</th>
                <th className="pb-2 font-medium">Bucket</th>
                <th className="pb-2 font-medium">Balance</th>
                <th className="pb-2 font-medium">Next action</th>
              </tr>
            </thead>
            <tbody>
              {visibleCollections.length === 0 ? (
                <tr>
                  <td className="rounded-2xl bg-white/80 px-4 py-6 text-sm text-muted" colSpan={4}>
                    No accounts match this aging bucket.
                  </td>
                </tr>
              ) : null}
              {visibleCollections.map((item) => (
                <tr
                  className={`cursor-pointer rounded-2xl transition ${
                    item.account === selectedCollection?.account ? "bg-accentSoft/70" : "bg-white/80 hover:bg-white"
                  }`}
                  key={item.account}
                  onClick={() => setSelectedAccount(item.account)}
                >
                  <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-ink">{item.account}</td>
                  <td className="px-4 py-4 text-sm text-muted">{item.bucket}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-ink">{item.balance}</td>
                  <td className="rounded-r-2xl px-4 py-4 text-sm text-muted">{item.nextAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="space-y-3 md:hidden">
          {visibleCollections.map((item) => (
            <button
              className={`w-full rounded-2xl border p-4 text-left transition ${
                item.account === selectedCollection?.account ? "border-accent/30 bg-accentSoft/60" : "border-line bg-white/80"
              }`}
              key={item.account}
              type="button"
              onClick={() => setSelectedAccount(item.account)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink">{item.account}</p>
                  <p className="mt-1 text-sm text-muted">{item.bucket}</p>
                </div>
                <p className="text-sm font-semibold text-ink">{item.balance}</p>
              </div>
              <p className="mt-3 text-sm text-muted">Next action: {item.nextAction}</p>
            </button>
          ))}
          {visibleCollections.length === 0 ? <div className="rounded-2xl border border-line bg-white/80 p-4 text-sm text-muted">No accounts match this aging bucket.</div> : null}
        </div>
        <div className="mt-4">
          {selectedCollection ? (
            <SelectionPanel
              title={selectedCollection.account}
              subtitle="Collections follow-up"
              items={[
                { label: "Aging bucket", value: selectedCollection.bucket },
                { label: "Balance", value: selectedCollection.balance },
                { label: "Next action", value: selectedCollection.nextAction },
                { label: "Owner", value: "Finance" },
                { label: "Risk", value: selectedCollection.bucket === "31-60 days" ? "Escalating" : "Monitor closely" },
                { label: "Recommended move", value: "Make contact today and lock in payment timing" },
              ]}
              footer={
                <div className="space-y-4">
                  <label className="block text-sm text-muted">
                    Update next action
                    <input
                      className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                      value={draftAction}
                      onChange={(event) => setDraftAction(event.target.value)}
                    />
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <ActionButton onClick={saveCollectionAction}>Save note</ActionButton>
                    <ActionButton tone="secondary" onClick={markPromiseToPay}>
                      Log promise to pay
                    </ActionButton>
                  </div>
                  <p className="text-sm text-muted">{collectionMessage}</p>
                </div>
              }
            />
          ) : (
            <div className="rounded-2xl border border-line bg-[#f7faf6] p-4 text-sm text-muted">
              No collection item selected. Change the bucket filter to continue editing.
            </div>
          )}
        </div>
      </SectionCard>
      <SlideOver
        open={createOpen}
        title="New Follow-Up"
        subtitle="Add a mock collections follow-up to the queue and start working it immediately."
        onClose={() => setCreateOpen(false)}
      >
        <div className="space-y-4">
          <label className="block text-sm text-muted">
            Account
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
              value={newFollowUp.account}
              onChange={(event) => setNewFollowUp((current) => ({ ...current, account: event.target.value }))}
              placeholder="Add account name"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-muted">
              Aging bucket
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newFollowUp.bucket}
                onChange={(event) => setNewFollowUp((current) => ({ ...current, bucket: event.target.value }))}
              >
                {["1-30 days", "31-60 days"].map((bucket) => (
                  <option key={bucket} value={bucket}>
                    {bucket}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Balance
              <input
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newFollowUp.balance}
                onChange={(event) => setNewFollowUp((current) => ({ ...current, balance: event.target.value }))}
              />
            </label>
            <label className="block text-sm text-muted sm:col-span-2">
              Next action
              <input
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newFollowUp.nextAction}
                onChange={(event) => setNewFollowUp((current) => ({ ...current, nextAction: event.target.value }))}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton
              onClick={() => {
                if (!newFollowUp.account.trim()) return;
                const created = { ...newFollowUp, account: newFollowUp.account.trim() };
                setCollections((current) => [created, ...current]);
                setSelectedAccount(created.account);
                setCreateOpen(false);
                setNewFollowUp({
                  account: "",
                  bucket: "1-30 days",
                  balance: "$1.8k",
                  nextAction: "Call AP contact",
                });
                const message = `Created follow-up for ${created.account}.`;
                setCollectionMessage(message);
                pushToast(message);
                addActivity({
                  title: "Collections follow-up created",
                  detail: `${created.account} was added to ${created.bucket} with ${created.nextAction.toLowerCase()}.`,
                  tone: created.bucket === "31-60 days" ? "warn" : "neutral",
                });
              }}
            >
              Create follow-up
            </ActionButton>
            <ActionButton tone="secondary" onClick={() => setCreateOpen(false)}>
              Cancel
            </ActionButton>
          </div>
        </div>
      </SlideOver>
    </AppShell>
  );
}
