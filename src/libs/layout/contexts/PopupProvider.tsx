import React from "react";
import { POPUP_INITIAL_STATE } from "../constants";
import PopupState from "../types/PopupState";
import RectCoord from "../types/RectCoord";
import PopupContext from "./PopupContext";

export default function PopupProvider(props: React.PropsWithChildren) {
  const [value, setValue] = React.useState<Map<string, PopupState>>(new Map());

  const show = React.useCallback((name: string) => {
    setValue((prev) => {
      const newState = new Map(prev);
      if (!newState.has(name)) {
        newState.set(name, { ...POPUP_INITIAL_STATE });
      }
      newState.set(name, { ...newState.get(name)!, shown: true });
      return newState;
    });
  }, []);

  const hide = React.useCallback((name: string) => {
    setValue((prev) => {
      const newState = new Map(prev);
      if (newState.has(name)) {
        newState.set(name, { ...newState.get(name)!, shown: false });
      }
      return newState;
    });
  }, []);

  const setCoord = React.useCallback((name: string, coord: RectCoord) => {
    setValue((prev) => {
      const newState = new Map(prev);
      const prevValue = newState.get(name) ?? POPUP_INITIAL_STATE;
      const nextValue = { ...prevValue, coord };
      newState.set(name, nextValue);
      return newState;
    });
  }, []);

  const setPosition = React.useCallback((name: string, position: PopupState["position"]) => {
    setValue((prev) => {
      const newState = new Map(prev);
      const prevValue = newState.get(name) ?? POPUP_INITIAL_STATE;
      const nextValue = { ...prevValue, position };
      newState.set(name, nextValue);
      return newState;
    });
  }, []);

  return (
    <PopupContext.Provider value={{ value: value, show, hide, setCoord, setPosition }}>
      {props.children}
    </PopupContext.Provider>
  );
}
