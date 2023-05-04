import { store } from '../../../../../libs/ui-state/store';

export default function Test() {
  console.log('Render Footer Test');
  return (
    <div onclick={() => (store.something.a.b = Date.now())}>
      FOOTER: {store.something.a.b}
    </div>
  );
}
