import React from "react";
import PopupState from "../types/PopupState";
import RectCoord from "../types/RectCoord";

export type PopupContextValue = Map<string, PopupState>;

export type PopupContextActions = {
  show: (name: string) => void;
  hide: (name: string) => void;
  setCoord: (name: string, coord: RectCoord) => void;
  setPosition: (name: string, position: PopupState["position"]) => void;
};

export const PopupContext = React.createContext<{ value: PopupContextValue } & PopupContextActions>({
  value: new Map<string, PopupState>(),
  show: () => {},
  hide: () => {},
  setPosition: () => {},
  setCoord: () => {},
});

export default PopupContext;
