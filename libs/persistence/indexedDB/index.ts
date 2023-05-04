import {
  concatMapPersist,
  concatMapRemove,
  Persistable,
  Persistence,
} from '@taterer/persist';
import { indexedDBFactory } from '@taterer/persist-indexed-db';
import { from, merge, Observable, Subject, Subscription } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

export enum IndexedDBEntity {
  test = 'test',
}

async function indexedDBPersistence(): Promise<
  Persistence<any & Persistable, IndexedDBEntity>
> {
  const databaseName = 'db-tater-calc';

  try {
    // Increment the version number anytime the database schema changes
    const indexedDB = await indexedDBFactory(databaseName, 3, [
      {
        name: IndexedDBEntity.test,
        options: {
          keyPath: 'id',
        },
      },
    ]);

    return indexedDB;
  } catch (err) {
    throw new Error('Failed to create indexedDB persistence.');
  }
}

export const indexedDBSubject = new Subject<
  Persistence<any & Persistable, IndexedDBEntity>
>();

export const indexedDB$ = merge(
  from(indexedDBPersistence()),
  indexedDBSubject
).pipe(
  filter((i) => !!i),
  shareReplay(1)
);

export function withIndexedDb<Entity>() {
  return withLatestFrom<
    Entity,
    [Persistence<any & Persistable, IndexedDBEntity>]
  >(indexedDB$);
}

export function subscribeAndPersist<T>(
  destruction$: Observable<any>,
  tableName: IndexedDBEntity,
  mapFunction: (value: T) => T & Persistable,
  observable$: Observable<T>
): Subscription {
  return observable$
    .pipe(
      map(mapFunction),
      withIndexedDb(),
      concatMapPersist(tableName),
      takeUntil(destruction$)
    )
    .subscribe();
}

export function subscribeAndRemove<T>(
  destruction$: Observable<any>,
  tableName: IndexedDBEntity,
  mapFunction: (value: T) => Persistable | { id: string } | string,
  observable$: Observable<T>
): Subscription {
  return observable$
    .pipe(
      map<any, any>(mapFunction),
      withIndexedDb(),
      concatMapRemove(tableName),
      takeUntil(destruction$)
    )
    .subscribe();
}
