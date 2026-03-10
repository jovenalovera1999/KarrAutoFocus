import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Petty Cash | Karr Auto Focus",
};

export default function PettyCashLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
