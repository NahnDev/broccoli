import { useContext } from "react";
import { ControlContext } from "../contexts/ControlContext";

export default function useControlSelected() {
  const controls = useContext(ControlContext).controls;
  const selected = useContext(ControlContext).selected;
  const setSelected = useContext(ControlContext).setSelected;

  return [controls.find((control) => control.id === selected), setSelected] as const;
}
