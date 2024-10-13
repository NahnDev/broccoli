import { faLayerGroup, faPersonWalkingArrowRight, faBrush, faClipboardList } from "@fortawesome/free-solid-svg-icons";

export const WORKSPACE_MENUS = [
  {
    href: "/workspace/templates",
    icon: faLayerGroup,
    name: "Templates",
  },
  {
    href: "/workspace/maker",
    icon: faBrush,
    name: "Maker",
  },

  {
    href: "/workspace/leaves",
    icon: faPersonWalkingArrowRight,
    name: "Leaves",
  },
  {
    href: "/workspace/planning",
    icon: faClipboardList,
    name: "Planning",
  },
];
