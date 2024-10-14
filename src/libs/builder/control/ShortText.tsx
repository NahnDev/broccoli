import React, { useMemo } from "react";
import { ControlProps } from "./types/ControlProps";

export default function ShortText(props: ControlProps) {
  const label = useMemo(() => props.control.config.label, [props]);
  return <div className="bg-slate-500">Le Thanh Nhan</div>;
}
