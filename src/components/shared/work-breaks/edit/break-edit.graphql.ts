import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CreateBreakGQL extends Mutation<{ response: { workBreak } }> {
  document = gql`
mutation(
    $user: ID!
    $fromDate: Date!
    $toDate: Date!
    $reason: WorkBreakReason!
    $comment: String!
    $paidDays: Int
) {
    response: createWorkBreak(
        user: $user
        fromDate: $fromDate
        toDate: $toDate
        reason: $reason
        comment: $comment
        paidDays: $paidDays
    ) {
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
            paidDays
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateWorkBreakGQL extends Mutation<{ response: { workBreak } }> {
  document = gql`
mutation(
    $id: ID!
    $user: ID!
    $fromDate: Date!
    $toDate: Date!
    $reason: WorkBreakReason!
    $comment: String!
    $paidDays: Int
) {
    response: updateWorkBreak(
        id: $id
        user: $user
        fromDate: $fromDate
        toDate: $toDate
        reason: $reason
        comment: $comment
        paidDays: $paidDays
    ) {
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
            paidDays
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
