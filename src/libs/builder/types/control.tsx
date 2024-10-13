import { IconKeys } from "../constants/icon";
import { Layout } from "react-grid-layout";
import { FileBase64 } from "./file";
import { ControlType } from "../constants/control";
export type Coord = { x: number; y: number };
export type Size = { width: number; height: number };

export interface ControlInterface {
  id: string;
  type: ControlType;
  coord: Coord;
  config: TControlSetting;
}

export type TControlSetting = {
  label?: string;
  bg?: string;
  size?: Size;
  layout?: Partial<Layout>;
  textStyles?: TTextStyle;
  date?: TDateSetting;
  options?: TOptionSetting;
  prefix?: TPrefixSetting;
  heading?: THeadingSetting;
  background?: TBackground;
  border?: TBorder;
  icons?: TIcon;
  mockup?: TMockupSetting;
};

export type TMockupSetting = {
  image?: FileBase64;
};

export type TIcon = {
  left?: IconKeys;
  leftColor?: string;
  right?: IconKeys;
  rightColor?: string;
};

export type TBackground = {
  backgroundColor: string;
};

export type TBorder = {
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
};

export type TPrefixSetting = {
  iconChecked: IconKeys;
  iconUnChecked: IconKeys;
  iconCheckedColor?: string;
  iconUnCheckedColor?: string;
};

export type TOptionSetting = {
  choices?: { label: string; value: string }[];
  multiple?: boolean;
};

export type TTextStyle = {
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: "left" | "center" | "right";
};

export type TDateSetting = {
  format?: string;
  minDate?: string;
  maxDate?: string;
};

export type THeadingSetting = {
  level?: number;
  format?: string;
  color?: string;
};
