import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class MilestoneGQL extends Query<{ milestone }> {
  document = gql`
    query ($milestone: ID!) {
      milestone(id: $milestone) {
        id
        title
      }
    }`;
}
