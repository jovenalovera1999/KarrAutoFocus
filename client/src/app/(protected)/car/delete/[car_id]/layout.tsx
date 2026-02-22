import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Delete Car",
};

export default function CarDeleteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
