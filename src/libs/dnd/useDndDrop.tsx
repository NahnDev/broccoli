import { useDndMonitor } from "@dnd-kit/core";

export type UseDropParams<T = any> = {
  key?: string;
  accepts: string[];
  onDrop: (data: T) => void;
};

export default function useDrop<T = any>(params: UseDropParams<T>) {
  return useDndMonitor({
    onDragEnd(event) {
      if (params.key && event.over?.id === params.key) return;
      if (params.accepts.includes(event.active.data.current?.type)) {
        params.onDrop(event.active.data.current?.payload);
      }
    },
  });
}
