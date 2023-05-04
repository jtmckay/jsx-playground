import { css } from '@emotion/css'

export default function App() {
  return (
    <div
      class={css`
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: center;
        height: 100%;
        width: 100%;
      `}
    >
      To Pay
    </div>
  )
}
