import { store } from '../../../../../libs/ui-state/store';

export default function Test() {
  console.log('Render playground test');
  return <div>Playground: {store.something.a.b}</div>;
}
