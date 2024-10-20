import { create } from "zustand";
import PopupProperties from "../types/PopupProperties";
import PopupDefinition from "../types/PopupDefinition";
import { POPUP_INITIAL_STATE } from "../constants";
import { useCallback } from "react";
import RectCoord from "../types/RectCoord";

type PopupKey = PopupDefinition["name"];
export type PopupState = {
  components: { [key: PopupKey]: PopupProperties };
};

export type PopupActions = {
  add: (component: PopupDefinition) => void;
  remove: (name: PopupKey) => void;

  setShown: (key: PopupKey, shown: boolean) => void;
  setPosition: (key: PopupKey, position: PopupProperties["position"]) => void;
  setCoord: (key: PopupKey, coord: PopupProperties["coord"]) => void;
};

export type PopupStore = PopupState & PopupActions;
export const usePopupStore = create<PopupStore>((set) => ({
  components: {},
  add: (component) =>
    set((state) => {
      return {
        ...state,
        components: {
          ...state.components,
          [component.name]: POPUP_INITIAL_STATE,
        },
      };
    }),
  remove: (name) =>
    set((state) => {
      delete state.components[name];
      return {
        ...state,
        components: { ...state.components },
      };
    }),
  setShown: (key, shown) =>
    set((state) => {
      return {
        ...state,
        components: {
          ...state.components,
          [key]: { ...state.components[key], shown },
        },
      };
    }),
  setPosition: (key, position) =>
    set((state) => {
      return {
        ...state,
        components: {
          ...state.components,
          [key]: { ...state.components[key], position },
        },
      };
    }),
  setCoord: (key, coord) =>
    set((state) => {
      return {
        ...state,
        components: {
          ...state.components,
          [key]: { ...state.components[key], coord },
        },
      };
    }),
}));

export default usePopupStore;

export function usePopupCoord(name: string) {
  const coord = usePopupStore((state) => state.components[name]?.coord);
  const setCoordWithName = usePopupStore((state) => state.setCoord);
  const setCoord = useCallback((coord: RectCoord) => setCoordWithName(name, coord), [name]);
  return [coord, setCoord] as const;
}

export function usePopupPosition(name: string) {
  const position = usePopupStore((state) => state.components[name]?.position);
  const setPositionWithName = usePopupStore((state) => state.setPosition);
  const setPosition = useCallback(
    (position: PopupProperties["position"]) => setPositionWithName(name, position),
    [name]
  );
  return [position, setPosition] as const;
}

export function usePopupShown(name: string) {
  const shown = usePopupStore((state) => state.components[name]?.shown);
  const setShownWithName = usePopupStore((state) => state.setShown);
  const setShown = useCallback((shown: boolean) => setShownWithName(name, shown), [name]);
  return [shown, setShown] as const;
}
