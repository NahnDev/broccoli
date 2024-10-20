import PopupPosition from "../types/PopupPosition";
import PopupProperties from "../types/PopupProperties";

export enum DndTypes {
  Popup = "popup",
  Sidebar = "sidebar",
}

export const POPUP_INITIAL_STATE: PopupProperties = {
  shown: true,
  coord: { top: 0, left: 0 },
  position: PopupPosition.Relative,
};
