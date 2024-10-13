import { ControlInterface } from "../types/control";
import ReactGridLayout from "react-grid-layout";

export default class Control {
  public static getLayout(item: ControlInterface): ReactGridLayout.Layout {
    return {
      i: item.id,
      x: item.coord.x,
      y: item.coord.y,
      w: item.config.size?.width ?? 1,
      h: item.config.size?.height ?? 1,
      ...item.config.layout,
    };
  }
  public static setLayout(control: ControlInterface, layout: ReactGridLayout.Layout): ControlInterface {
    return {
      ...control,
      coord: { x: layout.x, y: layout.y },
      config: { ...control.config, size: { width: layout.w, height: layout.h } },
    };
  }
}
