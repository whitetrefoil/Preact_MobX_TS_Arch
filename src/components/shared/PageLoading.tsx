import * as React   from 'react';
import { FC, memo } from 'react';
import * as css     from './PageLoading.scss';


const PageLoading: FC = () => (
  <div className={`loading ${css.loading} text-primary`}>
    <div className="spinner-grow" role="status"/>
    <div className={`spinner-text ${css.text}`}>Loading&hellip;&hellip;</div>
  </div>
);


export default memo(PageLoading);
