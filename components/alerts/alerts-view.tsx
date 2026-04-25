"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/ops/app-shell";
import { useOpsState } from "@/components/ops/ops-state";
import { ActionButton, DetailCard, FilterChips, SectionCard, SelectionPanel, SlideOver, StatusPill } from "@/components/ops/ui";
import { alertQueue, alerts } from "@/lib/mock-data";

const toneMap: Record<string, string> = {
  danger: "border-danger/20 bg-dangerSoft text-danger",
  warn: "border-warn/20 bg-warnSoft text-warn",
  good: "border-accent/20 bg-accentSoft text-accent",
};

export function AlertsView() {
  const { addActivity, pushToast } = useOpsState();
  const [queue, setQueue] = useState(alertQueue);
  const [severityFilter, setSeverityFilter] = useState("All");
  const visibleQueue = useMemo(() => {
    if (severityFilter === "All") return queue;
    return queue.filter((item) => item.severity === severityFilter);
  }, [queue, severityFilter]);
  const [selectedTitle, setSelectedTitle] = useState(alertQueue[0].title);
  const selectedAlert = useMemo(
    () => visibleQueue.find((item) => item.title === selectedTitle) ?? visibleQueue[0] ?? queue[0] ?? null,
    [visibleQueue, selectedTitle]
  );
  const [draftOwner, setDraftOwner] = useState(alertQueue[0].owner);
  const [alertMessage, setAlertMessage] = useState("Resolve or reassign items here with mock local state.");
  const [createOpen, setCreateOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: "",
    owner: "Ops",
    due: "Tomorrow",
    severity: "Medium",
  });

  useEffect(() => {
    if (!selectedAlert) return;
    setDraftOwner(selectedAlert.owner);
  }, [selectedAlert]);

  function saveAlertOwner() {
    if (!selectedAlert) return;
    setQueue((current) =>
      current.map((item) => (item.title === selectedAlert.title ? { ...item, owner: draftOwner } : item))
    );
    const message = `Reassigned ${selectedAlert.title} to ${draftOwner}.`;
    setAlertMessage(message);
    pushToast(message);
    addActivity({
      title: "Alert reassigned",
      detail: `${selectedAlert.title} now belongs to ${draftOwner}.`,
      tone: "neutral",
    });
  }

  function resolveAlert() {
    if (!selectedAlert) return;
    const nextQueue = queue.filter((item) => item.title !== selectedAlert.title);
    setQueue(nextQueue);
    setSelectedTitle(nextQueue[0]?.title ?? "");
    const message = `Resolved ${selectedAlert.title}.`;
    setAlertMessage(message);
    pushToast(message);
    addActivity({
      title: "Alert resolved",
      detail: `${selectedAlert.title} was cleared from the active queue.`,
      tone: "good",
    });
  }

  return (
    <AppShell
      title="Exceptions, follow-up, and what needs action."
      description="A focused queue for the issues that interrupt smooth operations across dispatch, finance, and sales."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <DetailCard label="Open high-priority items" value="2" note="Both need action today to protect service and cash." />
        <DetailCard label="Avg response time" value="47 min" note="Ops and dispatch are responding fastest this week." />
        <DetailCard label="Resolved in 24 hrs" value="78%" note="Main misses are cross-team handoffs." />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <SectionCard title="Signal" subtitle="Top alerts right now">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div className={`rounded-2xl border p-4 ${toneMap[alert.tone]}`} key={alert.title}>
                <p className="font-semibold">{alert.title}</p>
                <p className="mt-1 text-sm opacity-90">{alert.detail}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Action Queue"
          subtitle="Owners and due dates"
          action={
            <div className="flex flex-wrap items-center justify-end gap-2">
              <FilterChips options={["All", "High", "Medium", "Low"]} selected={severityFilter} onSelect={setSeverityFilter} />
              <ActionButton onClick={() => setCreateOpen(true)}>New alert</ActionButton>
            </div>
          }
        >
          <div className="space-y-3">
            {visibleQueue.length === 0 ? (
              <div className="rounded-2xl border border-line bg-white/80 p-4 text-sm text-muted">
                No alerts match this filter.
              </div>
            ) : null}
            {visibleQueue.map((item) => (
              <button
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  item.title === selectedAlert?.title ? "border-accent/30 bg-accentSoft/60" : "border-line bg-white/80"
                }`}
                key={item.title}
                type="button"
                onClick={() => setSelectedTitle(item.title)}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      Owner: {item.owner} · Due: {item.due}
                    </p>
                  </div>
                  <StatusPill label={item.severity} />
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4">
            {selectedAlert ? (
              <SelectionPanel
                title={selectedAlert.title}
                subtitle="Selected action detail"
                items={[
                  { label: "Owner", value: selectedAlert.owner },
                  { label: "Due", value: selectedAlert.due },
                  { label: "Severity", value: selectedAlert.severity },
                  { label: "Context", value: selectedAlert.severity === "High" ? "Blocking smooth service or cash flow" : "Important but not yet breaking flow" },
                  { label: "Next move", value: "Confirm owner handoff and close the loop before end of day" },
                  { label: "Escalation", value: selectedAlert.severity === "High" ? "Escalate if not moving by noon" : "Review in next standup" },
                ]}
                footer={
                  <div className="space-y-4">
                    <label className="block text-sm text-muted">
                      Reassign owner
                      <select
                        className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                        value={draftOwner}
                        onChange={(event) => setDraftOwner(event.target.value)}
                      >
                        {["Dispatch", "Finance", "Sales", "Ops"].map((owner) => (
                          <option key={owner} value={owner}>
                            {owner}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <ActionButton onClick={saveAlertOwner}>Save reassignment</ActionButton>
                      <ActionButton tone="secondary" onClick={resolveAlert}>
                        Mark resolved
                      </ActionButton>
                    </div>
                    <p className="text-sm text-muted">{alertMessage}</p>
                  </div>
                }
              />
            ) : (
              <div className="rounded-2xl border border-line bg-[#f7faf6] p-4 text-sm text-muted">
                No active alert selected. Switch filters or leave one unresolved to keep editing.
              </div>
            )}
          </div>
        </SectionCard>
      </section>
      <SlideOver
        open={createOpen}
        title="New Alert"
        subtitle="Create a mock operational alert and add it directly to the active queue."
        onClose={() => setCreateOpen(false)}
      >
        <div className="space-y-4">
          <label className="block text-sm text-muted">
            Alert title
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
              value={newAlert.title}
              onChange={(event) => setNewAlert((current) => ({ ...current, title: event.target.value }))}
              placeholder="Describe the issue"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-muted">
              Owner
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newAlert.owner}
                onChange={(event) => setNewAlert((current) => ({ ...current, owner: event.target.value }))}
              >
                {["Dispatch", "Finance", "Sales", "Ops"].map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Due
              <input
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newAlert.due}
                onChange={(event) => setNewAlert((current) => ({ ...current, due: event.target.value }))}
              />
            </label>
            <label className="block text-sm text-muted sm:col-span-2">
              Severity
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newAlert.severity}
                onChange={(event) => setNewAlert((current) => ({ ...current, severity: event.target.value }))}
              >
                {["High", "Medium", "Low"].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton
              onClick={() => {
                if (!newAlert.title.trim()) return;
                const created = { ...newAlert, title: newAlert.title.trim() };
                setQueue((current) => [created, ...current]);
                setSelectedTitle(created.title);
                setCreateOpen(false);
                setNewAlert({ title: "", owner: "Ops", due: "Tomorrow", severity: "Medium" });
                const message = `Created alert: ${created.title}.`;
                setAlertMessage(message);
                pushToast(message);
                addActivity({
                  title: "Alert created",
                  detail: `${created.title} was assigned to ${created.owner} with ${created.severity.toLowerCase()} severity.`,
                  tone: created.severity === "High" ? "warn" : "neutral",
                });
              }}
            >
              Create alert
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
