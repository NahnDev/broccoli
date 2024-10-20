import React, { CSSProperties, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { useHotkeys } from "react-hotkeys-hook";
import useControlSelected from "../hooks/useControlSelected";
import { useControlDeleteHanlder } from "../hooks/useControls";
import { ControlType } from "../constants/control";
import ShortText from "./ShortText";
import { ControlProps } from "./types/ControlProps";
import { useDrag, useDragLayer } from "react-dnd";
import { DndTypes } from "../constants/dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import html2canvas from "html2canvas";

const UI = {
  [ControlType.ShortText]: ShortText,
};

export default function ControlWrapper(props: ControlProps) {
  const Components = UI[ControlType.ShortText];
  const remove = useControlDeleteHanlder();

  const [{ isDragging, xy }, dragRef] = useDrag({
    type: DndTypes.Control,
    item: props.control,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      xy: monitor.getClientOffset(),
    }),
    end: (item, monitor) => {
      console.log("end", monitor.didDrop());
      if (monitor.didDrop()) {
        // remove(item);
      }
    },
  });

  console.log(xy);

  const [selected, setSelected] = useControlSelected();
  const isSelected = useMemo(() => props.control.id === selected?.id, [props, selected]);

  // const handleDelete = useControlDeleteHanlder();
  // useHotkeys("delete", () => (isSelected ? handleDelete(selected!) : undefined));
  // useHotkeys("backspace", () => (isSelected ? handleDelete(selected!) : undefined));

  // useEffect(() => {
  //   if (isDragging) remove(props.control);
  // }, [isDragging]);

  // useEffect(() => {
  //   preview(getEmptyImage());
  // });

  return (
    <div
      ref={dragRef as any}
      // className={clsx([
      //   "rounded-lg",
      //   " w-full h-full p-1",
      //   "flex flex-row items-center",
      //   // isSelected && "bg-blue-500 bg-opacity-5 ",
      //   "bg-white blur-0 opacity-100",
      //   "fixed",
      // ])}
    >
      <div className={clsx(["w-full h-full", "pointer-events-none select-none"])}>
        <Components {...props} />
      </div>
    </div>
  );
}
