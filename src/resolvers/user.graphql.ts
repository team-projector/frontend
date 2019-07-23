import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class UserGQL extends Query<{user}> {
  document = gql`
    query User($user: ID!) {
      user (id: $user) {
        id
        name
        glAvatar
        roles
      }
    }`;
}
