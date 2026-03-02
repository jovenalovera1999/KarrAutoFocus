import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Reports",
};

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
