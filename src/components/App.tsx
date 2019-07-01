import { FunctionComponent, h } from 'preact';
import { lazy }                 from 'preact/compat';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';


const Hello = lazy(() => import(/*webpackChunkName:"|c|Hello"*/'./Hello'));


export const App: FunctionComponent = () =>
  <div id="app" className="container">
    <h1 className="h1">[Component] MyApp</h1>

    <BrowserRouter>
      <Route path="/" component={Hello}/>
    </BrowserRouter>
  </div>
;

export default App;
