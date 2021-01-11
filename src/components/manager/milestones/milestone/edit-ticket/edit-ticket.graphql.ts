import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TicketGQL extends Query<{ ticket }> {
  document = gql`
query($ticket: ID!) {
    ticket(id: $ticket) {
        id
        type
        title
        role
        startDate
        dueDate
        estimate
        state
        url
        milestone {
            id
            title
        }
        issues {
            count
            edges {
                node {
                    id
                    title
                    user {
                        id
                        name
                        glAvatar
                    }
                    project {
                        title
                        group {
                            title
                        }
                    }
                    state
                    closedAt
                }
            }
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class FindMilestonesGQL extends Query<{ milestones }> {
  document = gql`
query ($q: String) {
  milestones: allMilestones(q: $q) {
    count
    edges {
      node {
        id
        title
        owner {
          title
        }
      }
    }
  }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class CreateTicketGQL extends Mutation<{ response }> {
  document = gql`
mutation(
    $milestone: ID!
    $type: TicketType!
    $state: TicketState!
    $title: String!
    $role: String
    $startDate: Date!
    $dueDate: Date!
    $url: String
    $issues: [ID]!
) {
    response: createTicket(
        milestone: $milestone
        type: $type
        state: $state
        title: $title
        role: $role
        startDate: $startDate
        dueDate: $dueDate
        url: $url
        issues: $issues
    ) {
        ticket {
            milestone {
                id
            }
            type
            title
            role
            startDate
            dueDate
            url
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class EditTicketGQL extends Mutation<{ response }> {
  document = gql`
mutation(
    $id: ID!
    $type: TicketType!
    $state: TicketState!
    $milestone: ID
    $title: String!
    $role: String
    $startDate: Date!
    $dueDate: Date!
    $estimate: Int
    $url: String
    $issues: [ID]!
) {
    response: updateTicket(
        id: $id
        type: $type
        state: $state
        milestone: $milestone
        title: $title
        role: $role
        startDate: $startDate
        dueDate: $dueDate
        estimate: $estimate
        url: $url
        issues: $issues
    ) {
        ticket {
            id
            milestone {
                id
            }
            type
            state
            title
            role
            startDate
            dueDate
            url
        }
    }
}`;
}

@Injectable({
  providedIn: 'root'
})
export class FindIssuesGQL extends Query<{ issues }> {
  document = gql`
query($q: String) {
    issues: allIssues(q: $q) {
        count
        edges {
            node {
                id
                title
                user {
                    id
                    name
                    glAvatar
                }
                project {
                    title
                    group {
                      title
                    }
                }
                state
                closedAt
            }
        }
    }
}`;
}
