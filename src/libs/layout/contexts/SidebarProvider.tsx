"use client";

import React, { useContext } from "react";
import PopupDefinition from "../types/PopupDefinition";
import SidebarContext, { SidebarContextValue } from "./SidebarContext";
import PopupContext from "./PopupContext";
import PopupPosition from "../types/PopupPosition";

export default function SidebarProvider(props: React.PropsWithChildren) {
  const [state, setState] = React.useState(new Map<string, SidebarContextValue>());
  const { setPosition } = useContext(PopupContext);

  const register = React.useCallback((name: string, component: PopupDefinition) => {
    setState((prev) => {
      const nextState = new Map(prev);
      const value = nextState.get(name) ?? { components: [] };
      nextState.forEach((value) => {
        value.components = value.components.filter((c) => c.name !== component.name);
      });
      return nextState.set(name, { components: [...value.components, component] });
    });
    console.log("run function");
    setPosition(component.name, PopupPosition.Relative);
  }, []);

  const unregister = React.useCallback((name: string, component: PopupDefinition) => {
    setState((prev) => {
      const value = prev.get(name) ?? { components: [] };
      return new Map(prev).set(name, { components: value.components.filter((c) => c.name !== component.name) });
    });
  }, []);

  return <SidebarContext.Provider value={{ state, register, unregister }}>{props.children}</SidebarContext.Provider>;
}
