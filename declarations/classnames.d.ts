declare module 'classnames/bind' {
  import cn from 'classnames'

  export default function bind(styles: Record<string, string>): cn;
}
