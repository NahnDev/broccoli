import { PropsWithChildren } from "react";
import PopupProvider from "./contexts/PopupProvider";
import SidebarProvider from "./contexts/SidebarProvider";
import { DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export function LayoutProvider(props: PropsWithChildren) {
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  return (
    <DndContext sensors={sensors}>
      <PopupProvider>
        <SidebarProvider>{props.children}</SidebarProvider>
      </PopupProvider>
    </DndContext>
  );
}
