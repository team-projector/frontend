export const query = `query {
  gitlabStatus {
    services {
      name
      time
    }
    lastSync
    lastIssues {
      edges {
        node {
          id
          title
          glUrl
          project {
            fullTitle
          }
          user {
            name
          }
        }
      }
    }
  }
}`;
