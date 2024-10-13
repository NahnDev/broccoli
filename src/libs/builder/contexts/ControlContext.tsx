import { Layout } from "react-grid-layout";
import { ControlInterface } from "../types/control";
import { createContext } from "react";

export type ControlContextValue = {
  controls: ControlInterface[];
  layouts: Layout[];
};

export type ControlContextActions = {
  add: (item: ControlInterface, layouts: Layout[]) => void;
  remove: (item: ControlInterface) => void;

  setLayouts: (layouts: Layout[]) => void;
};

export type SelectContextValue = {
  selected?: ControlInterface["id"];
};

export type SelectContextActions = {
  setSelected: (id: ControlInterface["id"]) => void;
};

export type ControlContextType = ControlContextValue &
  ControlContextActions &
  SelectContextValue &
  SelectContextActions;

export const ControlContext = createContext<ControlContextType>({
  controls: [],
  layouts: [],
  add: () => {},
  remove: () => {},
  setLayouts: () => {},

  selected: undefined,
  setSelected: () => {},
});
