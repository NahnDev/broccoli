import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

export type UseDragParams = {
  key: string;
  type: string;
  data: any;
};

export default function useDrag(params: UseDragParams) {
  const properties = useDraggable({
    id: params.key,
    data: {
      type: params.type,
      payload: params.data,
    },
  });
  const transform = useMemo(() => properties.transform, [properties]);
  const style = useMemo(() => ({ transform: CSS.Translate.toString(transform) }), [transform]);
  return useMemo(() => ({ ...properties, style }), [properties, style]);
}
