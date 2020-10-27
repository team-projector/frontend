import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllUsersGQL extends Query<{ users }> {
  document = gql`
{
  users: allUsers {
    count
    edges {
      node {
        id
        name
        glAvatar
        roles
        hourRate
        taxRate
        annualPaidWorkBreaksDays
        position {
          title
        }
        metrics {
          lastSalaryDate
          paidWorkBreaksDays
          bonus
          penalty
          issues {
            openedCount
            openedSpent
            closedSpent
            payrollClosed
            payrollOpened
            payroll
            taxesClosed
            taxesOpened
            taxes
          }
          mergeRequests {
            openedCount
            openedSpent
            closedSpent
            payrollClosed
            payrollOpened
            payroll
            taxesClosed
            taxesOpened
            taxes
          }
          openedSpent
          closedSpent
          payrollClosed
          payrollOpened
          payroll
          taxesClosed
          taxesOpened
          taxes
        }
      }
    }
  }
}`;
}
