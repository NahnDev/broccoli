"use client";

import "./styles/react-grid-layout.scss";
import React, { useMemo, useRef, useState } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import ControlFn from "../utils/ControlFn";
import { useDragLayer } from "react-dnd";
import ControlWrapper from "../control/ControlWrapper";
import clsx from "clsx";
import useControls from "../hooks/useControls";
import { useLayouts } from "../hooks/useLayouts";
import { ControlBuilder } from "../utils/ControlBuilder";
import { DndTypes } from "../constants/dnd";
import { CustomDragLayer } from "./CustomDragLayer";
import { useDndMonitor } from "@dnd-kit/core";
import { ControlInterface } from "../types/control";
import useDragging from "@/libs/dnd/useDragging";
import { ControlType } from "../constants/control";

const GridLayout = WidthProvider(ReactGridLayout);

function useControlDragLayer() {
  const type = useDragging<ControlType>({ accepts: [DndTypes.Thumbnail] });
  return useMemo(() => {
    if (type) {
      return new ControlBuilder().setType(type).build();
    }
    return null;
  }, [type]);
  // const [item, setItem] = useState<ControlInterface>();

  // return item;
  // const { type, payload } = useDragLayer((monitor) => ({ type: monitor.getItemType(), payload: monitor.getItem() }));
  // return useMemo(() => {
  //   switch (type) {
  //     case DndTypes.Thumbnail:
  //       return new ControlBuilder().setType(payload.type).build();
  //     case DndTypes.Control:
  //       return payload;
  //     default:
  //       return null;
  //   }
  // }, [type, payload]);
}

export function Board() {
  const ref = useRef<HTMLDivElement>(null);
  const item = useControlDragLayer();

  console.log("item", item);
  const isDragging = useMemo(() => !!item, [item]);

  const [controls, { set: setControl }] = useControls();
  const [layouts, setLayouts] = useLayouts();

  const handleLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (isDragging) return;
    setLayouts(layouts);
  };

  const handleDrop = (layouts: ReactGridLayout.Layout[], layout: ReactGridLayout.Layout) => {
    console.log("handleDrop", layout);
    if (item) {
      setControl(ControlFn.setLayout(item, layout), layouts);
    }
  };

  return (
    <div
      id="builder"
      ref={ref}
      className={clsx(["relative mx-auto bg-white bg-red w-[56em] min-h-full rounded-md overflow-x-hidden", "p-4"])}
    >
      {/* <CustomDragLayer /> */}
      <GridLayout
        layout={layouts}
        cols={2}
        rowHeight={100}
        margin={[2, 2]}
        containerPadding={[10, 10]}
        isDroppable={true}
        isDraggable={false}
        isResizable={!isDragging}
        resizeHandles={["se", "ne", "sw", "nw"]}
        droppingItem={item ? ControlFn.getLayout(item) : undefined}
        onDrop={handleDrop}
        onLayoutChange={handleLayoutChange}
        compactType={"vertical"}
      >
        {controls.map((control) => (
          <div key={control.id}>
            <ControlWrapper control={control} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
