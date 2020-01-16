import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class LoginGQL extends Mutation<{ login: {token} }> {
  document = gql`
    mutation ($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        token {
          key
          created
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class GitlabLoginGQL extends Mutation<{ completeGitlabAuth: {token} }> {
  document = gql`
    mutation ($code: String!, $state: String!) {
      completeGitlabAuth(code: $code, state: $state) {
        token {
          key
          created
        }
      }
    }`;
}
