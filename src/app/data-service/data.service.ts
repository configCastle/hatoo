import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IConfigFile } from '../sets-service/sets.service';
import { IDCService } from '../editor/docker-compose/services.service';
import { Observable, of } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import {
  getServiceByIdQuery,
  getServicesQuery,
  getFileByIdQuery,
  getFilesQuery,
  createFileMutation,
  updateFileMutation,
  deleteFileMutation
} from './queries';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type excludedIdAndConfigType<T> = Omit<IConfigFile<T>, 'id' | 'configType'>;
export type creatingFile<T> = excludedIdAndConfigType<T> & { configType: string };
export interface IUpdateFileData {
  id: number;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private _graphql: Apollo,
    private _authService: AuthService
  ) { }

  getServiceById$(id: number): Observable<ApolloQueryResult<{ service: IDCService }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.query<{ service: IDCService }>({
              query: getServiceByIdQuery,
              variables: { id }
            });
          }
          return of(null);
        })
      )
  }

  getServices$(): Observable<ApolloQueryResult<{ services: IDCService[] }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.query<{ services: IDCService[] }>({
              query: getServicesQuery
            });
          }
          return of(null);
        })
      )
  }

  getFileById$(id: number): Observable<ApolloQueryResult<{ file: IConfigFile<string> }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.query<{ file: IConfigFile<string> }>({
              query: getFileByIdQuery,
              variables: { id }
            });
          }
          return of(null);
        })
      )
  }

  getFiles$(): Observable<ApolloQueryResult<{ files: IConfigFile<string>[] }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.query<{ files: IConfigFile<string>[] }>({
              query: getFilesQuery
            });
          }
          return of(null);
        })
      )
  }

  createFile$(
    file: creatingFile<string>
  ): Observable<FetchResult<{ createFile: IConfigFile<string> }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.mutate<{ createFile: IConfigFile<string> }>({
              mutation: createFileMutation,
              variables: { file },
              update: (store, { data: { createFile } }) => {
                const result = store.readQuery<{ files: IConfigFile<string>[] }>({ query: getFilesQuery });
                result.files = [...result.files, createFile];
                store.writeQuery({
                  query: getFilesQuery,
                  data: result
                });
              }
            });
          }
          return of(null);
        })
      )
  }

  updateFile$(file: IUpdateFileData): Observable<FetchResult<{ updateFile: IConfigFile<string> }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.mutate<{ updateFile: IConfigFile<string> }>({
              mutation: updateFileMutation,
              variables: { file }
            });
          }
          return of(null);
        })
      )
  }

  deleteFile$(id: number): Observable<FetchResult<{ deleteFile: IConfigFile<string> }> | null> {
    return this._authService.checkAuth$()
      .pipe(
        switchMap(e => {
          if (e) {
            return this._graphql.mutate<{ deleteFile: IConfigFile<string> }>({
              mutation: deleteFileMutation,
              variables: { id },
              update: (store, { data: { deleteFile } }) => {
                const result = store.readQuery<{ files: IConfigFile<string>[] }>({ query: getFilesQuery });
                const index = result.files.findIndex(f => f.id === deleteFile.id);
                if (index >= 0) { result.files.splice(index, 1); }
                store.writeQuery({
                  query: getFilesQuery,
                  data: result
                });
              }
            })
          }
          return of(null);
        })
      )
  }

}
