import type { Props } from './props';
import type { HtmlTags } from './html-tags';
import type BaseComponent from '../components/base-component';

export type CarProps<T extends HtmlTags> = {
  color: string,
  parent: BaseComponent<HtmlTags>;
} & Props<T>;
