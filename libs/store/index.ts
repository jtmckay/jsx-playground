import { observable } from 'mobx';

console.log('IMPORTED store');

type Store = {
  circles: Map<string, any>;
  something: { a: { b: number }; aa: string };
};

const store = observable<Store>({
  something: { a: { b: Date.now() }, aa: 'aa' },
  circles: new Map(),
});

export default store;
