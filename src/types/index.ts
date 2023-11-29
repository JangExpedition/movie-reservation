export { default as Movie } from "./movie";
export * from "./common";

export interface TextFieldType {
  id: string;
  label: string;
  type: "text" | "email" | "number";
  placeholder?: string;
  text?: string;
  require: boolean;
}
