import { FunctionComponent, h } from 'preact';

export const A: FunctionComponent = props =>
  <a href="javascript:" {...props}>{props.children}</a>
;
