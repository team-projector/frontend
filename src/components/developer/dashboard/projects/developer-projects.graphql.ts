import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class DeveloperProjectsSummaryGQL extends Query<{ issues, mergeRequests, spentTimes }> {
  document = gql`
query($user: ID, $dueDate: Date) {
    issues: issuesSummary(user: $user, dueDate: $dueDate, state: "OPENED") {
        count
        problemsCount
        projects {
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
            issues {
                remains
                percentage
                openedCount
            }
        }
    }
}`;
}
