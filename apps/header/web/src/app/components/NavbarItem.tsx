import { classSync } from '@taterer/rx-jsx';
import { firstPathChange$ } from '@taterer/rx-router';
import { Observable, of, takeUntil, withLatestFrom } from 'rxjs';
import { RouteRegExp } from '../../../../../../libs/route';
import Link from './Link';

export default function NavbarItem({
  destruction$,
  style,
  title,
  path,
}: {
  destruction$: Observable<any>;
  style?: string;
  title;
  path;
}) {
  const navbarItem$ = of(<Link style={style} path={path} title={title} />);

  firstPathChange$
    .pipe(withLatestFrom(navbarItem$), takeUntil(destruction$))
    .subscribe(([firstPath, navbarItem]) => {
      classSync(
        navbarItem,
        'active',
        (RouteRegExp[path] && RouteRegExp[path].test(firstPath)) ||
          // If there is no match for any route regular expressions, set active if the given navbar path item has no corresponding route regular expression
          (!RouteRegExp[path] &&
            !Object.values(RouteRegExp).some((regexp) =>
              regexp.test(firstPath)
            ))
      );
    });

  return <div single$={navbarItem$} />;
}
