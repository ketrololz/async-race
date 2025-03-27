import { Props } from './props';
import { HtmlTags } from './html-tags';

export type ButtonProps<T extends HtmlTags> = {
  onClick?: () => void;
} & Props<T>;
