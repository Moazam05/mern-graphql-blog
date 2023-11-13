import { gql } from "@apollo/client";

const ADD_BLOG = gql`
  mutation addBlog($title: String!, $content: String!, $userId: String!) {
    addBlog(title: $title, content: $content, userId: $$userId) {
      id
      title
      content     
    }
  }
`;

export { ADD_BLOG };
