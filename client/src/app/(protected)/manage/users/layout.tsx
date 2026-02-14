import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Manage User",
};

export default function ManageUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
