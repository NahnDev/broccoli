import clsx from "clsx";
import React, { PropsWithChildren } from "react";

export function BoardWrapper(props: Readonly<PropsWithChildren>) {
  return (
    <div className={clsx(["flex flex-row h-full overflow-auto"])}>
      <div className="h-full w-full">{props.children}</div>
    </div>
  );
}
