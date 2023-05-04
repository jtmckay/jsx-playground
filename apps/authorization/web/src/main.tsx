import '@taterer/rx-jsx';
import App from './app/App';

export const root = () => {
  document.getElementById('root')?.appendChild(<App />);
};

export const bootstrap = () => {
  return Promise.resolve();
};

export const mount = () => {
  const entry = document.getElementById(
    'single-spa-application:@playground/authorization'
  );
  if (entry) {
    entry.appendChild(<App />);
    entry.style.flexGrow = '1';
  }
  return Promise.resolve();
};

export const unmount = () => {
  document
    .getElementById('single-spa-application:@playground/authorization')
    ?.replaceChildren();
  return Promise.resolve();
};
