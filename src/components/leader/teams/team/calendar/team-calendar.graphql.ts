import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CalendarMembersGQL extends Query<{team: {members}}> {
  document = gql`
    query CalendarMember($team: ID!) {
      team(id: $team) {
        members(roles: "developer", orderBy: "user__name") {
          count
          edges {
            node {
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

@Injectable({
  providedIn: 'root'
})
export class CalendarMetricsGQL extends Query<{teamProgressMetrics}> {
  document = gql`
    query CalendarMetrics($team: ID!, $start: Date!, $end: Date!, $group: String!) {
      teamProgressMetrics(team: $team, start: $start, end: $end, group: $group) {
        user {
          id
          name
        }
        metrics {
          start
          end
          timeEstimate
          timeSpent
          timeRemains
          plannedWorkHours
          loading
          payroll
          paid
          issuesCount
          efficiency
        }
      }
    }`;
}

