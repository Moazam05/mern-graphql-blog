import { gql } from "@apollo/client";

const GET_BLOG = gql`
  query getBlog($id: ID!) {
    getBlog(id: $id) {
      title
      content
      date
      user {
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
