import { useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

export type UseDraggingParams = {
  accepts: string[];
};

export default function useDragging<T = any>(params: UseDraggingParams): T | undefined {
  const [item, setItem] = useState<T>();
  useDndMonitor({
    onDragStart(event) {
      if (!params.accepts.includes(event.active?.data.current?.type)) return;
      setItem(event.active?.data.current?.payload);
    },
    onDragEnd() {
      setItem(undefined);
    },
    onDragCancel() {
      setItem(undefined);
    },
    onDragMove(event) {
      if (!params.accepts.includes(event.active?.data.current?.type)) {
        setItem(event.active?.data.current?.payload);
      }
    },
    onDragOver(event) {
      if (!params.accepts.includes(event.active?.data.current?.type)) {
        setItem(event.active?.data.current?.payload);
      }
    },
  });
  return item;
}
