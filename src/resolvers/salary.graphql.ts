import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class SalaryGQL extends Query<{ salary }> {
  document = gql`
    query ($salary: ID!){
      salary (id: $salary) {
        id
        hourRate
        taxRate
        position {
          title
        }
        user {
          glAvatar
          position {
            title
          }
        }
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
