import { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function BuilderProvider(props: PropsWithChildren) {
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
}
