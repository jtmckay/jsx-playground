import { css, cx } from '@emotion/css';
import { pushHistory } from '@taterer/rx-router';

export default function Button({ style, path, title }) {
  return (
    <a
      class={cx(
        'nav-link',
        css`
          z-index: 0;
        `
      )}
      style={style ? style : ''}
      onClick={(event) => {
        if (!event.ctrlKey) {
          pushHistory({ url: `/${path}` });
          event.preventDefault();
        }
      }}
      href={`/${path}`}
    >
      {title}
    </a>
  );
}
