import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CreateBreakGQL extends Mutation<{ workBreak }> {
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

@Injectable({
  providedIn: 'root'
})
export class EditBreakGQL extends Mutation<{ workBreak }> {
  document = gql`
    mutation ($id: ID!, $fromDate: DateTime!, $toDate: DateTime!, $reason: String!, $comment: String!) {
      updateWorkBreak(id: $id, fromDate: $fromDate, toDate: $toDate, reason: $reason, comment: $comment) {
        workBreak {
          createdAt
          fromDate
          toDate
          reason
          comment
        }
      }
    }`;
}
