import { gql } from "@apollo/client";

const ADD_BLOG = gql`
  mutation addBlog(
    $title: String!
    $content: String!
    $date: String!
    $userId: ID!
  ) {
    addBlog(title: $title, content: $content, date: $date, userId: $userId) {
      id
      title
      content
    }
  }
`;

export { ADD_BLOG };
