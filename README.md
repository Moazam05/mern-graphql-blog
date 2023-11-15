
# MERN GraphQL Blog

Blog platform built with the MERN & GraphQL

## Tech Stack

**Client:** React, ReactTypeScript, Redux Toolkit, Material UI, Apollo Client, Formik

**Server:** Node, Express, GraphQL


## Screenshots

![App Screenshot](https://i.postimg.cc/VvWtxpr0/home.png)

![App Screenshot](https://i.postimg.cc/0ySqfsLf/published-blog.png)

![App Screenshot](https://i.postimg.cc/pdjJ00Zz/blog-list.png)

![App Screenshot](https://i.postimg.cc/PfLhxY29/blog-details.png)

![App Screenshot](https://i.postimg.cc/SxkwWMfy/signup.png)

![App Screenshot](https://i.postimg.cc/kGPjq0jn/login.png)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

### Backend ###

```env
NODE_ENV:  development
PORT:      5000
DATABASE:  Insert your MongoDB database connection link
```

## Features

- Authentication (Login, Signup)
- User can create multiple blogs
- User can comments any blog
- Each User can delete his only Blog and comments
- You need to login for publishing blog or deleting blog or comments deleting from blog



## API Reference (GraphQL)

#### Get all Users

```graphql
  {
  users {
    id
    name
    email
  }
}
```
#### Create New User

```graphql
 mutation {
  signup(name: "Salman Muazam", email: "salmanmoazam08@gmail.com", password: "Test$1234") {
    id
    name
    email
    password
  }
}
```
#### Login User

```graphql
mutation {
  login(email: "salmanmoazam08@gmail.com", password: "Test$1234") {
    id
    name
    email
    password
  }
}
```
#### Get all Blogs

```graphql
  {
  blogs {
    id
    title
    content
    date
  }
}
```

#### Get all Comments

```graphql
 {
  comments {
    id
    text
    date
  }
}
```

#### This project encompasses a variety of endpoints, each serving distinct functionalities.
You can look at the ⬇ below file reference.

- Create New Blog
- Update Blog
- Delete Blog etc.

```graphql
{
  blog-backend {
    src {
      schema {
        schema.ts
      }
    }
  }
}
```

<div align="center">

---

Made with ❤️ by Muazam

</div>
