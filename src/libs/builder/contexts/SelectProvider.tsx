import { useState } from "react";
import { ControlInterface } from "../types/control";
import { SelectContext } from "./SelectContext";

export default function SelectProvider() {
  const [selected, setSelected] = useState<ControlInterface["id"]>();

  return <SelectContext.Provider value={{ selected, setSelected }} />;
}
