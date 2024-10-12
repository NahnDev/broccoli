import { useContext } from "react";
import SidebarContext from "./SidebarContext";
import PopupDefinition from "../types/PopupDefinition";

export function useSidebarComponents(name: string) {
  return useContext(SidebarContext).state.get(name)?.components ?? [];
}

export function useSidebarHandlers(name: string) {
  const { register, unregister } = useContext(SidebarContext);
  return {
    register: (component: PopupDefinition) => register(name, component),
    unregister: (component: PopupDefinition) => unregister(name, component),
  };
}
