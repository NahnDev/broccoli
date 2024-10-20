import { Popup } from "./Popup";
import { DndTypes } from "./constants";
import { useEffect } from "react";
import { PopupDefinition } from "./types/PopupDefinition";
import clsx from "clsx";
import { useSidebarComponents, useSidebarHandlers } from "./contexts/SidebarHooks";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";

export type SidebarProps = {
  hidden?: boolean;
  init?: PopupDefinition[];
  name: string;
  horizontal?: boolean;
};

export function Sidebar(props: SidebarProps) {
  const definitions = useSidebarComponents(props.name);
  const { register } = useSidebarHandlers(props.name);

  const onDrop = (item: any) => register(item);
  useEffect(() => props.init?.forEach((v) => register(v)), []);

  return (
    <div
      className={clsx([
        "relative bg-slate-50 grid",
        props.horizontal ? "grid-cols-auto-1fr" : "grid-rows-auto-1fr",
        props.hidden && "w-0 overflow-hidden",
      ])}
    >
      <DropableZone name={props.name} onDrop={onDrop} horizontal={props.horizontal} />
      <div className="grid  border-2 border-slate-100 rounded-sm">
        <div className={clsx(["flex gap-1", props.horizontal ? "flex-row" : "flex-col"])}>
          {definitions.map((definition) => (
            <Popup key={definition.name} horizontal={props.horizontal} item={definition}></Popup>
          ))}
        </div>
      </div>
    </div>
  );
}

function DropableZone(props: { name: string; horizontal?: boolean; onDrop: (item: any) => void }) {
  const { setNodeRef, isOver } = useDroppable({
    id: props.name,
    data: {
      type: DndTypes.Sidebar,
      accepts: [DndTypes.Sidebar],
    },
  });

  useDndMonitor({
    onDragEnd(event) {
      if (event.over?.id === props.name) {
        console.log("----", event.active);
        props.onDrop(event.active.data.current?.payload as PopupDefinition);
      }
    },
  });
  return (
    <div>
      <div ref={setNodeRef} className={clsx(["marker -z-0", isOver && "border-2 border-cyan-700"])}></div>
      {isOver &&
        (props.horizontal ? <div className="h-80 w-0 max-w-0"></div> : <div className="w-80  h-0 max-h-0"></div>)}
    </div>
  );
}
