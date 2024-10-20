import React, { forwardRef, useMemo } from "react";
import clsx from "clsx";
import useDragPopup from "./hooks/useDragPopup";
import PopupDefinition from "./types/PopupDefinition";
import PopupPosition from "./types/PopupPosition";
import IconButton from "./components/IconButton";
import { faChevronDown, faChevronRight, faCompress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DndTypes } from "./constants";
import useDragEnd from "@/libs/dnd/useDragEnd";
import { usePopupCoord, usePopupPosition, usePopupShown } from "./stores/popup";

export type PopupProps = {
  item: PopupDefinition;
  horizontal?: boolean;
};

export function Popup(props: PopupProps) {
  const [coord, setCoord] = usePopupCoord(props.item.name);
  const [shown, setShown] = usePopupShown(props.item.name);
  const [position, setPosition] = usePopupPosition(props.item.name);
  const isFloating = useMemo(() => position === PopupPosition.Floating, [position]);

  const { isDragging, setNodeRef, attributes, listeners, transform, activeNodeRect } = useDragPopup(props.item);

  const children = useMemo(() => props.item.render(), []);
  const horizontal = useMemo(() => props.horizontal && !isFloating, [props.horizontal, isFloating]);
  const style = useMemo(() => ({ transform: CSS.Translate.toString(transform) }), [transform]);

  useDragEnd({
    key: props.item.name,
    onDragEnd(data, event) {
      if (!activeNodeRect) return;
      if (event.over?.data.current?.type === DndTypes.Sidebar) {
        setPosition(PopupPosition.Relative);
      } else {
        setPosition(PopupPosition.Floating);
        setCoord({ left: activeNodeRect.left + event.delta.x, top: activeNodeRect.top + event.delta.y });
      }
    },
  });

  return (
    <div
      className={clsx([
        "grid",
        isDragging && "h-0 z-50",
        shown && !isFloating ? "h-full" : "h-min",
        shown && horizontal ? "w-full" : "w-min",
      ])}
    >
      <div className={clsx("grid", isFloating && "fixed")} style={isFloating ? { ...coord } : {}}>
        <div className={clsx("bg-white", isFloating && "rounded-md")} {...attributes} style={style} draggable>
          <div className={clsx(["flex flex-col", horizontal ? "h-80" : "w-80"])}>
            <PopupTitle
              ref={setNodeRef}
              title={props.item.header ?? ""}
              shown={shown}
              floating={isFloating}
              horizontal={horizontal}
              onClick={() => setShown(!shown)}
              onCompressClick={() => setPosition(PopupPosition.Relative)}
              listeners={listeners}
            />
            {shown && <div className="flex-1">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export type PopupTitleProps = {
  title: string;
  shown: boolean;
  floating: boolean;
  horizontal?: boolean;
  onClick: () => void;
  onCompressClick: () => void;
  listeners: SyntheticListenerMap | undefined;
};

const PopupTitle = forwardRef(function PopupTitle(props: PopupTitleProps, ref: React.Ref<HTMLDivElement>) {
  const shown = useMemo(() => props.shown, [props.shown]);
  const title = useMemo(() => props.title, [props.title]);

  return (
    <div
      className={clsx([
        "flex flex-row items-center",
        "text-sm select-none",
        props.horizontal && !shown && "vertical-text",
      ])}
      onClick={props.onClick}
    >
      <div className={clsx(["relative ", "flex-1 flex flex-row items-center gap-2", " p-2 pl-4"])}>
        <div ref={ref} className={clsx("cursor-pointer overlay")} {...props.listeners} />
        {props.horizontal ? (
          <FontAwesomeIcon className={clsx([shown && "rotate-180", "text-xs"])} icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon className={clsx([shown && "rotate-90", "text-xs"])} icon={faChevronRight} />
        )}
        <div className=" flex-1">
          <span className="select-none font-semibold text-slate-700 px-2">{title}</span>
        </div>
      </div>
      <div className="flex flex-row gap-2 p-2 text-xs">
        {props.floating && <IconButton icon={faCompress} onClick={props.onCompressClick} />}
      </div>
    </div>
  );
});
