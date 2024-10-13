import { useCallback, useMemo, useState } from "react";
import { ControlInterface } from "../types/control";
import { Layout } from "react-grid-layout";
import { ControlContext, ControlContextActions } from "./ControlContext";
import Control from "../classes/Control";

export default function ControlProvider() {
  const [controls, setControls] = useState<ControlInterface[]>([]);
  const layouts = useMemo<Layout[]>(() => controls.map((control) => Control.getLayout(control)), [controls]);

  const set = useCallback<ControlContextActions["set"]>(
    (item) => {
      return controls.reduce((sum, control) => {
        if (control.id === item.id) {
          return [...sum, item];
        }
        return [...sum, control];
      }, [] as ControlInterface[]);
    },
    [controls]
  );

  const remove = useCallback<ControlContextActions["remove"]>(
    (item) => {
      return controls.filter((control) => control.id !== item.id);
    },
    [controls]
  );

  const setLayouts = useCallback<ControlContextActions["setLayouts"]>(
    (layouts) => {
      const nextControls = controls.reduce((sum, control) => {
        const layout = layouts.find((item) => item.i === control.id);
        if (layout) {
          return [...sum, Control.setLayout(control, layout)];
        }
        return [...sum, control];
      }, [] as ControlInterface[]);
      setControls(nextControls);
    },
    [controls]
  );

  return <ControlContext.Provider value={{ controls, layouts, set, remove, setLayouts }} />;
}
