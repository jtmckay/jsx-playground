import App from './app/App';
import './localJSX';

export const root = () => {
  document.getElementById('root')?.appendChild(<App />);
};

export const bootstrap = async (props) => {
  return Promise.resolve();
};

export const mount = async () => {
  document
    .getElementById('single-spa-application:@playground/footer')
    ?.appendChild(<App />);
  return Promise.resolve();
};

export const unmount = () => {
  document
    .getElementById('single-spa-application:@playground/footer')
    ?.replaceChildren();
  return Promise.resolve();
};
