export const queries = {
  members: `query ($team: ID!) {
      team(id: $team) {
        members(roles: "developer", orderBy: "user__name") {
          count
          edges {
            node {
              user {
                id
                glAvatar
                name
                problems
                metrics {
                  issuesClosedSpent
                  issuesOpenedSpent
                }
              }
            }
          }
        }
      }
    }`,
  metrics: `query ($team: ID!, $start: Date!, $end: Date!, $group: String!) {
  teamProgressMetrics(team: $team, start: $start, end: $end, group: $group) {
    user {
      id
      name
    }
    metrics {
      start
      end
      timeEstimate
      timeSpent
      timeRemains
      plannedWorkHours
      loading
      payroll
      paid
      issuesCount
      efficiency
    }
  }
}`
};
