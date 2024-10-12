export type PopupDefinition = {
  name: string;
  header?: string;
  render: () => JSX.Element;
};

export default PopupDefinition;
