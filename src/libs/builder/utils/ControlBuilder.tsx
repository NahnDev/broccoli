import { ControlType } from "../constants/control";
import { ControlInterface } from "../types/control";
import { v4 as uuidv4 } from "uuid";

export class ControlBuilder {
  private type?: ControlType;
  constructor() {}

  build(): ControlInterface {
    if (!this.type) throw new Error("Control type is required");
    return {
      id: uuidv4(),
      type: this.type,
      coord: { x: 0, y: 0 },
      config: {
        size: { width: 1, height: 1 },
        // ...DEFAULT_SETTINGS[this.type],
      },
    };
  }

  setType(type: ControlType) {
    this.type = type;
    return this;
  }
}
