import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class TeamGQL extends Query<{team}> {
  document = gql`
    query Team($team: ID!) {
      team(id: $team) {
        id
        title
      }
    }`;
}
