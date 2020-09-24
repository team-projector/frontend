import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllPenaltiesGQL extends Query<{ penalties }> {
  document = gql`
query($salary: ID, $user: ID) {
    penalties: allPenalties(salary: $salary, user: $user) {
        count
        edges {
            node {
                id
                sum
                comment
                createdAt
                createdBy {
                    id
                    name
                }
            }
        }
    }
}`;
}
