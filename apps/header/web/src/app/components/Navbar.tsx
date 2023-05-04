import { css } from '@emotion/css';
import { firstPathChange$, subscribeToHistory } from '@taterer/rx-router';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Route } from '../../../../../../libs/route';
import NavbarItem from './NavbarItem';

export default function Navbar({ destruction$ }) {
  subscribeToHistory(destruction$);

  const newNav$ = firstPathChange$.pipe(
    map((path) => path === Route.app),
    distinctUntilChanged(),
    takeUntil(destruction$)
  );
  const nav$ = newNav$.pipe(
    map((isAppPath) => {
      if (isAppPath) {
        return (
          <nav class="nav">
            {/* <a class="nav-link active" aria-current="page" href="#">
              Active
            </a>
            <a class="nav-link" href="#">
              Link
            </a>
            <a class="nav-link" href="#">
              Link
            </a>
            <a class="nav-link disabled">Disabled</a> */}
          </nav>
        );
      } else {
        return (
          <nav class="nav">
            <NavbarItem destruction$={newNav$} path={Route.home} title="Home" />
            <NavbarItem destruction$={newNav$} path={Route.app} title="Chart" />
          </nav>
        );
      }
    }),
    takeUntil(destruction$)
  );

  return (
    <div
      single$={nav$}
      class={css`
        width: 100%;
      `}
    />
  );
}
