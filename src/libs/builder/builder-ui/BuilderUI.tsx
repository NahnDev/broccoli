import { GROUPS } from "../constants/control";
import React from "react";
import Thumbnail from "./Thumbnail";

export function BuilderUI() {
  return (
    <div className="rounded-none p-2">
      <div className="p-0">
        {GROUPS.map((group, index) => {
          return (
            <div key={index} className="flex flex-col p-2">
              <h6 className="w-full font-semibold p-2">{group.label}</h6>
              <div className="grid grid-cols-2 gap-2">
                {group.types.map((type) => (
                  <Thumbnail key={type} type={type} />
                ))}
              </div>
            </div>
          );
        })}
        <div draggable>Dragg noraml</div>
      </div>
    </div>
  );
}
