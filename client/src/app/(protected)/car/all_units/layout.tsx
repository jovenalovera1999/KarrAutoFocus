import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | All Units",
};

export default function CarAllUnitsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
