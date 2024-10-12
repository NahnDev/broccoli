import { useDrag } from "react-dnd";
import { DndTypes } from "../constants";
import PopupDefinition from "../types/PopupDefinition";

export default function useDragPopup(item: PopupDefinition) {
  return useDrag(
    {
      type: DndTypes.Popup,
      item: item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    [name]
  );
}
