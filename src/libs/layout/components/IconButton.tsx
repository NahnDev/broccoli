import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

export type IconButtonProps = {
  icon: IconDefinition;
  onClick: () => void;
  className?: string;
};

export default function IconButton(props: IconButtonProps) {
  return (
    <FontAwesomeIcon className={clsx(["cursor-pointer", props.className])} icon={props.icon} onClick={props.onClick} />
  );
}
