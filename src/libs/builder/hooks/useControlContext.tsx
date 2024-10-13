import { useContext } from "react";
import { ControlContext } from "../contexts/ControlContext";

export default function useControlContext() {
  return useContext(ControlContext);
}
