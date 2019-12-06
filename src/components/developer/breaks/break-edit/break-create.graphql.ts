import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CreateBreakGQL extends Mutation<{ break }> {
  document = gql`
    mutation ($user: ID!, $fromDate: DateTime!, $toDate: DateTime!, $reason: String!, $comment: String!) {
      createWorkBreak(user: $user, fromDate: $fromDate, toDate: $toDate, reason: $reason, comment: $comment) {
        workBreak {
          createdAt
          user {
            id
            name
          }
          fromDate
          toDate
          reason
          comment
        }
      }
    }`;
}

