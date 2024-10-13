import { useContext } from "react";
import { ControlContext } from "../contexts/ControlContext";

export default function useControls() {
  const controls = useContext(ControlContext).controls;
  const set = useContext(ControlContext).add;
  const remove = useContext(ControlContext).remove;

  return [controls, { set, remove }] as const;
}

export function useControlDeleteHanlder() {
  const remove = useContext(ControlContext).remove;
  return remove;
}

export function useControlAddHanlder() {
  return useContext(ControlContext).add;
}
