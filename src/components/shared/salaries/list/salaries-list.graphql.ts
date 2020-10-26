import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllSalariesGQL extends Query<{ salaries }> {
  document = gql`
query($team: ID, $user: ID, $offset: Int, $first: Int) {
    salaries: allSalaries(
        team: $team
        user: $user
        offset: $offset
        first: $first
    ) {
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
                user {
                    glAvatar
                    name
                    position {
                        title
                    }
                }
            }
        }
    }
}`;
}
