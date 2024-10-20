import React from "react";
import { POPUP_INITIAL_STATE } from "../constants";
import PopupState from "../types/PopupState";
import RectCoord from "../types/RectCoord";
import PopupContext from "./PopupContext";

export default function PopupProvider(props: React.PropsWithChildren) {
  const [value, setValue] = React.useState<{ [key: string]: PopupState }>({});

  const show = React.useCallback((name: string) => {
    setValue((prev) => {
      const newState = { ...prev, [name]: prev[name] };
      if (!newState[name]) {
        newState[name] = { ...POPUP_INITIAL_STATE };
      }
      newState[name] = { ...newState[name], shown: true };
      return newState;
    });
  }, []);

  const hide = React.useCallback((name: string) => {
    setValue((prev) => {
      const newState = { ...prev, [name]: prev[name] };
      if (newState[name]) {
        newState[name] = { ...newState[name], shown: false };
      }
      return newState;
    });
  }, []);

  const setCoord = React.useCallback((name: string, coord: RectCoord) => {
    setValue((prev) => {
      const newState = { ...prev, [name]: prev[name] };
      const prevValue = newState[name] ?? POPUP_INITIAL_STATE;
      const nextValue = { ...prevValue, coord };
      newState[name] = nextValue;
      return newState;
    });
  }, []);

  const setPosition = React.useCallback((name: string, position: PopupState["position"]) => {
    setValue((prev) => {
      const newState = { ...prev, [name]: prev[name] };
      const prevValue = newState[name] ?? POPUP_INITIAL_STATE;
      const nextValue = { ...prevValue, position };
      newState[name] = nextValue;
      return newState;
    });
  }, []);

  const update = (name: string, value: Partial<PopupState>) => {
    setValue((prev) => {
      const newState = { ...prev, [name]: prev[name] };
      const prevValue = newState[name] ?? POPUP_INITIAL_STATE;
      const nextValue = { ...prevValue, ...value };
      newState[name] = nextValue;
      return newState;
    });
  };

  return (
    <PopupContext.Provider value={{ value, show, hide, setCoord, setPosition, update }}>
      {props.children}
    </PopupContext.Provider>
  );
}
