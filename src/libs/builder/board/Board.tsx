"use client";

import "./styles/react-grid-layout.scss";
import React, { useMemo, useRef } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import Control from "../classes/Control";
import { useDragLayer } from "react-dnd";
import ControlWrapper from "../control/ControlWrapper";
import clsx from "clsx";
import useControls from "../hooks/useControls";
import { useLayouts } from "../hooks/useLayouts";
import { ControlBuilder } from "../utils/ControlBuilder";
import useControlSelected from "../hooks/useControlSelected";
import { DndTypes } from "../constants/dnd";

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

  const [, setSelected] = useControlSelected();

  const handleLayoutChange = (layouts: ReactGridLayout.Layout[]) => {
    if (isDragging) return;
    setLayouts(layouts);
  };

  const handleDrop = (layouts: ReactGridLayout.Layout[], layout: ReactGridLayout.Layout) => {
    if (item) {
      setControl(Control.setLayout(item, layout));
      setLayouts(layouts);
      setSelected(item["id"]);
    }
  };

  return (
    <div
      id="builder"
      ref={ref}
      className={clsx(["relative mx-auto bg-white bg-red w-[56em] min-h-full rounded-md overflow-hidden", "p-4"])}
    >
      <GridLayout
        layout={layouts}
        cols={1}
        rowHeight={50}
        margin={[2, 2]}
        containerPadding={[10, 10]}
        isDroppable={isDragging}
        isDraggable={!isDragging}
        isResizable={!isDragging}
        resizeHandles={["se", "ne", "sw", "nw"]}
        droppingItem={item ? Control.getLayout(item) : undefined}
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
