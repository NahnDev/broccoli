import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { useDrag } from "react-dnd";
import clsx from "clsx";
import { ControlType, THUMBNAILS } from "../constants/control";
import { DndTypes } from "../constants/dnd";

type ThumbnailProps = Readonly<{ type: ControlType }>;

export default function Thumbnail(props: ThumbnailProps) {
  const { icon, label } = useMemo(() => THUMBNAILS[props.type], [props]);
  const [, dragRef] = useDrag({ type: DndTypes.Thumbnail, item: { type: props.type } });

  return (
    <div className="relative">
      <div ref={dragRef as any} className={clsx(["p-2 text-sm rounded-md bg-gray-100"])} draggable>
        <div className="flex flex-row justifiy-start items-center">
          <div className="w-10 flex justify-center">
            <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
          </div>
          <label>{label}</label>
        </div>
      </div>
    </div>
  );
}
