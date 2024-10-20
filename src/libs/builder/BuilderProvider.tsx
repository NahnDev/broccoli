import { PropsWithChildren } from "react";
import ControlProvider from "./contexts/ControlProvider";
import { DndContext } from "@dnd-kit/core";

export function BuilderProvider(props: PropsWithChildren) {
  return (
    <DndContext>
      <ControlProvider>{props.children}</ControlProvider>
    </DndContext>
  );
}
