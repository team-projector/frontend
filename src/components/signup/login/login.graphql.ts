import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class LoginGQL extends Mutation<{ login: {token} }> {
  document = gql`
    mutation login($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        token {
          key
          created
        }
      }
    }`;
}
