export { default as Movie } from "./movie";
export * from "./common";

export interface InputType {
  id: string;
  label: string;
  type: "text" | "email" | "number";
  placeholder: string;
  require: boolean;
}
