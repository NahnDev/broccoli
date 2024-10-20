import { useDraggable } from "@dnd-kit/core";
import { CSS, Transform } from "@dnd-kit/utilities";
import { useMemo } from "react";

export default function useDragProps({ transform, listeners, attributes }: Partial<ReturnType<typeof useDraggable>>) {
  const style = useMemo(() => ({ transform: CSS.Translate.toString(transform ?? null) }), [transform]);
  return useMemo(() => ({ ...attributes, ...listeners, style }), [attributes, listeners, style]);
}
