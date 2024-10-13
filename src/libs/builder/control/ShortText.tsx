import React, { useMemo } from "react";
import { ControlProps } from "./types/ControlProps";

export default function ShortText(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return <input placeholder={label}></input>;
}
