import { gql } from "@apollo/client";

const GET_BLOG = gql`
  query blog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      date
      user {
        id
        name
        email
      }
      comments {
        text
        user {
          name
        }
      }
    }
  }
`;

export { GET_BLOG };
