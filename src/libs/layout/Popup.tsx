import React, { forwardRef, useMemo } from "react";
import clsx from "clsx";
import useDragPopup from "./hooks/useDragPopup";
import PopupDefinition from "./types/PopupDefinition";
import { usePopupPosition, usePopupCoord, usePopupHandler, usePopupShown } from "./contexts/PopupHooks";
import PopupPosition from "./types/PopupPosition";
import IconButton from "./components/IconButton";
import { faChevronDown, faChevronRight, faCompress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSS } from "@dnd-kit/utilities";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useDndMonitor } from "@dnd-kit/core";
import { DndTypes } from "./constants";
import useDrop from "@/libs/dnd/useDndDrop";
import useDragEnd from "@/libs/dnd/useDragEnd";

export type PopupProps = {
  item: PopupDefinition;
  horizontal?: boolean;
};

export function Popup(props: PopupProps) {
  const isFloating = usePopupPosition(props.item.name) === PopupPosition.Floating;
  const expand = usePopupShown(props.item.name);
  const coord = usePopupCoord(props.item.name);

  const { setCoord, setPosition, hide, show } = usePopupHandler(props.item.name);
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
        expand && !isFloating ? "h-full" : "h-min",
        expand && horizontal ? "w-full" : "w-min",
      ])}
    >
      <div className={clsx("grid", isFloating && "fixed")} style={isFloating ? { ...coord } : {}}>
        <div className={clsx("bg-white", isFloating && "rounded-md")} {...attributes} style={style} draggable>
          <div className={clsx(["flex flex-col", horizontal ? "h-80" : "w-80"])}>
            <PopupTitle
              ref={setNodeRef}
              title={props.item.header ?? ""}
              expand={expand}
              floating={isFloating}
              horizontal={horizontal}
              onClick={expand ? hide : show}
              onCompressClick={() => setPosition(PopupPosition.Relative)}
              listeners={listeners}
            />
            {expand && <div className="flex-1">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export type PopupTitleProps = {
  title: string;
  expand: boolean;
  floating: boolean;
  horizontal?: boolean;
  onClick: () => void;
  onCompressClick: () => void;
  listeners: SyntheticListenerMap | undefined;
};

const PopupTitle = forwardRef(function PopupTitle(props: PopupTitleProps, ref: React.Ref<HTMLDivElement>) {
  const expand = useMemo(() => props.expand, [props.expand]);
  const title = useMemo(() => props.title, [props.title]);

  return (
    <div
      className={clsx([
        "flex flex-row items-center",
        "text-sm select-none",
        props.horizontal && !expand && "vertical-text",
      ])}
      onClick={props.onClick}
    >
      <div className={clsx(["relative ", "flex-1 flex flex-row items-center gap-2", " p-2 pl-4"])}>
        <div ref={ref} className={clsx("cursor-pointer overlay")} {...props.listeners} />
        {props.horizontal ? (
          <FontAwesomeIcon className={clsx([expand && "rotate-180", "text-xs"])} icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon className={clsx([expand && "rotate-90", "text-xs"])} icon={faChevronRight} />
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
