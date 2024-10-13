import { useContext } from "react";
import { ControlContext } from "../contexts/ControlContext";

export function useLayouts() {
  const context = useContext(ControlContext);
  return [context.layouts, context.setLayouts] as const;
}
