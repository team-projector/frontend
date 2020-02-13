import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
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
export class UpdateWorkBreakGQL extends Mutation<{ workBreak }> {
  document = gql`
    mutation ($user: Int!, $id: ID!, $fromDate: DateTime!, $toDate: DateTime!, $reason: String!, $comment: String!) {
      updateWorkBreak(user: $user, id: $id, fromDate: $fromDate, toDate: $toDate, reason: $reason, comment: $comment) {
        workBreak {
          user {
            id
            name
          }
          createdAt
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
export class GetTeamMembersGQL extends Query<{ team: { members } }> {
  document = gql`
    query ($team: ID!) {
      team(id: $team) {
        members {
          count
          edges {
            node {
              user {
                id
                name
              }
            }
          }
        }
      }
    }`;
}
