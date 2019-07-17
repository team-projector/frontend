export const queries = {
  login: `mutation query($login: String!, $password: String!) {
  login(login: $login, password: $password) {
    token {
      key
      created
    }
  }
}`
};
