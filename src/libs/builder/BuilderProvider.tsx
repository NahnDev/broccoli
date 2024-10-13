import { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ControlProvider from "./contexts/ControlProvider";

export function BuilderProvider(props: PropsWithChildren) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ControlProvider>{props.children}</ControlProvider>
    </DndProvider>
  );
}
