import type { Metadata } from "next";
import { OpsStateProvider } from "@/components/ops/ops-state";
import "./globals.css";

export const metadata: Metadata = {
  title: "PoolOps Dashboard",
  description: "Operator-focused MVP dashboard for pool service operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OpsStateProvider>{children}</OpsStateProvider>
      </body>
    </html>
  );
}
