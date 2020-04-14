import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private _graphql: Apollo) {}

  getServiceById$(id: number) {
    return this._graphql.query({
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

  getServices$() {
    return this._graphql.query({
      query: gql`{
        services {
          id
          name
          data
        }
      }`
    });
  }

  getFileById$(id: number) {
    return this._graphql.query({
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

  getFiles$() {
    return this._graphql.query({
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

}
