import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { IssueSummaryProjectSort } from 'src/models/enums/issues-summary';
import { TeamMemberSort } from 'src/models/enums/team-member';
import { Issue } from 'src/models/issue';

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
    $assignedTo: ID
    $createdBy: ID
    $participatedBy: ID
    $milestone: ID
    $ticket: ID
    $team: ID
    $project: ID
    $dueDate: Date
    $state: IssueState
    $problems: Boolean
    $sort: [IssueSort]
    $offset: Int
    $first: Int
    $q: String
) {
    issues: allIssues(
        assignedTo: $assignedTo
        createdBy: $createdBy
        participatedBy: $participatedBy
        milestone: $milestone
        ticket: $ticket
        team: $team
        project: $project
        dueDate: $dueDate
        state: $state
        problems: $problems
        sort: $sort
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
  summary: issuesSummary(team: $team, assignedTo: $user, project: $project, dueDate: $dueDate) {
    projects(sort: ${IssueSummaryProjectSort.issuesRemainsDesc}) {
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
export class IssuesSummaryGQL extends Query<{ summary, user }> {
  document = gql`
query(
    $assignedTo: ID
    $createdBy: ID
    $participatedBy: ID
    $project: ID
    $dueDate: Date
) {
    summary: issuesSummary(
        assignedTo: $assignedTo
        createdBy: $createdBy
        participatedBy: $participatedBy
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
export class UserIssuesSummaryGQL extends Query<{ summary, user }> {
  document = gql`
query(
    $assignedTo: ID!
    $project: ID
    $dueDate: Date
) {
    user(id: $assignedTo) {
        issuesSummary(project: $project, dueDate: $dueDate) {
            assignedCount
            createdCount
            participationCount
        }
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
    members(roles: "DEVELOPER", sort: ${TeamMemberSort.userNameAsc}) {
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
