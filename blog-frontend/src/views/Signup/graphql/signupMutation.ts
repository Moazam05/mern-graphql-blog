import { gql } from "@apollo/client";

const SIGNUP_USER = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export { SIGNUP_USER };
