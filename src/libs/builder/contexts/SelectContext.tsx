import { createContext } from "react";
import { ControlInterface } from "../types/control";

export type SelectContextValue = {
  selected?: ControlInterface["id"];
};
export type SelectContextActions = {
  setSelected: (id: ControlInterface["id"]) => void;
};

export const SelectContext = createContext<SelectContextValue & SelectContextActions>({
  selected: "",
  setSelected: () => {},
});
