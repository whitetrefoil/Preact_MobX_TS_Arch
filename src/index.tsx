import { h, render }      from 'preact';
import { lazy, Suspense } from 'preact/compat';
import { PageLoading }    from './components/shared/PageLoading';
import { getLogger }      from './services/log';


const { debug } = getLogger(`/src/${__filename.split('?')[0]}`);


async function bootstrap() {
  import('./styles/global.scss');

  const App = lazy(() => import(/*webpackChunkName:"|c|App"*/'./components/App'));

  render(
    <Suspense fallback={<PageLoading/>}>
      <App/>
    </Suspense>,
    document.getElementById('app')!,
  );
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
