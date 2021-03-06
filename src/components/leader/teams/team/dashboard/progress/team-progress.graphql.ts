import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { TeamMemberSort } from 'src/models/enums/team-member';

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

@Injectable({
  providedIn: 'root'
})
export class TeamMetricsGQL extends Query<{ metrics }> {
  document = gql`
query($team: ID!, $start: Date!, $end: Date!, $group: GroupProgressMetrics!) {
    metrics: teamProgressMetrics(
        team: $team
        start: $start
        end: $end
        group: $group
    ) {
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

