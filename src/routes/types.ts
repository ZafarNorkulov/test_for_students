export type RoutesTypeElement = {
  name: string;
  path: string;
  structure: string;
  component: () => JSX.Element;
};
