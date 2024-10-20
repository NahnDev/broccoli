"use client";

import { PopupDefinition as PopupDefinition } from "@/libs/layout/types/PopupDefinition";
import { LayoutProvider, Sidebar } from "@/libs/layout";
import { BuilderUI } from "@builder/builder-ui";
import { BuilderProvider } from "@/libs/builder/BuilderProvider";
import { Builder } from "@/libs/builder/Builder";

export enum PopupTypes {
  UI = "ui",
  Data = "data",
  Layout = "layout",
  Navigation = "navigation",
  Extra = "extra",
}

export const leftPopups: PopupDefinition[] = [
  { name: PopupTypes.UI, render: () => <BuilderUI />, header: "UI Components" },
  { name: PopupTypes.Data, render: () => <div>Data</div>, header: "Data Components" },
];

export const rightPopups: PopupDefinition[] = [
  { name: PopupTypes.Layout, render: () => <div>Layout</div>, header: "Layout Components" },
  { name: PopupTypes.Navigation, render: () => <div>Navigation</div>, header: "Navigation Components" },
  { name: PopupTypes.Extra, render: () => <div className="h-20">Extra</div>, header: "Extra Components" },
];

export default function Home() {
  return (
    <LayoutProvider>
      <div className="grid grid-cols-auto-1fr-auto w-screen h-screen overflow-hidden bg-slate-400">
        <Sidebar name="right" init={rightPopups} />
        <BuilderProvider>
          <Builder />
        </BuilderProvider>
        <Sidebar name="left" init={leftPopups} />
      </div>
    </LayoutProvider>
  );
}
