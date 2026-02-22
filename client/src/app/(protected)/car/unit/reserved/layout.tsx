import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Reserved Units",
};

export default function CarReservedUnitsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
