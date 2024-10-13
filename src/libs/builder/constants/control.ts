import { IconDefinition, faT } from "@fortawesome/free-solid-svg-icons";
import { TControlSetting } from "../types/control";
import BaseSetting from "../settings/BaseSetting";
import ShortText from "../control/ShortText";

export enum ControlType {
  // Label = "Label",
  // Paragraph = "Paragraph",
  // Heading = "Heading",
  ShortText = "SHORT_TEXT",
  // LongText = "LONG_TEXT",
  // ButtonNext = "BUTTON_NEXT",
  // ButtonSubmit = "BUTTON_SUBMIT",
  // Space = "SPACE",
  // Datetime = "DATETIME",
  // Date = "Date",
  // Time = "Time",
  // DateRange = "DATE_RANGE",
  // TimeRange = "TIME_RANGE",
  // Image = "IMAGE",
  // Video = "VIDEO",
  // Audio = "AUDIO",
  // File = "FILE",
  // Checkbox = "CHECKBOX",
  // CheckboxGroup = "CHECKBOX_GROUP",
  // Dropdown = "DROPDOWN",
  // Signature = "SIGNATURE",
  // Mockup = "MOCKUP",
}

export interface ControlThumbnailInterface {
  icon: IconDefinition;
  label: string;
}
export const THUMBNAILS: { [key in ControlType]: ControlThumbnailInterface } = {
  [ControlType.ShortText]: { icon: faT, label: "Single line" },
};

export const DEFAULT_SETTINGS: { [key in ControlType]: Partial<TControlSetting> } = {
  [ControlType.ShortText]: {},
};

export interface ControlGroupInterface {
  label: string;
  types: ControlType[];
}
export const GROUPS: ControlGroupInterface[] = [
  {
    label: "Texts",
    types: [ControlType.ShortText],
  },
];

export const SETTINGS: { [key in ControlType]: any[] } = {
  [ControlType.ShortText]: [BaseSetting],
};

export const UI = {
  [ControlType.ShortText]: ShortText,
};
