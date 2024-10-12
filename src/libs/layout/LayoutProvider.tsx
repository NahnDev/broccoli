import { PropsWithChildren } from "react";
import PopupProvider from "./contexts/PopupProvider";
import SidebarProvider from "./contexts/SidebarProvider";

export function LayoutProvider(props: PropsWithChildren) {
  return (
    <PopupProvider>
      <SidebarProvider>{props.children}</SidebarProvider>
    </PopupProvider>
  );
}
