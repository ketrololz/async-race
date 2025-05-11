import type { HtmlTags } from '../types/html-tags';
import type { Props } from '../types/props';

type Subscription = () => void;

export default class BaseComponent<T extends HtmlTags> {
  protected _node: HTMLElementTagNameMap[T];
  protected _children: BaseComponent<HtmlTags>[] = [];
  protected _subs: Subscription[] = [];

  constructor(props: Props<T> = {}) {
    const tag = props.tag ?? 'div';

    const node = document.createElement(tag) as HTMLElementTagNameMap[T];

    this._node = node;

    if (props.className) {
      node.className = props.className;
    }

    if (props.text) {
      node.textContent = props.text;
    }

    if (props.parent) {
      props.parent.appendChildren(this);
    }
  }

  public get node(): HTMLElementTagNameMap[T] {
    return this._node;
  }

  public set text(text: string) {
    this._node.textContent = text;
  }

  public appendChildren(...children: BaseComponent<HtmlTags>[]): void {
    children.forEach((child) => {
      this._node.appendChild(child.node);
      this._children.push(child);
    });
  }

  public getChildren(): BaseComponent<HtmlTags>[] {
    return this._children;
  }

  public setAttribute(attribute: string, value: string): void {
    this._node.setAttribute(attribute, value);
  }

  public removeAttribute(attribute: string): void {
    this._node.removeAttribute(attribute);
  }

  public toggleClass(className: string): void {
    this._node.classList.toggle(className);
  }

  public addListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: EventListenerOptions | boolean,
  ): void {
    this._node.addEventListener(event, listener, options);
  }

  public removeListener(
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: EventListenerOptions | boolean,
  ): void {
    this._node.removeEventListener(event, listener, options);
  }

  public destroyChildren(): void {
    this._children.forEach((child) => child.node.remove());
    this._children = [];
  }

  public destroyNode(): void {
    this.destroyChildren();
    this.unsubscribeAll();
    this._node.remove();
  }

  public subscribe(subscription: Subscription): void {
    this._subs.push(subscription);
  }

  public unsubscribeAll(): void {
    this._subs.forEach((sub) => sub());
  }
}
