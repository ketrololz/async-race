import type BaseComponent from '../utils/base-component';
import type { HtmlTags } from './html-tags';

export type Props<
  T extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
> = {
  tag?: T;
  className?: string;
  text?: string;
  parent?: BaseComponent<HtmlTags>;
};
