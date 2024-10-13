import { useContext } from "react";
import { SelectContext } from "../contexts/SelectContext";
import { ControlContext } from "../contexts/ControlContext";

export default function useControlSelected() {
  const controls = useContext(ControlContext).controls;
  const { selected, setSelected } = useContext(SelectContext);

  return [controls.find((control) => control.id === selected), setSelected] as const;
}
