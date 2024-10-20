import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";

export type UseDragEndParams<T = any> = {
  key: string;
  onDragEnd: (data: T, event: DragEndEvent) => void;
};

export default function useDragEnd<T = any>(params: UseDragEndParams<T>) {
  return useDndMonitor({
    onDragEnd(event) {
      if (event.active?.id !== params.key) return;
      params.onDragEnd(event.active?.data.current?.payload, event);
    },
  });
}
