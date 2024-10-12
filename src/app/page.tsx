"use client";

import { PopupDefinition as PopupDefinition } from "@/libs/layout/types/PopupDefinition";
import Builder from "@builder/Builder";
import { LayoutProvider, Sidebar } from "@/libs/layout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export enum PopupTypes {
  UI = "ui",
  Data = "data",
  Layout = "layout",
  Navigation = "navigation",
  Extra = "extra",
}

export const leftPopups: PopupDefinition[] = [
  { name: PopupTypes.UI, render: () => <div>UI</div>, header: "UI Components" },
  { name: PopupTypes.Data, render: () => <div>Data</div>, header: "Data Components" },
];

export const rightPopups: PopupDefinition[] = [
  { name: PopupTypes.Layout, render: () => <div>Layout</div>, header: "Layout Components" },
  { name: PopupTypes.Navigation, render: () => <div>Navigation</div>, header: "Navigation Components" },
  { name: PopupTypes.Extra, render: () => <div className="h-20">Extra</div>, header: "Extra Components" },
];

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
      <LayoutProvider>
        <div className="grid grid-cols-1fr-auto w-screen h-screen overflow-hidden">
          <Builder />
          <Sidebar name="left" init={leftPopups} />
        </div>
      </LayoutProvider>
    </DndProvider>
  );
}
