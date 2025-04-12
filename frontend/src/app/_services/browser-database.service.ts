import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  catchError,
  concat,
  concatMap,
  defer,
  EMPTY,
  fromEvent,
  ignoreElements,
  map,
  Observable,
  of,
  race,
  shareReplay,
  take,
} from 'rxjs';
import { ToastService } from 'src/app/design/organisms/toast-overlay/toast-overlay.component';
import { log } from 'src/utils/logging';
import { ToastConfig } from '../_models/toast';

export type OfflineCampaignData = Record<string, unknown>;
export interface OfflineCampaignDataRecord {
  data: OfflineCampaignData;
  lastUpdated: Date;
  campaign: string;
}

const openDbErrorToast: ToastConfig = {
  type: 'DANGER',
  body: {
    text: 'Unable to open browser database. Offline features are disabled.',
  },
  onToastClick: (dismiss) => dismiss(),
};

@Injectable({
  providedIn: 'root',
})
export class BrowserDatabaseService {
  private dbName = 'aldrune-wiki-db';
  private storeName = 'campaign-offline-data';
  private currentDbVersion = 1;
  private toastService = inject(ToastService);
  private db$ = createIndexedDBDatabase(
    this.dbName,
    this.currentDbVersion,
    (db) => this.createTables(db),
  ).pipe(
    takeUntilDestroyed(),
    catchError((err) => {
      return new Observable<IDBDatabase>(() => {
        log('BrowserDB', err);
        this.toastService.addToast(openDbErrorToast);
      });
    }),
  );

