import RectCoord from "./RectCoord";
import PopupPosition from "./PopupPosition";

export type PopupProperties = {
  shown: boolean;
  coord: RectCoord;
  position: PopupPosition;
};

export const initialState: PopupProperties = {
  shown: true,
  coord: { top: 0, left: 0 },
  position: PopupPosition.Relative,
};

export default PopupProperties;
