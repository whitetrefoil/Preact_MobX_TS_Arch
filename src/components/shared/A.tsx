import * as React           from 'react';
import { forwardRef, memo } from 'react';


const A = forwardRef<HTMLAnchorElement>((props, ref) =>
  <a ref={ref} href="javascript:" {...props}>{props.children}</a>,
);


export default memo(A);
