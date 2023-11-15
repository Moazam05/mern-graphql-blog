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

const DELETE_BLOG = gql`
  mutation deleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

const ADD_COMMENT_TO_BLOG = gql`
  mutation addCommentToBlog(
    $text: String!
    $date: String!
    $userId: ID!
    $blogId: ID!
  ) {
    addCommentToBlog(
      text: $text
      date: $date
      userId: $userId
      blogId: $blogId
    ) {
      id
      text
      date
    }
  }
`;

const DELETE_COMMENT_TO_BLOG = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export { ADD_BLOG, DELETE_BLOG, ADD_COMMENT_TO_BLOG, DELETE_COMMENT_TO_BLOG };
