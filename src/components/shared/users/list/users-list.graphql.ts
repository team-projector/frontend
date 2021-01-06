import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllUsersGQL extends Query<{ users }> {
  document = gql`
query ($offset: Int, $first: Int) {
  users: allUsers(offset: $offset, first: $first) {
    count
    edges {
      node {
        id
        name
        glAvatar
        roles
        hourRate
        customerHourRate
        taxRate
        dailyWorkHours
        annualPaidWorkBreaksDays
        position {
          title
        }
        metrics {
          lastSalaryDate
          paidWorkBreaksDays
          payroll
          payrollClosed
          payrollOpened
          taxes
        }
      }
    }
  }
}`;
}
