import React, { DragEventHandler, forwardRef, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useDragCoord } from "./hooks/useDragCoord";
import useDragPopup from "./hooks/useDragPopup";
import PopupDefinition from "./types/PopupDefinition";
import { usePopupPosition, usePopupCoord, usePopupHandler, usePopupShown } from "./contexts/PopupHooks";
import PopupPosition from "./types/PopupPosition";
import IconButton from "./components/IconButton";
import { faChevronDown, faChevronRight, faCompress } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RectCoord from "./types/RectCoord";

export type PopupProps = {
  item: PopupDefinition;
  horizontal?: boolean;
};

export function Popup(props: PopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const isFloating = usePopupPosition(props.item.name) === PopupPosition.Floating;
  const expand = usePopupShown(props.item.name);
  const coord = usePopupCoord(props.item.name);
  const { setCoord, setPosition, hide, show } = usePopupHandler(props.item.name);

  const dragCoord = useDragCoord(props.item.name);
  const [{ isDragging }, dragRef, previewRef] = useDragPopup(props.item);
  const [rect, setRect] = useState<RectCoord>();

  const handleDragStart: DragEventHandler<HTMLDivElement> = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition(PopupPosition.Floating);
      setRect({ top: event.clientY - rect.top, left: event.clientX - rect.left });
    }
  };

  useLayoutEffect(() => {
    if (dragCoord && rect) {
      return setCoord({ top: dragCoord.y - rect.top, left: dragCoord.x - rect.left });
    }
    return undefined;
  }, [dragCoord, rect]);

  useLayoutEffect(() => {
    const clientRect = containerRef.current?.getBoundingClientRect();
    if (clientRect) {
      setCoord({ top: clientRect.top, left: clientRect.left });
    }
  }, []);

  const children = useMemo(() => props.item.render(), []);
  const horizontal = useMemo(() => props.horizontal && !isFloating, [props.horizontal, isFloating]);

  console.log("horizontal", horizontal);
  return (
    <div
      ref={containerRef}
      className={clsx(
        expand && !isFloating ? "h-full" : "h-min",
        expand && horizontal ? "w-full" : "w-min",
        isDragging && " pointer-events-none z-[9999]",
        isFloating && "fixed z-50 max-h-[90vh] border-2 rounded-lg"
      )}
      style={{ ...coord }}
    >
      <div className={clsx(["flex flex-col", "bg-white", horizontal ? "h-80" : "w-80"])}>
        <PopupTitle
          ref={dragRef as any}
          title={props.item.header ?? ""}
          expand={expand}
          floating={isFloating}
          horizontal={horizontal}
          onDragStart={handleDragStart}
          onClick={expand ? hide : show}
          onCompressClick={() => setPosition(PopupPosition.Relative)}
        />
        {expand && <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>}
        <div ref={previewRef as any} className="hidden"></div>
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
  onDragStart: DragEventHandler<HTMLDivElement>;
  onCompressClick: () => void;
};

const PopupTitle = forwardRef(function PopupTitle(props: PopupTitleProps, ref: React.Ref<HTMLDivElement>) {
  const expand = useMemo(() => props.expand, [props.expand]);
  const title = useMemo(() => props.title, [props.title]);
  const floating = useMemo(() => props.floating, [props.floating]);
  return (
    <div
      className={clsx([
        "flex flex-row items-center",
        "gap-2 p-2 px-4",
        "text-sm select-none",
        props.horizontal && !expand && "vertical-text",
      ])}
      onClick={props.onClick}
    >
      {props.horizontal ? (
        <FontAwesomeIcon className={clsx([expand && "rotate-180", "text-xs"])} icon={faChevronDown} />
      ) : (
        <FontAwesomeIcon className={clsx([expand && "rotate-90", "text-xs"])} icon={faChevronRight} />
      )}
      <div className="relative flex-1">
        <span className="select-none font-semibold text-slate-700 px-2">{title}</span>
        <div ref={ref} className={clsx("cursor-pointer overlay")} onDragStart={props.onDragStart} />
      </div>
      <div className="flex flex-row gap-2 text-xs">
        {floating && <IconButton icon={faCompress} onClick={props.onCompressClick} />}
      </div>
    </div>
  );
});
