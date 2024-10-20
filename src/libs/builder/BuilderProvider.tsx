import { PropsWithChildren } from "react";
import ControlProvider from "./contexts/ControlProvider";
import { DndContext } from "@dnd-kit/core";

export function BuilderProvider(props: PropsWithChildren) {
  return <ControlProvider>{props.children}</ControlProvider>;
}
