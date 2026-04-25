"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type ActivityItem = {
  id: number;
  title: string;
  detail: string;
  tone?: "neutral" | "good" | "warn";
  time: string;
};

type ToastItem = {
  id: number;
  message: string;
};

type OpsStateContextValue = {
  activity: ActivityItem[];
  addActivity: (item: Omit<ActivityItem, "id" | "time">) => void;
  pushToast: (message: string) => void;
  dismissToast: (id: number) => void;
  toasts: ToastItem[];
};

const OpsStateContext = createContext<OpsStateContextValue | null>(null);

const initialActivity: ActivityItem[] = [
  { id: 1, title: "Dispatch updated route coverage", detail: "Northwest route gap reduced to one open slot.", tone: "warn", time: "6 min ago" },
  { id: 2, title: "Collections logged a payment promise", detail: "Harbor View committed to payment before Friday.", tone: "good", time: "18 min ago" },
  { id: 3, title: "Sales renewal review started", detail: "Westfield Estates quote moved into board review.", tone: "neutral", time: "31 min ago" },
];

export function OpsStateProvider({ children }: { children: ReactNode }) {
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const value = useMemo<OpsStateContextValue>(
    () => ({
      activity,
      toasts,
      addActivity: (item) => {
        setActivity((current) => [
          { id: Date.now(), time: "Just now", ...item },
          ...current,
        ]);
      },
      pushToast: (message) => {
        const id = Date.now();
        setToasts((current) => [...current, { id, message }]);
        setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 2600);
      },
      dismissToast: (id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      },
    }),
    [activity, toasts]
  );

  return <OpsStateContext.Provider value={value}>{children}</OpsStateContext.Provider>;
}

export function useOpsState() {
  const context = useContext(OpsStateContext);
  if (!context) {
    throw new Error("useOpsState must be used within OpsStateProvider");
  }
  return context;
}
