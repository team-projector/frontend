import { GraphQLScalarType, Kind } from 'graphql';
import { IResolvers } from 'graphql-tools';
import { find } from 'lodash';

const token = {
  key: 'mock_key',
  created: (new Date()).toString()
};

const tokenResult = {
  token: token
};

const issuesMetrics = {
  openedCount: 5,
  openedSpent: 6,
  closedSpent: 7,
};

const userMetrics = {
  bonus: 1000,
  penalty: 0,
  payrollClosed: 10000,
  payrollOpened: 3000,
  issues: issuesMetrics,
  mergeRequests: issuesMetrics
};

const me = {
  // id: '1',
  // name: 'User name',
  glAvatar: null,
  metrics: userMetrics
};

const projectsResults = [
  {
    project: {
      id: '1',
      title: 'Project title',
      fullTitle: 'Project full title',
      group: {
        fullTitle: 'Group full title'
      }
    }
  }
];

export const mocks: IResolvers = {
  Query: () => ({
    // token: () => token,
    me: () => me,
    project: (_, {id}) => find(projectsResults, {id})
  }),

  Mutation: () => ({
    login: (_, login: String, password: String) => tokenResult
  }),

  Date: () => new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),

  User: () => ({name: 'eee'})
};
