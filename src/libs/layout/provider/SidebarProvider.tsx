"use client";

import React, { PropsWithChildren } from "react";
import { PopupDefinition } from "../types/PopupDefinition";

export type SidebarContext = {
  context: Map<string, Set<PopupDefinition["name"]>>;
  register: (key: string, popup: PopupDefinition["name"]) => void;
};

export const SidebarContext = React.createContext<SidebarContext>({
  context: new Map(),
  register: () => {},
});

export default function SidebarProvider(props: PropsWithChildren) {
  const [context, setContext] = React.useState(new Map<string, Set<PopupDefinition["name"]>>());

  const register = React.useCallback((key: string, popup: PopupDefinition["name"]) => {
    setContext((prev) => {
      prev.forEach((v) => v.delete(popup));
      const set = prev.get(key) ?? new Set();
      set.add(popup);
      return new Map(prev).set(key, set);
    });
  }, []);

  return <SidebarContext.Provider value={{ context, register }}>{props.children}</SidebarContext.Provider>;
}
