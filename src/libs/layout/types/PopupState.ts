import RectCoord from "./RectCoord";
import PopupPosition from "./PopupPosition";

export type PopupState = {
  shown: boolean;
  coord: RectCoord;
  position: PopupPosition;
};

export const initialState: PopupState = {
  shown: true,
  coord: { top: 0, left: 0 },
  position: PopupPosition.Relative,
};

export default PopupState;
