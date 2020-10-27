import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Issue } from '../../../../models/issue';

@Injectable({
  providedIn: 'root'
})
export class SyncIssueGQL extends Mutation<{ response: { issue: Issue } }> {
  document = gql`
mutation($id: ID!) {
    response: syncIssue(id: $id) {
        issue {
            id
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class IssuesGQL extends Query<{ issues }> {
  document = gql`
query(
    $milestone: ID
    $ticket: ID
    $team: ID
    $user: ID
    $project: ID
    $dueDate: Date
    $state: String
    $problems: Boolean
    $orderBy: String
    $offset: Int
    $first: Int
    $q: String
) {
    issues: allIssues(
        milestone: $milestone
        ticket: $ticket
        team: $team
        user: $user
        project: $project
        dueDate: $dueDate
        state: $state
        problems: $problems
        orderBy: $orderBy
        offset: $offset
        first: $first
        q: $q
    ) {
        count
        edges {
            node {
                title
                id
                dueDate
                labels {
                    count
                    edges {
                        node {
                            title
                            color
                        }
                    }
                }
                project {
                    title
                    group {
                      title
                    }
                }
                state
                createdAt
                timeEstimate
                timeSpent
                totalTimeSpent
                timeEstimate
                glUrl
                ticket {
                    id
                    title
                    url
                }
                author {
                    id
                    name
                    glAvatar
                }
                user {
                    id
                    name
                    glAvatar
                }
                participants {
                    count
                    edges {
                        node {
                            name
                            glAvatar
                        }
                    }
                }
                closedAt
                problems
                metrics {
                    remains
                    efficiency
                    payroll
                    paid
                }
            }
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsSummaryGQL extends Query<{ summary }> {
  document = gql`
query ($team: ID, $user: ID, $project: ID, $dueDate: Date) {
  summary: issuesSummary(team: $team, user: $user, project: $project, dueDate: $dueDate) {
    projects(orderBy: "-issues__remains", state: DEVELOPING) {
      project {
        id
        title
        fullTitle
        group {
          title
          glAvatar
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

@Injectable({
  providedIn: 'root'
})
export class IssuesSummaryGQL extends Query<{ summary }> {
  document = gql`
query(
    $team: ID
    $user: ID
    $project: ID
    $dueDate: Date
) {
    summary: issuesSummary(
        team: $team
        user: $user
        project: $project
        dueDate: $dueDate
    ) {
        count
        closedCount
        openedCount
        problemsCount
        timeSpent
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class TeamMembersGQL extends Query<{ team: { members } }> {
  document = gql`
query ($team: ID!) {
  team(id: $team) {
    members(roles: "DEVELOPER", orderBy: "user__name") {
      count
      edges {
        node {
          roles
          user {
            id
            glAvatar
            name
            problems
            metrics {
              issues {
                closedSpent
                openedSpent
              }
            }
          }
        }
      }
    }
  }
}`;
}
