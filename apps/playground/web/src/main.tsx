import App from './app/App';
import './localJSX';

export const root = () => {
  document.getElementById('root')?.appendChild(<App />);
};

export const bootstrap = () => {
  return Promise.resolve();
};

export const mount = () => {
  document
    .getElementById('single-spa-application:@playground/playground')
    ?.appendChild(<App />);
  return Promise.resolve();
};

export const unmount = () => {
  document
    .getElementById('single-spa-application:@playground/playground')
    ?.replaceChildren();
  return Promise.resolve();
};
