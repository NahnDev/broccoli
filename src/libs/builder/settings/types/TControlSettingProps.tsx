import { ControlInterface } from "../../types/control";

export type TControlSettingProps = Readonly<{ id: ControlInterface["id"]; data: ControlInterface["config"] }>;
