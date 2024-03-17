"use client";
import { useState } from "react";
import { boolean } from "zod";
import SideBar from "./sideBar";
import TopBar from "./topBar";
export default function AdminLayout(props: LayoutProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <TopBar open={open} setOpen={setOpen} />
      <SideBar open={open} />
      <div className="p-4 sm:ml-64 bg-sky-blue h-full min-h-screen ">
        <div className="p-4 mt-14"> {props.children}</div>
      </div>
    </div>
  );
}
interface LayoutProps {
  children: React.ReactNode;
  background?: string;
}
