import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSummaryGQL extends Query<{ issues }> {
  document = gql`
query($user: ID, $team: ID, $dueDate: Date) {
    issues: issuesSummary(
        user: $user
        team: $team
        dueDate: $dueDate
        state: "OPENED"
    ) {
        projects(orderBy: "-issues__remains") {
            issues {
                openedCount
                percentage
                remains
            }
            project {
                id
                title
                fullTitle
                glUrl
                milestones(active: true) {
                    edges {
                        node {
                            title
                            dueDate
                            glUrl
                            problems
                        }
                    }
                }
                group {
                    title
                    fullTitle
                }
            }
        }
    }
}
`;
}
