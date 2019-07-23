import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class MeGQL extends Query<{me}> {
  document = gql`
    query Me {
      me {
        id
        name
        glAvatar
        roles
        metrics {
          bonus
          penalty
          issues {
            openedCount
            openedSpent
            closedSpent
          }
          mergeRequests {
            openedCount
            openedSpent
            closedSpent
          }
          payrollClosed
          payrollOpened
        }
      }
    }`;
}
