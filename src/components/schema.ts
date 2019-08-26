import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  scalar Date

  enum UserRole {
    developer
    team_leader
    project_manager
    customer
    shareholder
  }
  
  type Token {
    key: String
    created: Date
  }
  
  type TokenResult {
    token: Token
  }
  
  type IssuesMetrics {
    openedCount: Int
    openedSpent: Int
    closedSpent: Int
  }
  
  type UserMetrics {
    bonus: Int
    penalty: Int
    payrollClosed: Int
    payrollOpened: Int
    issues: IssuesMetrics
    mergeRequests: IssuesMetrics
  }
  
  interface IUser {
    id: ID!
    name: String
    glAvatar: String
    roles: [UserRole]
    metrics: UserMetrics
  }
  
  type User implements IUser {
    id: ID!
    name: String
    glAvatar: String
    roles: [UserRole]
    metrics: UserMetrics
  }
  
  type ProjectGroup {
    fullTitle: String
  }
  
  type Project {
    id: String
    title: String
    fullTitle: String
    group: ProjectGroup
  }
  
  # the schema allows the following query:
  type Query {
    token: Token
    me: User
    project(id: Int!): Project
  }

  # this schema allows the following mutation:
  type Mutation {
    login(login: String, password: String): TokenResult
  }
`;

export const schema = makeExecutableSchema({typeDefs: typeDefs});
