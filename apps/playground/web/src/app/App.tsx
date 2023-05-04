import { css } from '@emotion/css';
import Test from '../components/Test';

export default function App() {
  console.log('render Playground App');
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: center;
        height: 100%;
        width: 100%;

        font-family: 'Open Sans', serif;
        font-size: 16px;

        h1,
        h2,
        h3,
        h4,
        h5 {
          font-family: 'Ubuntu', serif;
        }
      `}
    >
      <Test />
    </div>
  );
}
