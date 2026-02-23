import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Available Units",
};

export default function AvaiableUnitsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
