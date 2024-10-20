import React from "react";
import PopupState from "../types/PopupState";
import RectCoord from "../types/RectCoord";

export type PopupContextValue = { [key: string]: PopupState };

export type PopupContextActions = {
  show: (name: string) => void;
  hide: (name: string) => void;
  setCoord: (name: string, coord: RectCoord) => void;
  setPosition: (name: string, position: PopupState["position"]) => void;
  update: (name: string, value: Partial<PopupState>) => void;
};

export const PopupContext = React.createContext<{ value: PopupContextValue } & PopupContextActions>({
  value: {},
  show: () => {},
  hide: () => {},
  setPosition: () => {},
  setCoord: () => {},
  update: () => {},
});

export default PopupContext;
