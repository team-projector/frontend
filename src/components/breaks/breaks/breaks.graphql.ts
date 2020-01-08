import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class BreaksGQL extends Query<{ breaks }> {
  document = gql`
    query TimeExpesnes($team: ID, $user: ID, $offset: Int, $first: Int) {
      breaks: allWorkBreaks(team: $team, user: $user, offset: $offset, first: $first) {
        count
        edges {
          node {
            id
            createdAt
            user {
              name
              glAvatar
            }
            fromDate
            toDate
            comment
            reason
            approveState
            approvedBy {
              name
            }
            approvedAt
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class DeleteBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!) {
      deleteWorkBreak(id: $id) {
        ok
      }
    }`;
}


@Injectable({
  providedIn: 'root'
})
export class ApproveBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!) {
      approveWorkBreak(id: $id) {
        workBreak {
          id
        }
      }
    }`;
}


@Injectable({
  providedIn: 'root'
})
export class DeclineBreakGQL extends Query<{ break }> {
  document = gql`
    mutation ($id: ID!, $declineReason: String!) {
      declineWorkBreak(id: $id, declineReason: $declineReason) {
        workBreak {
          id
        }
      }
    }`;
}