  getCampaignData(
    key: string,
  ): Observable<OfflineCampaignDataRecord | undefined> {
    return new Observable((subscriber) => {
      try {
        this.db$.pipe(take(1)).subscribe((db) => {
          if (!db) {
            subscriber.error('IndexDB not supported!');
            return;
          }

          const txn: IDBTransaction = db.transaction(
            [this.storeName],
            'readonly',
          );
          const store: IDBObjectStore = txn.objectStore(this.storeName);
          const req = store.get(key);
          req.onerror = (e) =>
            subscriber.error(
              (e.target as IDBRequest<OfflineCampaignDataRecord>).error,
            );
          req.onsuccess = (event) => {
            subscriber.next(
              (event.target as IDBRequest<OfflineCampaignDataRecord>).result,
            );
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  addCampaignData(
    key: string,
    value: OfflineCampaignData,
  ): Observable<OfflineCampaignDataRecord> {
    const record: OfflineCampaignDataRecord = {
      data: value,
      lastUpdated: new Date(),
      campaign: key,
    };

    return new Observable((subscriber) => {
      try {
        this.db$.pipe(take(1)).subscribe((db) => {
          if (!db) {
            subscriber.error('IndexDB not supported!');
            return;
          }

          const txn = db.transaction([this.storeName], 'readwrite');
          const store = txn.objectStore(this.storeName);
          const req = store.add(record);
          req.onerror = (e) =>
            subscriber.error(
              (e.target as IDBRequest<OfflineCampaignDataRecord>).error,
            );
          req.onsuccess = (event) => {
            subscriber.next(
              (event.target as IDBRequest<OfflineCampaignDataRecord>).result,
            );
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  putCampaignData(
    key: string,
    value: OfflineCampaignData,
  ): Observable<OfflineCampaignDataRecord> {
    const record: OfflineCampaignDataRecord = {
      data: value,
      lastUpdated: new Date(),
      campaign: key,
    };
    return new Observable((subscriber) => {
      try {
        this.db$.pipe(take(1)).subscribe((db) => {
          if (!db) {
            subscriber.error('IndexDB not supported!');
            return;
          }

          const txn = db.transaction([this.storeName], 'readwrite');
          const store = txn.objectStore(this.storeName);
          const req = store.put(record);
          req.onerror = (e) => {
            subscriber.error(
              (e.target as IDBRequest<OfflineCampaignDataRecord>).error,
            );
          };
          req.onsuccess = (event) => {
            subscriber.next(
              (event.target as IDBRequest<OfflineCampaignDataRecord>).result,
            );
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  deleteCampaignData(key: string): Observable<OfflineCampaignDataRecord> {
    return new Observable((subscriber) => {
      try {
        this.db$.pipe(take(1)).subscribe((db) => {
          if (!db) {
            subscriber.error('IndexDB not supported!');
            return;
          }

          const txn = db.transaction([this.storeName], 'readwrite');
          const store = txn.objectStore(this.storeName);
          const req = store.delete(key);
          req.onerror = (event) =>
            subscriber.error(
              (event.target as IDBRequest<OfflineCampaignDataRecord>).error,
            );
          req.onsuccess = (event) => {
            subscriber.next(
              (event.target as IDBRequest<OfflineCampaignDataRecord>).result,
            );
            subscriber.complete();
          };
        });
      } catch (err) {
        subscriber.error(err);
      }
    });
  }

  private createTables(db: IDBDatabase): Observable<IDBDatabase> {
    this.createTable(db, this.storeName, { keyPath: 'campaign' });
    return of(db);
  }

  private createTable(
    db: IDBDatabase,
    tableName: string,
    options?: IDBObjectStoreParameters,
  ) {
    const alreadyExists = db.objectStoreNames.contains(tableName);
    if (!alreadyExists) {
      db.createObjectStore(tableName, options);
    }
  }
}

/**
 * Must handle 3 scenarios:
 * 1) User opens the webpage for the first time, there is no indexedDb yet
 * 2) User opens the webpage for the n-th time, there is an indexedDb and it is up-to-date
 * 3) User opens the webpage for the n-th time, there is an indexedDb and it has an outdated version
 *
 * The following happens in each scenario:
 * 1 + 2) onsuccess fires
 * 3) onupgradeneeded fires => onsuccess fires
 *
 * In order for onsuccess to wait for onupgradeneeded to finish, we create a signal observable that represents the runtime
 * of onupgradeneeded and use race and concat the observable containing the db from onsuccess to it.
 * Since onupgradeneeded fires before onsuccess, the signal observable will trigger before the data-observable containing data from onsuccess and win the race.
 *
 * So if onupgradeneeded fires, the signal observable will *start* and win the race and once it finishes, the data-observable pipes its value in.
 * If onupgradeneeded doesn't fire, you just use the data-observable directly.
 */
function createIndexedDBDatabase(
  name: string,
  version: number,
  upgradeHandler: (db: IDBDatabase) => Observable<IDBDatabase>,
): Observable<IDBDatabase> {
  return defer(() => {
    const idbOpenDBRequest = indexedDB.open(name, version);
    const db$ = fromIDBOpenDBRequest(idbOpenDBRequest);

    const dbUpgradedSignal$ =
      upgradeHandler !== undefined
        ? fromEvent<IDBVersionChangeEvent>(
            idbOpenDBRequest,
            'upgradeneeded',
          ).pipe(
            map((event) => (event.target as IDBOpenDBRequest).result),
            concatMap((db) => upgradeHandler(db).pipe(ignoreElements())),
          )
        : EMPTY;

    const dbAfterUpgradeSignal$ = concat(dbUpgradedSignal$, db$);
    return race([db$, dbAfterUpgradeSignal$]);
  }).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
}

function fromIDBOpenDBRequest(
  idbOpenRequest: IDBOpenDBRequest,
): Observable<IDBDatabase> {
  return new Observable<IDBDatabase>((subscriber) => {
    idbOpenRequest.onsuccess = (event) => {
      const idbDatabase = (event.target as IDBOpenDBRequest).result;
      subscriber.next(idbDatabase);
      subscriber.complete();
      // When the subscriber unsubscribes, close the database
      subscriber.add(() => {
        log(
          BrowserDatabaseService.name,
          'Closing Database at the end of subscription',
        );
        idbDatabase.close();
      });
      // When the database closes, complete the subscription
      idbDatabase.onclose = () => {
        log(
          BrowserDatabaseService.name,
          'Completing Subscription after closing Database',
        );
        subscriber.complete();
      };
    };

    idbOpenRequest.onerror = (error) => subscriber.error(error);
  });
}
