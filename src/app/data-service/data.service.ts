import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IConfigFile } from '../sets-service/sets.service';
import { IDCService } from '../editor/docker-compose/services.service';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { FetchResult } from 'apollo-link';
import { creatingFile } from '../files-service/files.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private _graphql: Apollo) { }

  getServiceById$(id: number): Observable<ApolloQueryResult<{ service: IDCService }>> {
    return this._graphql.query<{ service: IDCService }>({
      query: gql`query service($id: Int!) {
        service(id: $id) {
          id
          name
          data
        }
      }`,
      variables: { id }
    });
  }

  getServices$(): Observable<ApolloQueryResult<{ services: IDCService[] }>> {
    return this._graphql.query<{ services: IDCService[] }>({
      query: gql`{
        services {
          id
          name
          data
        }
      }`
    });
  }

  getFileById$(id: number): Observable<ApolloQueryResult<{ file: IConfigFile<string> }>> {
    return this._graphql.query<{ file: IConfigFile<string> }>({
      query: gql`query service($id: Int!) {
        file(id: $id) {
          id
          name
          configType
          data
        }
      }`,
      variables: { id }
    });
  }

  getFiles$(): Observable<ApolloQueryResult<{ files: IConfigFile<string>[] }>> {
    return this._graphql.query<{ files: IConfigFile<string>[] }>({
      query: gql`{
        files {
          id
          name
          configType
          data
        }
      }`
    });
  }

  createFile$(
    file: creatingFile<string>
  ): Observable<FetchResult<{ createFile: IConfigFile<string> }>> {
    return this._graphql.mutate<{ createFile: IConfigFile<string> }>({
      mutation: gql`
        mutation createFile($file: CreateFile!) {
          createFile(input: $file) {
            id,
            name,
            configType,
            data
          }
        }
      `,
      variables: { file }
    });
  }

}
