import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Expenses",
};

export default function ExpensesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
