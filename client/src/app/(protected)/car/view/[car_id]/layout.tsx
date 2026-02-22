import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | View Car",
};

export default function ViewCarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
