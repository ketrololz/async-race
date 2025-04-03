import type { Props } from './props';
import type { HtmlTags } from './html-tags';

export type CarProps<T extends HtmlTags> = {
  color: string,
} & Props<T>;
