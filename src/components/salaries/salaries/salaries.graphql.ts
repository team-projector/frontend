import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllSalariesGQL extends Query<{allSalaries}> {
  document = gql`
    query AllSalaries($user: ID, $offset: Int, $first: Int){
      allSalaries (user: $user, offset: $offset, first: $first) {
        count
        edges {
          node {
            id
            createdAt
            periodFrom
            periodTo
            chargedTime
            bonus
            taxes
            penalty
            sum
            total
            payed
          }
        }
      }
    }`;
}
