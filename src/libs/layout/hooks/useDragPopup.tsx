import { useDraggable } from "@dnd-kit/core";
import PopupDefinition from "../types/PopupDefinition";
import { DndTypes } from "../constants";

export default function useDragPopup(item: PopupDefinition) {
  return useDraggable({
    id: item.name,
    data: {
      type: [DndTypes.Popup],
      payload: item,
    },
  });
}
