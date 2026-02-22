import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Edit Car",
};

export default function CarEditLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
