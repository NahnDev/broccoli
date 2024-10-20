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
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext sensors={sensors}>
      <PopupProvider>
        <SidebarProvider>{props.children}</SidebarProvider>
      </PopupProvider>
    </DndContext>
  );
}
