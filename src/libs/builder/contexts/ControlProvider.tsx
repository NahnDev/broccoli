import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { ControlInterface } from "../types/control";
import { Layout } from "react-grid-layout";
import { ControlContext, ControlContextActions } from "./ControlContext";
import ControlFn from "../utils/ControlFn";
import { ControlType } from "../constants/control";

export default function ControlProvider(props: PropsWithChildren) {
  const [selected, setSelected] = useState<ControlInterface["id"]>();
  const [controls, setControls] = useState<ControlInterface[]>([
    {
      id: "919ea2a7-add4-4c4a-aa5c-0d3070b3eef0",
      type: ControlType.ShortText,
      coord: {
        x: 0,
        y: 0,
      },
      config: {
        size: {
          width: 1,
          height: 1,
        },
      },
    },
  ]);
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
      const nextControls = controls.filter((control) => control.id !== item.id);
      setControls(nextControls);
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
