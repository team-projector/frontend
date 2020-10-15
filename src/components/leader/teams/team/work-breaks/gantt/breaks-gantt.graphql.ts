import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllTeamWorkBreaks extends Query<{ breaks }> {
  document = gql`
query($team: ID, $user: ID, $offset: Int, $first: Int) {
    breaks: teamWorkBreaks(
        team: $team
        user: $user
        offset: $offset
        first: $first
    ) {
        count
        edges {
            node {
                id
                name
                position {
                    title
                }
                glAvatar
                workBreaks {
                    count
                    edges {
                        node {
                            id
                            createdAt
                            fromDate
                            toDate
                            comment
                            reason
                            approveState
                            approvedBy {
                                name
                                glAvatar
                            }
                            approvedAt
                        }
                    }
                }
            }
        }
    }
}`;
}
