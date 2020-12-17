import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProjectsGQL extends Query<{ projects }> {
  document = gql`
{
  projects: allProjects(state: [DEVELOPING, SUPPORTING], orderBy: "title") {
    count
    edges {
      node {
        id
        title
        fullTitle
        group {
          title
          glAvatar
        }
      }
    }
  }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectMilestonesGQL extends Query<{ milestones }> {
  document = gql`
query ($project: ID!) {
  milestones: allMilestones(project: $project, state: ACTIVE) {
    count
    edges {
      node {
        id
        title
        dueDate
      }
    }
  }
}
`;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectTeamMembersGQL extends Query<{ project }> {
  document = gql`
query ($id: ID!) {
  project(id: $id) {
    team {
      members {
        count
        edges {
          node {
            roles
            user {
              id
              name
              glAvatar
            }
          }
        }
      }
    }
  }
}
`;
}

@Injectable({
  providedIn: 'root'
})
export class CreateIssueGQL extends Query<{ response }> {
  document = gql`
mutation(
    $title: String!
    $project: ID!
    $milestone: ID
    $user: ID!
    $labels: [String]
    $estimate: Int
    $dueDate: Date!
) {
    response: createIssue(
        title: $title
        project: $project
        milestone: $milestone
        user: $user
        labels: $labels
        estimate: $estimate
        dueDate: $dueDate
    ) {
        issue {
            glUrl
        }
    }
}
`;
}
