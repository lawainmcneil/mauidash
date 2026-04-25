import type { ReactNode } from "react";

export function SectionCard({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="section-card p-4 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div>
          <p className="eyebrow">{title}</p>
          {subtitle ? <h2 className="mt-2 text-xl font-semibold text-ink">{subtitle}</h2> : null}
        </div>
        {action ? <div className="text-sm text-muted">{action}</div> : null}
      </div>
      <div className="mt-5 sm:mt-6">{children}</div>
    </article>
  );
}

export function MetricGrid({
  items,
}: {
  items: { label: string; value: string; detail: string }[];
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article className="metric-card p-4 sm:p-5" key={item.label}>
          <p className="text-sm text-muted">{item.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-ink">{item.value}</p>
          <p className="mt-2 text-sm text-muted">{item.detail}</p>
        </article>
      ))}
    </section>
  );
}

export function StatusPill({ label }: { label: string }) {
  const styles: Record<string, string> = {
    Scheduled: "bg-accentSoft text-accent",
    "In progress": "bg-[#eaf1fd] text-[#29539b]",
    "Needs tech": "bg-dangerSoft text-danger",
    Completed: "bg-[#e8f5eb] text-[#2f6f46]",
    "At risk": "bg-warnSoft text-warn",
    Healthy: "bg-accentSoft text-accent",
    Watch: "bg-warnSoft text-warn",
    Renewal: "bg-[#eaf1fd] text-[#29539b]",
    High: "bg-dangerSoft text-danger",
    Medium: "bg-warnSoft text-warn",
    Low: "bg-accentSoft text-accent",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[label] ?? "bg-white text-ink"}`}>
      {label}
    </span>
  );
}

export function FilterChips({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === selected;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-full px-3 py-2 text-sm font-medium transition sm:px-3 sm:py-2 ${
              active
                ? "bg-ink text-white"
                : "border border-line bg-white/80 text-muted hover:border-ink/20 hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function DetailCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white/80 p-3.5 sm:p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-sm text-muted">{note}</p>
    </div>
  );
}

export function SelectionPanel({
  title,
  subtitle,
  items,
  footer,
}: {
  title: string;
  subtitle?: string;
  items: { label: string; value: string }[];
  footer?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-[#f7faf6] p-3.5 sm:p-4">
      <p className="text-sm font-semibold text-ink">{title}</p>
      {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div className="rounded-2xl border border-line bg-white/90 p-3" key={item.label}>
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{item.label}</p>
            <p className="mt-2 text-sm font-medium text-ink">{item.value}</p>
          </div>
        ))}
      </div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}

export function ActionButton({
  children,
  onClick,
  tone = "primary",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "primary" | "secondary";
  type?: "button" | "submit";
}) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        tone === "primary"
          ? "bg-ink text-white hover:bg-[#193126]"
          : "border border-line bg-white text-muted hover:text-ink"
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function SlideOver({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close panel"
        className="absolute inset-0 bg-[#102217]/20 backdrop-blur-[2px]"
        onClick={onClose}
        type="button"
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-xl border-l border-line bg-panel shadow-panel">
        <div className="flex items-start justify-between border-b border-line px-5 py-5">
          <div>
            <p className="eyebrow">Create</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">{title}</h2>
            {subtitle ? <p className="mt-2 max-w-md text-sm text-muted">{subtitle}</p> : null}
          </div>
          <ActionButton tone="secondary" onClick={onClose}>
            Close
          </ActionButton>
        </div>
        <div className="h-full overflow-y-auto px-5 py-5 pb-24">{children}</div>
      </div>
    </div>
  );
}
