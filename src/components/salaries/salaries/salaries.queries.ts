export const queries = {
  salaries: `query ($user: ID, $offset: Int, $first: Int){
  allSalaries (user: $user, offset: $offset, first: $first) {
    count
    edges {
      node {
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
    }
  }
}`
};
