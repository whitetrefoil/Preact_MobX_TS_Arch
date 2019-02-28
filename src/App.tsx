import { Provider } from 'mobx-react';
import * as React   from 'react';
import { AppState } from './store/AppState';
import CompanyView  from './views/CompanyView';


let DevTools: any;

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-implicit-dependencies
  DevTools = require('mobx-react-devtools').default;
} else {
  DevTools = null;
}


export const App = () =>
  <Provider app={new AppState()}>
    <div id="app">
      <CompanyView/>
      <DevTools/>
    </div>
  </Provider>;


export default App;
