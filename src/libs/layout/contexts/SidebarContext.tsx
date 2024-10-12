import React from "react";
import PopupDefinition from "../types/PopupDefinition";

export type SidebarContextValue = {
  components: PopupDefinition[];
};

export type SidebarContextActions = {
  register: (name: string, component: PopupDefinition) => void;
  unregister: (name: string, component: PopupDefinition) => void;
};

export const SidebarContext = React.createContext<{ state: Map<string, SidebarContextValue> } & SidebarContextActions>({
  state: new Map(),
  register: () => {},
  unregister: () => {},
});

export default SidebarContext;
