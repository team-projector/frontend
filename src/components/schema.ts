import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
  
  type Token {
    key: String
    created: String
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (postId: Int!): Post
    login(login: String, password: String): Token
  }
`;

export const schema = makeExecutableSchema({typeDefs: typeDefs});
