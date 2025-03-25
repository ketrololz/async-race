import BaseComponent from "../utils/base-component";

export type Element<T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap> = {
  tag: T;
  className?: string;
  text?: string;
  parent?: BaseComponent<T>;
};