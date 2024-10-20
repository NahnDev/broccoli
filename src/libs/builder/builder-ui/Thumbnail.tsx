import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef } from "react";
import clsx from "clsx";
import { ControlType, THUMBNAILS } from "../constants/control";
import { DndTypes } from "../constants/dnd";
import useDrag from "@/libs/dnd/useDrag";
import { CSS } from "@dnd-kit/utilities";

type ThumbnailProps = Readonly<{ type: ControlType }>;

export default function Thumbnail(props: ThumbnailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { icon, label } = useMemo(() => THUMBNAILS[props.type], [props]);
  const { setNodeRef, listeners, transform, attributes } = useDrag({
    key: props.type,
    type: DndTypes.Thumbnail,
    data: props.type,
  });

  const style = useMemo(() => ({ transform: CSS.Translate.toString(transform) }), [transform]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", "dsfasdf");
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
  };

  return (
    <div className="relative" ref={ref} draggable>
      <div
        ref={setNodeRef as any}
        className={clsx(["p-2 text-sm rounded-md bg-gray-100"])}
        {...attributes}
        {...listeners}
        style={style}
        onDragStart={onDragStart}
      >
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
