import { DragLayerMonitor, useDragLayer } from "react-dnd";
import { DndTypes } from "../constants";

export function useDragCoord(name: string) {
  const isAccept = (monitor: DragLayerMonitor<any>) => {
    return monitor.getItemType() === DndTypes.Popup && monitor.getItem().name === name;
  };
  return useDragLayer((monitor) => (isAccept(monitor) ? monitor.getClientOffset() : undefined));
}
