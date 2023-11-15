import { gql } from "@apollo/client";

const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      date
      user {
        id
        name
      }
    }
  }
`;

export { GET_BLOGS };
