import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllBonusesGQL extends Query<{allBonuses}> {
  document = gql`
    query ($salary: ID, $user: ID) {
      allBonuses(salary: $salary, user: $user) {
        count
        edges {
          node {
            id
            sum
            comment
          }
        }
      }
    }`;
}

@Injectable({
  providedIn: 'root'
})
export class AllPenaltiesGQL extends Query<{allPenalties}> {
  document = gql`
    query ($salary: ID, $user: ID) {
      allPenalties(salary: $salary, user: $user) {
        count
        edges {
          node {
            id
            sum
            comment
          }
        }
      }
    }`;
}
