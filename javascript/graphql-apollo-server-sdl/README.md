# GraphQL ApolloServer SDL-first JS example

This example implements Apollo GraphQL server with Node.js built up using [SDL-first](https://www.apollographql.com/docs/resources/graphql-glossary/#schema-first-development) approach. We are going to use default Fuji X "Blog" project.

## Requirements

1. [Create Fuji X account](https://app.fujix.io/sign-up) if you don't already have one.
2. Create a project and wait for the first deployment to be completed.
3. This example is created for a "Blog" project template which is a default one for new Fuji X projects.

## Example usage

1. Clone the repository.
2. Go to `fujix-examples/javascript/graphql-apollo-server-sdl` folder and run `npm install`.
3. Get Fuji X API endpoint and API key values at `/endpoint` page.
4. Run `npm run generate` command to generate a client for your Fuji X endpoint.
5. CLI will ask you for the endpoint URL and API key. Get them on the "🚀 Endpoint" page in Fuji X web app.
6. Also, set URL and API key in yours in `index.js`.
7. Run `npm run dev` command to launch the script.

## Example operations

**Create a user with posts**

```
mutation signUp {
  signUp(
    email: "dostoevsky@fujix.io"
    name: "Fyodor D."
    posts: [{ title: "Crime and Punishment" }]
  ) {
    id
    posts {
      title
    }
  }
}
```

**Create a post**

```
mutation createPost {
  createPost(
    title: "Notes from Underground"
    # Update authorId value
    authorId: "cke8g5vtg00000ujf5y6a9uzf"
  ) {
    id
    author {
      name
    }
  }
}
```

**Get all posts**

```
query posts {
  posts {
    id
    title
    published
  }
}
```

**Find posts**

```
query findPosts {
  posts(searchString: "Punishment") {
    id
    title
    published
    author {
      name
    }
  }
}
```

## 📚 Data Admin

In Fuji X web app you can use a UI to view data stored in a connected database.

## 🏄‍♂️ Explorer 

Use "Explorer" to send GraphQL queries to the Fuji X endpoint.

For example, to delete all posts and users run this mutation:

```
mutation {
  deleteManyPost {
    count
  }
  deleteManyUser {
    count
  }
}
```