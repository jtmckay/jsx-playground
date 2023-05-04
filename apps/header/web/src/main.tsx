import '@taterer/rx-jsx';
import App, { destruction$ } from './app/App';

export const root = () => {
  document.getElementById('root')?.appendChild(<App />);
};

export const bootstrap = () => {
  return Promise.resolve();
};

export const mount = () => {
  document
    .getElementById('single-spa-application:@playground/header')
    ?.appendChild(<App />);
  return Promise.resolve();
};

export const unmount = () => {
  destruction$.next(undefined);
  document
    .getElementById('single-spa-application:@playground/header')
    ?.replaceChildren();
  return Promise.resolve();
};
