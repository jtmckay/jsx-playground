import { css } from '@emotion/css';
import { store } from '../../../../../libs/ui-state/store';
import Test from '../components/Test';

export default function App() {
  console.log('render Footer App');
  return (
    <footer
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
      <div
        class={css`
          flex-grow: 1;
          display: flex;
          width: 100%;
        `}
      >
        {store.something.aa}
        <Test />
        <div
          class={css`
            width: 100%;
            max-height: 240px;
            background-color: #2196f3;
            padding: 40px;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            class={css`
              color: lightgray;
            `}
          >
            Copyright © 2023
            <a
              class={css`
                padding: 10px;
                color: white;
              `}
              href="https://existential.company"
              target="_blank"
            >
              Existential LLC
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
