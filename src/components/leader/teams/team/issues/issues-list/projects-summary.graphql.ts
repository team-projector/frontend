import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {ProjectSummary} from '../../../../../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSummaryGQL extends Query<{ issuesSummary: { projects: ProjectSummary[] } }> {
  document = gql`
    query IssuesSummary($team: ID, $user: ID, $dueDate: Date) {
  issuesSummary(team: $team, user: $user, dueDate: $dueDate) {
    projects {
      project {
        id
        fullTitle
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
