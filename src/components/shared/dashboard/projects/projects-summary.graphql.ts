import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { IssueSummaryProjectSort } from 'src/models/enums/issues-summary';

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
        projects(orderBy: ${IssueSummaryProjectSort.issuesRemainsDesc}) {
            issues {
                openedCount
                percentage
                remains
            }
            project {
                id
                title
                fullTitle
                glAvatar
                glUrl
                milestones(state: ACTIVE) {
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
                    glAvatar
                }
            }
        }
    }
}
`;
}
