import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Karr Auto Focus | Add Car",
};

export default function AddCarLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
