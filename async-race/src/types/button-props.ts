import type { Props } from './props';
import type { HtmlTags } from './html-tags';

export type ButtonProps<T extends HtmlTags> = {
  onClick?: () => void;
} & Props<T>;
