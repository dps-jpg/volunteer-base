declare module '*css' {
  type IClassName = Record<string, string>;
  const className: IClassName;
  export = className;
}
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';

declare const _API_: string;
