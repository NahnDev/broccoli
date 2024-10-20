"use client";

import PopupProperties from "../types/PopupProperties";
import { createContext, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PopupDefinition } from "../types/PopupDefinition";

export type PopupContextType = {
  sides?: PopupDefinition[];
  store: Map<string, PopupProperties>;
  dispatch: (key: string, value: Partial<PopupProperties>) => void;
};
export const PopupContext = createContext<PopupContextType | null>(null);

export type PopupProviderProps = PropsWithChildren<{
  className?: string;
  sides?: PopupDefinition[];
}>;

export default function PopupProvider(props: PopupProviderProps) {
  const [store, setStore] = useState(new Map());

  const dispatch = useCallback((key: string, value: Partial<PopupProperties>) => {
    setStore((prev) => {
      const preVal = prev.get(key);
      return new Map(prev).set(key, { ...preVal, ...value });
    });
  }, []);

  const renders = useMemo(() => props.sides, [props.sides]);

  return (
    <DndProvider backend={HTML5Backend}>
      <PopupContext.Provider value={{ store, dispatch, sides: renders }}>{props.children}</PopupContext.Provider>
    </DndProvider>
  );
}
