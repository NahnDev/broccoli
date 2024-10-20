import { create } from "zustand";
import PopupDefinition from "../types/PopupDefinition";
import usePopupStore from "./popup";

export type SidebarState = {
  value: { [key: string]: PopupDefinition[] };
};

export type SidebarActions = {
  register: (name: string, popup: PopupDefinition) => void;
  unregister: (name: string, popup: PopupDefinition) => void;
};

export type SidebarStore = SidebarState & SidebarActions;
export const useSidebarStore = create<SidebarStore>((set) => ({
  value: {},
  register: (name, popup) =>
    set((state) => {
      if (!state.value[name]) {
        state.value[name] = [];
      }
      Object.keys(state.value).forEach((key) => {
        state.value[key] = state.value[key].filter((c) => c.name !== popup.name);
      });
      state.value[name].push(popup);
      usePopupStore.getState().add(popup);
      return state;
    }),
  unregister: (name, popup) =>
    set((state) => {
      if (state.value[name]) {
        state.value[name] = state.value[name].filter((c) => c !== popup);
      }
      return state;
    }),
}));

export default useSidebarStore;
