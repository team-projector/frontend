import { Injectable } from '@angular/core';
import { Mutation, Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GetMeGQL extends Query<{ me }> {
  document = gql`
query {
  me {
    id
    name
    email
    glToken
  }
}
`;
}

@Injectable({
  providedIn: 'root'
})
export class EditProfileGQL extends Mutation<{ response }> {
  document = gql`
mutation ($input: UpdateMeInput!) {
   response: updateMe (input: $input) {
     me {
       id
       name
       email
       glToken
     }
   }
}
`;
}
