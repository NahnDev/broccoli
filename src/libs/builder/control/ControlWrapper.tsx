import React, { useMemo } from "react";
import clsx from "clsx";
import { useHotkeys } from "react-hotkeys-hook";
import useControlSelected from "../hooks/useControlSelected";
import { useControlDeleteHanlder } from "../hooks/useControls";
import { ControlType } from "../constants/control";
import ShortText from "./ShortText";
import { ControlProps } from "./types/ControlProps";

const UI = {
  [ControlType.ShortText]: ShortText,
};

export default function ControlWrapper(props: ControlProps) {
  const Components = UI[ControlType.ShortText];

  const [selected, setSelected] = useControlSelected();
  const isSelected = useMemo(() => props.control.id === selected?.id, [props, selected]);

  const handleDelete = useControlDeleteHanlder();
  useHotkeys("delete", () => (isSelected ? handleDelete(selected!) : undefined));
  useHotkeys("backspace", () => (isSelected ? handleDelete(selected!) : undefined));

  return (
    <div
      className={clsx([
        "rounded-lg",
        "relative w-full h-full p-1",
        "flex flex-row items-center",
        isSelected && "bg-blue-500 bg-opacity-5 ",
      ])}
      onMouseDown={() => setSelected(props.control.id)}
    >
      <div className={clsx(["w-full h-full", "pointer-events-none select-none"])}>
        <Components {...props} />
      </div>
    </div>
  );
}
