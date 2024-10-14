import { useDragLayer } from "react-dnd";
import ControlWrapper from "../control/ControlWrapper";
import { DndTypes } from "../constants/dnd";

// Custom Drag Layer component
export const CustomDragLayer = () => {
  const { item, isDragging, currentOffset, type } = useDragLayer((monitor) => ({
    type: monitor.getItemType(),
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !currentOffset || type !== "abc") {
    return <></>;
  }

  const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    top: currentOffset.y,
    left: currentOffset.x,
    zIndex: 100,
  };

  console.log("type", type);

  return (
    <div style={layerStyles}>
      {/* <div style={getItemStyles()}> */}
      <ControlWrapper control={item} />
      {/* </div> */}
    </div>
  );
};
