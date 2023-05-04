import { observable } from 'mobx';

type Store = {
  circles: Map<string, any>;
  something: { a: { b: number }; aa: string };
};

export const store = observable<Store>({
  something: { a: { b: Date.now() }, aa: 'aa' },
  circles: new Map(),
});
