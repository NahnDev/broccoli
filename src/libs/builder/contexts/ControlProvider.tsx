import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ControlInterface } from "../types/control";
import { Layout } from "react-grid-layout";
import { ControlContext, ControlContextActions } from "./ControlContext";
import ControlFn from "../utils/ControlFn";

export default function ControlProvider(props: PropsWithChildren) {
  const [selected, setSelected] = useState<ControlInterface["id"]>();
  const [controls, setControls] = useState<ControlInterface[]>([]);
  const layouts = useMemo<Layout[]>(() => controls.map((control) => ControlFn.getLayout(control)), [controls]);

  const add = useCallback<ControlContextActions["add"]>(
    (item) => {
      const nextControls = [item, ...controls.filter((control) => control.id !== item.id)];
      console.log("nextControls", nextControls);
      setControls(nextControls);
      setSelected(item.id);
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
          return [...sum, ControlFn.setLayout(control, layout)];
        }
        return [...sum, control];
      }, [] as ControlInterface[]);
      setControls(nextControls);
    },
    [controls]
  );

  return (
    <ControlContext.Provider value={{ controls, layouts, add, remove, setLayouts, selected, setSelected }}>
      {props.children}
    </ControlContext.Provider>
  );
}
