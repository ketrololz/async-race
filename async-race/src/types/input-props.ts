import type { Props } from './props';
import type { HtmlTags } from './html-tags';

export type InputProps<T extends HtmlTags> = {
  onChange?: (data: string) => void;
  type?: string;
  value?: string;
  placeholder?: string;
} & Props<T>;
