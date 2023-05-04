import { Persistable, Persistence } from '@taterer/persist';
import { memoryFactory } from '@taterer/persist-memory';
import { from, shareReplay, withLatestFrom } from 'rxjs';

export enum MemoryEntity {
  test = 'test',
}

export async function memoryPersistence(): Promise<
  Persistence<any & Persistable, MemoryEntity>
> {
  const memoryDB = await memoryFactory([
    {
      name: MemoryEntity.test,
    },
  ]);
  return memoryDB;
}

export const memoryDB$ = from(memoryPersistence()).pipe(shareReplay(1));
// sudo subject
memoryDB$.subscribe();

export function withMemoryDB<T>() {
  return withLatestFrom<T, [Persistence<any & Persistable, MemoryEntity>]>(
    memoryDB$
  );
}
