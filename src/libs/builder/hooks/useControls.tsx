import { useContext } from "react";
import { ControlContext } from "../contexts/ControlContext";

export default function useControls() {
  const controls = useContext(ControlContext).controls;
  const set = useContext(ControlContext).set;
  const remove = useContext(ControlContext).remove;

  return [controls, { set, remove }] as const;
}

export function useControlDeleteHanlder() {
  const remove = useContext(ControlContext).remove;
  return remove;
}

export function useControlSetHanlder() {
  const set = useContext(ControlContext).set;
  return set;
}
