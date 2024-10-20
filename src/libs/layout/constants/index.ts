import PopupPosition from "../types/PopupPosition";
import PopupState from "../types/PopupState";

export enum DndTypes {
  Popup = "popup",
  Sidebar = "sidebar",
}

export const POPUP_INITIAL_STATE: PopupState = {
  shown: true,
  coord: { top: 0, left: 0 },
  position: PopupPosition.Relative,
};
