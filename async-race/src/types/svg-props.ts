import type { HtmlTags } from './html-tags';
import type { Props } from './props';

export type SvgProps<T extends HtmlTags> = {
  id: string;
} & Props<T>;
