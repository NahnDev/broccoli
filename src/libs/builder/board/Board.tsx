"use client";

import "./styles/react-grid-layout.scss";
import React, { useMemo, useRef } from "react";
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

const GridLayout = WidthProvider(ReactGridLayout);

function useControlDragLayer() {
  const { type, isDragging } = useDragLayer((monitor) => ({
    type: monitor.getItemType() === DndTypes.Control ? monitor.getItem()?.type : undefined,
    isDragging: monitor.getItemType() === DndTypes.Control && monitor.isDragging(),
  }));
  const item = useMemo(() => {
    if (!type) return undefined;
    return new ControlBuilder().setType(type).build();
  }, [type]);
  return { item, isDragging };
}

export function Board() {
  const ref = useRef<HTMLDivElement>(null);
  const { item, isDragging } = useControlDragLayer();

  const [controls, { set: setControl }] = useControls();
  const [layouts, setLayouts] = useLayouts();

  const handleLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (isDragging) return;
    setLayouts(layouts);
  };

  const handleDrop = (layouts: ReactGridLayout.Layout[], layout: ReactGridLayout.Layout) => {
    if (item) {
      console.log("item", item);
      setControl(ControlFn.setLayout(item, layout), layouts);
    }
  };

  return (
    <div
      id="builder"
      ref={ref}
      className={clsx(["relative mx-auto bg-white bg-red w-[56em] min-h-full rounded-md overflow-hidden", "p-4"])}
    >
      {/* <CustomDragLayer /> */}
      <GridLayout
        layout={layouts}
        cols={2}
        rowHeight={50}
        margin={[2, 2]}
        containerPadding={[10, 10]}
        isDroppable={isDragging}
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
