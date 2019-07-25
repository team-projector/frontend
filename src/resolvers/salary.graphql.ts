import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class SalaryGQL extends Query<{salary}> {
  document = gql`
    query Salary($salary: ID!){
      salary (id: $salary) {
        id
        createdAt
        periodFrom
        periodTo
        chargedTime
        bonus
        taxes
        penalty
        sum
        total
        payed
      }
    }`;
}