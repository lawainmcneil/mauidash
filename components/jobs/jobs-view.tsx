"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/ops/app-shell";
import { useOpsState } from "@/components/ops/ops-state";
import { ActionButton, DetailCard, FilterChips, SectionCard, SelectionPanel, SlideOver, StatusPill } from "@/components/ops/ui";
import { jobs, routeBoard } from "@/lib/mock-data";

const techOptions = ["Maria R.", "Derek L.", "Kara S.", "Jon P.", "Evan T.", "Unassigned"];
const statusOptions = ["Scheduled", "In progress", "Needs tech", "Completed", "At risk"];

export function JobsView() {
  const { addActivity, pushToast } = useOpsState();
  const [jobRows, setJobRows] = useState(jobs);
  const [statusFilter, setStatusFilter] = useState("All");
  const filteredJobs = useMemo(() => {
    if (statusFilter === "All") return jobRows;
    return jobRows.filter((job) => job.status === statusFilter);
  }, [jobRows, statusFilter]);
  const [selectedJobKey, setSelectedJobKey] = useState(`${jobs[0].customer}-${jobs[0].service}`);
  const selectedJob = useMemo(
    () => filteredJobs.find((job) => `${job.customer}-${job.service}` === selectedJobKey) ?? filteredJobs[0] ?? jobRows[0] ?? null,
    [filteredJobs, selectedJobKey]
  );
  const [draftTech, setDraftTech] = useState(jobs[0].tech);
  const [draftStatus, setDraftStatus] = useState(jobs[0].status);
  const [jobMessage, setJobMessage] = useState("Mock changes stay local to this page.");
  const [createOpen, setCreateOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    customer: "",
    service: "Weekly service",
    route: "Central",
    tech: "Unassigned",
    due: "Friday, 10:00 AM",
    amount: "$950",
    status: "Needs tech",
  });

  useEffect(() => {
    if (!selectedJob) return;
    setDraftTech(selectedJob.tech);
    setDraftStatus(selectedJob.status);
  }, [selectedJob]);

  function saveJobChanges() {
    if (!selectedJob) return;
    const selectedKey = `${selectedJob.customer}-${selectedJob.service}`;
    setJobRows((current) =>
      current.map((job) =>
        `${job.customer}-${job.service}` === selectedKey
          ? {
              ...job,
              tech: draftTech,
              status: draftStatus,
            }
          : job
      )
    );
    const message = `Updated ${selectedJob.customer}: ${draftTech} on ${draftStatus.toLowerCase()}.`;
    setJobMessage(message);
    pushToast(message);
    addActivity({
      title: "Job updated",
      detail: `${selectedJob.customer} moved to ${draftStatus} with ${draftTech} assigned.`,
      tone: draftStatus === "Needs tech" ? "warn" : "good",
    });
  }

  return (
    <AppShell
      title="Dispatch, staffing, and work in motion."
      description="A cleaner job operations page for route pressure, assignment gaps, and the active work queue."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <DetailCard label="Unassigned work" value="4 jobs" note="Repairs and follow-ups waiting on dispatch." />
        <DetailCard label="On-time start" value="91%" note="Slightly soft in Northwest and South routes." />
        <DetailCard label="Average ticket" value="$1,153" note="Higher mix from equipment and repair work." />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.4fr]">
        <SectionCard title="Route Board" subtitle="Capacity by route">
          <div className="space-y-3">
            {routeBoard.map((route) => (
              <div className="rounded-2xl border border-line bg-white/80 p-4" key={route.route}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-ink">{route.route}</p>
                  <p className="text-sm text-muted">{route.jobs} jobs</p>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted">Fill rate {route.fillRate}</span>
                  <span className={route.gap === "Stable" ? "text-accent" : "text-warn"}>{route.gap}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#edf1ec]">
                  <div className="h-2 rounded-full bg-accent" style={{ width: route.fillRate }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Job Table"
          subtitle="All active work"
          action={
            <div className="flex flex-wrap items-center justify-end gap-2">
              <FilterChips options={["All", "Scheduled", "In progress", "Needs tech", "At risk"]} selected={statusFilter} onSelect={setStatusFilter} />
              <ActionButton onClick={() => setCreateOpen(true)}>New job</ActionButton>
            </div>
          }
        >
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.18em] text-muted">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Route</th>
                  <th className="pb-2 font-medium">Tech</th>
                  <th className="pb-2 font-medium">Due</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td className="rounded-2xl bg-white/80 px-4 py-6 text-sm text-muted" colSpan={7}>
                      No jobs match this filter.
                    </td>
                  </tr>
                ) : null}
                {filteredJobs.map((job) => (
                  <tr
                    className={`cursor-pointer rounded-2xl transition ${
                      `${job.customer}-${job.service}` === `${selectedJob?.customer}-${selectedJob?.service}`
                        ? "bg-accentSoft/70"
                        : "bg-white/80 hover:bg-white"
                    }`}
                    key={`${job.customer}-${job.service}`}
                    onClick={() => setSelectedJobKey(`${job.customer}-${job.service}`)}
                  >
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-medium text-ink">{job.customer}</td>
                    <td className="px-4 py-4 text-sm text-muted">{job.service}</td>
                    <td className="px-4 py-4 text-sm text-muted">{job.route}</td>
                    <td className="px-4 py-4 text-sm text-muted">{job.tech}</td>
                    <td className="px-4 py-4 text-sm text-muted">{job.due}</td>
                    <td className="px-4 py-4 text-sm"><StatusPill label={job.status} /></td>
                    <td className="rounded-r-2xl px-4 py-4 text-sm font-semibold text-ink">{job.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 md:hidden">
            {filteredJobs.map((job) => (
              <button
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  `${job.customer}-${job.service}` === `${selectedJob?.customer}-${selectedJob?.service}`
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
                  <span>Route: {job.route}</span>
                  <span>Tech: {job.tech}</span>
                  <span>Due: {job.due}</span>
                  <span>Value: {job.amount}</span>
                </div>
              </button>
            ))}
            {filteredJobs.length === 0 ? <div className="rounded-2xl border border-line bg-white/80 p-4 text-sm text-muted">No jobs match this filter.</div> : null}
          </div>
          <div className="mt-4">
            {selectedJob ? (
              <SelectionPanel
                title={selectedJob.customer}
                subtitle={`${selectedJob.service} selected`}
                items={[
                  { label: "Route", value: selectedJob.route },
                  { label: "Tech", value: selectedJob.tech },
                  { label: "Due", value: selectedJob.due },
                  { label: "Status", value: selectedJob.status },
                  { label: "Value", value: selectedJob.amount },
                  { label: "Next move", value: selectedJob.status === "Needs tech" ? "Assign coverage and confirm visit window" : "Keep route sequence on schedule" },
                ]}
                footer={
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="text-sm text-muted">
                        Assign tech
                        <select
                          className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                          value={draftTech}
                          onChange={(event) => setDraftTech(event.target.value)}
                        >
                          {techOptions.map((tech) => (
                            <option key={tech} value={tech}>
                              {tech}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="text-sm text-muted">
                        Update status
                        <select
                          className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                          value={draftStatus}
                          onChange={(event) => setDraftStatus(event.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <ActionButton onClick={saveJobChanges}>Save mock changes</ActionButton>
                      <ActionButton
                        tone="secondary"
                        onClick={() => {
                          setDraftTech("Unassigned");
                          setDraftStatus("Needs tech");
                          const message = `Marked ${selectedJob.customer} for dispatch follow-up.`;
                          setJobMessage(message);
                          pushToast(message);
                          addActivity({
                            title: "Dispatch follow-up created",
                            detail: `${selectedJob.customer} is back in the queue without an assigned tech.`,
                            tone: "warn",
                          });
                        }}
                      >
                        Flag for dispatch
                      </ActionButton>
                    </div>
                    <p className="text-sm text-muted">{jobMessage}</p>
                  </div>
                }
              />
            ) : (
              <div className="rounded-2xl border border-line bg-[#f7faf6] p-4 text-sm text-muted">
                Select a job to edit, or switch filters to bring jobs back into view.
              </div>
            )}
          </div>
        </SectionCard>
      </section>
      <SlideOver
        open={createOpen}
        title="New Job"
        subtitle="Add a mock job to the active queue. This stays local to the page and updates the activity feed."
        onClose={() => setCreateOpen(false)}
      >
        <div className="space-y-4">
          <label className="block text-sm text-muted">
            Customer
            <input
              className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
              value={newJob.customer}
              onChange={(event) => setNewJob((current) => ({ ...current, customer: event.target.value }))}
              placeholder="Add customer name"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm text-muted">
              Service
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newJob.service}
                onChange={(event) => setNewJob((current) => ({ ...current, service: event.target.value }))}
              >
                {["Weekly service", "Repair follow-up", "Inspection", "Filter clean", "Startup visit"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Route
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newJob.route}
                onChange={(event) => setNewJob((current) => ({ ...current, route: event.target.value }))}
              >
                {routeBoard.map((route) => (
                  <option key={route.route} value={route.route}>
                    {route.route}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Tech
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newJob.tech}
                onChange={(event) => setNewJob((current) => ({ ...current, tech: event.target.value }))}
              >
                {techOptions.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Status
              <select
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newJob.status}
                onChange={(event) => setNewJob((current) => ({ ...current, status: event.target.value }))}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm text-muted">
              Due
              <input
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newJob.due}
                onChange={(event) => setNewJob((current) => ({ ...current, due: event.target.value }))}
              />
            </label>
            <label className="block text-sm text-muted">
              Value
              <input
                className="mt-2 w-full rounded-2xl border border-line bg-white px-3 py-2 text-sm text-ink"
                value={newJob.amount}
                onChange={(event) => setNewJob((current) => ({ ...current, amount: event.target.value }))}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            <ActionButton
              onClick={() => {
                if (!newJob.customer.trim()) return;
                const created = {
                  ...newJob,
                  customer: newJob.customer.trim(),
                };
                setJobRows((current) => [created, ...current]);
                setSelectedJobKey(`${created.customer}-${created.service}`);
                setCreateOpen(false);
                setNewJob({
                  customer: "",
                  service: "Weekly service",
                  route: "Central",
                  tech: "Unassigned",
                  due: "Friday, 10:00 AM",
                  amount: "$950",
                  status: "Needs tech",
                });
                const message = `Created job for ${created.customer}.`;
                setJobMessage(message);
                pushToast(message);
                addActivity({
                  title: "Job created",
                  detail: `${created.customer} was added to ${created.route} as ${created.status.toLowerCase()}.`,
                  tone: created.status === "Needs tech" ? "warn" : "good",
                });
              }}
            >
              Create job
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
