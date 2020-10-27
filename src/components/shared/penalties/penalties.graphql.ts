import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllPenaltiesGQL extends Query<{ penalties }> {
  document = gql`
query($user: ID, $salary: ID, $offset: Int, $first: Int) {
    penalties: allPenalties(
        user: $user
        salary: $salary
        offset: $offset
        first: $first
    ) {
        count
        edges {
            node {
                id
                sum
                comment
                createdAt
                user {
                    glAvatar
                    name
                    position {
                        title
                    }
                }
                createdAt
                createdBy {
                    glAvatar
                    name
                    position {
                        title
                    }
                }
                salary {
                    id
                    createdAt
                }
            }
        }
    }
}`;
}
