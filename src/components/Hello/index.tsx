import { FunctionComponent, h } from 'preact';
import { lazy }                 from 'preact/compat';
import { Route }                from 'react-router-dom';
import * as css                 from './index.scss';


const Shared = lazy(() => import(/*webpackChunkName:"|c|s|Shared"*/'../shared/Shared'));
const Nested = lazy(() => import(/*webpackChunkName:"|c|Nested"*/'./Nested'));


interface Props {}


const Hello: FunctionComponent<Props> = () => {

  // init();
  return (
    <div className={`hello ${css.hello}`}>
      <h1 className="h1">[component] HelloPage</h1>

      <h3 className="h3">Hello!!!</h3>

      {/*<p>{this.props.greeting}</p>*/}

      <p>
        <button
          type="button"
          className="btn btn-danger"
          // onClick={this.props.change}
        >Another receptionist!
        </button>
      </p>

      <section>
        <Route
          render={p => (
            <Shared name={p.location.pathname}/>
          )}
        />
      </section>

      <section>
        <Nested name="hello"/>
      </section>

      <section>
        <h3 className="h3">url-loader test</h3>
        <div className={`image ${css.image}`}/>
      </section>
    </div>
  );
};

export default Hello;
