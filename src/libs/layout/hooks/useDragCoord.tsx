import { useDraggable } from "@dnd-kit/core";

export function useDragCoord(name: string) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: name,
  });

  const clientOffset = transform ? { x: transform.x, y: transform.y } : undefined;

  return { attributes, listeners, setNodeRef, clientOffset };
}
