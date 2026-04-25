"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { dateRanges, navItems } from "@/lib/mock-data";
import { useOpsState } from "@/components/ops/ops-state";
import { ActionButton, SlideOver } from "@/components/ops/ui";

type AppShellProps = {
  title: string;
  description: string;
  eyebrow?: string;
  children: ReactNode;
};

export function AppShell({
  title,
  description,
  eyebrow = "PoolOps MVP",
  children,
}: AppShellProps) {
  const pathname = usePathname();
  const [activeRange, setActiveRange] = useState<(typeof dateRanges)[number]>("This week");
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const { activity, dismissToast, toasts } = useOpsState();

  const toneClassMap: Record<string, string> = {
    neutral: "bg-white/90 text-ink",
    good: "bg-accentSoft text-accent",
    warn: "bg-warnSoft text-warn",
  };

  const commandItems = useMemo(
    () => [
      ...navItems.map((item) => ({
        href: item.href,
        label: item.label,
        detail: item.note,
        type: "Page",
      })),
      { href: "/jobs", label: "Create new job", detail: "Jump to Jobs and add work", type: "Action" },
      { href: "/alerts", label: "Create new alert", detail: "Jump to Alerts and log an issue", type: "Action" },
      { href: "/finance", label: "Create collections follow-up", detail: "Jump to Finance and add follow-up", type: "Action" },
    ],
    []
  );

  const filteredCommands = useMemo(() => {
    const query = commandQuery.trim().toLowerCase();
    if (!query) return commandItems;
    return commandItems.filter(
      (item) =>
        item.label.toLowerCase().includes(query) ||
        item.detail.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
  }, [commandItems, commandQuery]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || event.key === "/") {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName?.toLowerCase();
        const typing = tag === "input" || tag === "textarea" || target?.isContentEditable;
        if (typing) return;
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="min-h-screen px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
      <div className="mx-auto grid max-w-[1500px] gap-4 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_320px] xl:gap-6">
        <aside className="hidden lg:block">
          <div className="sticky top-4 space-y-4">
            <section className="section-card overflow-hidden border-white/60 bg-panel/90 p-4 backdrop-blur">
              <div>
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">PoolOps</h2>
                <p className="mt-2 text-sm text-muted">Operator-first command center for service, sales, finance, and alerts.</p>
              </div>
              <div className="mt-5 space-y-2">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition ${
                        active ? "bg-ink text-white" : "bg-white/75 text-ink hover:bg-white"
                      }`}
                    >
                      <span className={`mt-0.5 rounded-xl px-2 py-1 text-xs font-semibold ${active ? "bg-white/15 text-white" : "bg-accentSoft text-accent"}`}>
                        {item.short}
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-sm font-semibold ${active ? "text-white" : "text-ink"}`}>{item.label}</span>
                        <span className={`mt-1 block text-xs ${active ? "text-white/75" : "text-muted"}`}>{item.note}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-5 space-y-3 rounded-2xl border border-line bg-[#f7faf6] p-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">Quick Add</p>
                  <p className="mt-1 text-sm text-ink">Open the global panel to jump into new jobs, alerts, or follow-up work.</p>
                </div>
                <ActionButton onClick={() => setQuickAddOpen(true)}>Open Quick Add</ActionButton>
              </div>
              <button
                className="w-full rounded-2xl border border-line bg-white/80 px-3 py-3 text-left transition hover:bg-white"
                onClick={() => setCommandOpen(true)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">Command Bar</p>
                    <p className="mt-1 text-xs text-muted">Search pages and common actions</p>
                  </div>
                  <span className="rounded-full border border-line px-2 py-1 text-xs text-muted">/</span>
                </div>
              </button>
            </section>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-4 lg:gap-6">
          <section className="section-card sticky top-3 z-20 overflow-hidden border-white/60 bg-panel/90 backdrop-blur">
            <div className="border-b border-line/80 px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3 lg:hidden">
                    <p className="eyebrow">{eyebrow}</p>
                    <div className="flex items-center gap-2">
                      <ActionButton tone="secondary" onClick={() => setCommandOpen(true)}>
                        Search
                      </ActionButton>
                      <ActionButton onClick={() => setQuickAddOpen(true)}>Quick Add</ActionButton>
                    </div>
                  </div>
                  <p className="eyebrow hidden lg:block">{eyebrow}</p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl xl:text-4xl">{title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-muted">
                  <div className="rounded-2xl border border-line bg-white/70 px-3 py-3 sm:px-4">
                    <div className="eyebrow">Service level</div>
                    <div className="mt-2 text-xl font-semibold text-ink sm:text-2xl">94%</div>
                  </div>
                  <div className="rounded-2xl border border-line bg-white/70 px-3 py-3 sm:px-4">
                    <div className="eyebrow">Collections</div>
                    <div className="mt-2 text-xl font-semibold text-ink sm:text-2xl">87%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 lg:hidden">
              <div className="overflow-x-auto">
                <nav className="flex min-w-max gap-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          active ? "bg-ink text-white" : "border border-line bg-white/80 text-muted"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-line/80 px-4 py-4 sm:px-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="overflow-x-auto">
                <div className="flex min-w-max gap-2">
                  {dateRanges.map((range) => {
                    const active = range === activeRange;
                    return (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setActiveRange(range)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          active
                            ? "bg-accent text-white"
                            : "border border-line bg-white/70 text-muted hover:border-accent/20 hover:text-ink"
                        }`}
                      >
                        {range}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="rounded-full border border-line bg-white/80 px-3 py-2 text-xs text-muted transition hover:text-ink sm:px-4 sm:text-sm"
                  onClick={() => setCommandOpen(true)}
                  type="button"
                >
                  Command bar
                </button>
                <div className="rounded-full border border-line bg-white/80 px-3 py-2 text-xs text-muted sm:px-4 sm:text-sm">
                  Region: All districts
                </div>
                <div className="rounded-full border border-line bg-white/80 px-3 py-2 text-xs text-muted sm:px-4 sm:text-sm">
                  Updated 7 min ago
                </div>
              </div>
            </div>
          </section>

          {children}
        </div>

        <aside className="hidden xl:block">
          <div className="sticky top-4 space-y-4">
            <section className="section-card p-5">
              <div>
                <p className="eyebrow">Activity</p>
                <h2 className="mt-2 text-xl font-semibold text-ink">Live ops feed</h2>
              </div>
              <div className="mt-5 space-y-3">
                {activity.slice(0, 6).map((item) => (
                  <div className={`rounded-2xl border border-line p-4 ${toneClassMap[item.tone ?? "neutral"]}`} key={item.id}>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className="text-xs opacity-70">{item.time}</span>
                    </div>
                    <p className="mt-2 text-sm opacity-90">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>

      <SlideOver
        open={quickAddOpen}
        title="Quick Add"
        subtitle="Jump into the next piece of work fast. Use this as a global launcher for the most common operator actions."
        onClose={() => setQuickAddOpen(false)}
      >
        <div className="space-y-4">
          <div className="grid gap-3">
            <Link className="rounded-2xl border border-line bg-white p-4 transition hover:bg-[#f7faf6]" href="/jobs" onClick={() => setQuickAddOpen(false)}>
              <p className="text-sm font-semibold text-ink">New job</p>
              <p className="mt-1 text-sm text-muted">Open Jobs and add work to the dispatch queue.</p>
            </Link>
            <Link className="rounded-2xl border border-line bg-white p-4 transition hover:bg-[#f7faf6]" href="/alerts" onClick={() => setQuickAddOpen(false)}>
              <p className="text-sm font-semibold text-ink">New alert</p>
              <p className="mt-1 text-sm text-muted">Open Alerts and create an exception for the team to handle.</p>
            </Link>
            <Link className="rounded-2xl border border-line bg-white p-4 transition hover:bg-[#f7faf6]" href="/finance" onClick={() => setQuickAddOpen(false)}>
              <p className="text-sm font-semibold text-ink">New follow-up</p>
              <p className="mt-1 text-sm text-muted">Open Finance and add a collections follow-up item.</p>
            </Link>
          </div>
          <div className="rounded-2xl border border-line bg-[#f7faf6] p-4">
            <p className="text-sm font-semibold text-ink">Operator shortcuts</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Link className="rounded-2xl border border-line bg-white p-3 text-sm text-ink transition hover:bg-accentSoft" href="/dashboard" onClick={() => setQuickAddOpen(false)}>
                Check operating pulse
              </Link>
              <Link className="rounded-2xl border border-line bg-white p-3 text-sm text-ink transition hover:bg-accentSoft" href="/sales" onClick={() => setQuickAddOpen(false)}>
                Review pipeline
              </Link>
              <Link className="rounded-2xl border border-line bg-white p-3 text-sm text-ink transition hover:bg-accentSoft" href="/customers" onClick={() => setQuickAddOpen(false)}>
                Review renewals
              </Link>
              <Link className="rounded-2xl border border-line bg-white p-3 text-sm text-ink transition hover:bg-accentSoft" href="/alerts" onClick={() => setQuickAddOpen(false)}>
                Triage issues
              </Link>
            </div>
          </div>
        </div>
      </SlideOver>

      {commandOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            aria-label="Close command bar"
            className="absolute inset-0 bg-[#102217]/20 backdrop-blur-[2px]"
            onClick={() => setCommandOpen(false)}
            type="button"
          />
          <div className="absolute left-1/2 top-[10vh] w-[min(720px,calc(100vw-1.5rem))] -translate-x-1/2 rounded-[28px] border border-line bg-panel/95 p-4 shadow-panel backdrop-blur sm:p-5">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
              <span className="text-sm text-muted">/</span>
              <input
                autoFocus
                className="w-full border-0 bg-transparent p-0 text-sm text-ink outline-none placeholder:text-muted"
                onChange={(event) => setCommandQuery(event.target.value)}
                placeholder="Search pages and actions"
                value={commandQuery}
              />
              <span className="rounded-full border border-line px-2 py-1 text-xs text-muted">Esc</span>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                {filteredCommands.map((item, index) => (
                  <Link
                    className="block rounded-2xl border border-line bg-white px-4 py-4 transition hover:bg-[#f7faf6]"
                    href={item.href}
                    key={`${item.type}-${item.label}-${index}`}
                    onClick={() => {
                      setCommandOpen(false);
                      setCommandQuery("");
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-ink">{item.label}</p>
                        <p className="mt-1 text-sm text-muted">{item.detail}</p>
                      </div>
                      <span className="rounded-full border border-line px-2 py-1 text-xs text-muted">{item.type}</span>
                    </div>
                  </Link>
                ))}
                {filteredCommands.length === 0 ? (
                  <div className="rounded-2xl border border-line bg-white px-4 py-5 text-sm text-muted">
                    No matches yet. Try "jobs", "alerts", "finance", or "create".
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            className="pointer-events-auto animate-rise-in rounded-2xl border border-line bg-panel/95 px-4 py-3 shadow-panel backdrop-blur"
            key={toast.id}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-ink">{toast.message}</p>
              <button
                className="text-xs text-muted"
                type="button"
                onClick={() => dismissToast(toast.id)}
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
