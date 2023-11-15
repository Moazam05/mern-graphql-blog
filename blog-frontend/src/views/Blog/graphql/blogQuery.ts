import { gql } from "@apollo/client";

const GET_BLOGS = gql`
  query getBlogs {
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
