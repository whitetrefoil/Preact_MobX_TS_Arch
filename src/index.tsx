import * as React         from 'react';
import { lazy, Suspense } from 'react';
import PageLoading        from './components/shared/PageLoading';
import { getLogger }      from './services/log';


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`);


async function bootstrap() {
  import('./styles/global.scss');

  const ReactDOM = await import(/*webpackChunkName:"~react-dom"*/'react-dom');
  const App = lazy(() => import(/*webpackChunkName:"|c|App"*/'./components/App'));

  const Root: React.FC = () => (
    <Suspense fallback={<PageLoading/>}>
      <App/>
    </Suspense>
  );

  ReactDOM.render(<Root/>, document.getElementById('app'));
}


bootstrap()
  .then(() => {
    debug('Bootstrapped!');

    const loadingErrorDiv = document.getElementById('loading-error');
    if (loadingErrorDiv != null) {
      loadingErrorDiv.remove();
    }
  }, e => {
    console.error(e);
  });
