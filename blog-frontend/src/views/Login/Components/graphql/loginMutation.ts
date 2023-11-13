import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      blogs {
        id
      }
      comments {
        id
      }
    }
  }
`;

export { LOGIN_USER };
