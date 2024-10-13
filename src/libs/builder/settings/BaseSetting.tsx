import React from "react";
import { TControlSettingProps } from "./types/TControlSettingProps";

export default function BaseSetting(props: TControlSettingProps) {
  return (
    <div className="p-2">
      <input placeholder="demo" value={props.data.label} />
    </div>
  );
}
