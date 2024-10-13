import { Layout } from "react-grid-layout";
import { ControlInterface } from "../types/control";
import { createContext } from "react";

export type ControlContextValue = {
  controls: ControlInterface[];
  layouts: Layout[];
};

export type ControlContextActions = {
  set: (item: ControlInterface) => void;
  remove: (item: ControlInterface) => void;

  setLayouts: (layouts: Layout[]) => void;
};

export const ControlContext = createContext<ControlContextValue & ControlContextActions>({
  controls: [],
  layouts: [],
  set: () => {},
  remove: () => {},
  setLayouts: () => {},
});
