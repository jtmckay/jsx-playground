import store from 'store';

export default function Test() {
  console.log('Render playground test');
  return <div>Playground: {store.something.a.b}</div>;
}
