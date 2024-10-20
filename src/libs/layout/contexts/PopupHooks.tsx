import { useContext } from "react";
import PopupContext from "./PopupContext";
import { POPUP_INITIAL_STATE } from "../constants";
import RectCoord from "../types/RectCoord";
import PopupState from "../types/PopupState";

export function usePopupValue(name: string) {
  return useContext(PopupContext).value[name] ?? POPUP_INITIAL_STATE;
}

export function usePopupCoord(name: string) {
  return usePopupValue(name).coord;
}

export function usePopupShown(name: string) {
  return usePopupValue(name).shown;
}
export function usePopupPosition(name: string) {
  return usePopupValue(name).position;
}

export function usePopupHandler(name: string) {
  const { show, hide, setCoord, setPosition, update } = useContext(PopupContext);
  return {
    show: () => show(name),
    hide: () => hide(name),
    setPosition: (position: PopupState["position"]) => setPosition(name, position),
    setCoord: (coord: RectCoord) => setCoord(name, coord),
    update: (value: Partial<PopupState>) => update(name, value),
  };
}
