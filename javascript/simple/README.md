# Simple JS script example

In this example, you'll see how to to generate a Fuji X client and use it for CRUD operations within your Fuji X endpoint.

## Requirements

1. Create Fuji X account if you don't have one or request an invitation.
2. Create a project and wait for the first deployment to be completed.
3. This example is created for a "Blog" project template which is a default one for new Fuji X projects.

## Example usage

Here is a video that shows up how to set up and launch this example — will be uploaded soon 🙌

1. Clone the repository.
2. Go to `fujix-examples/javascript/simple` folder and run `npm install`.
3. Run `npm run generate` command to generate a client for your Fuji X endpoint.
4. CLI will ask you for the endpoint URL and API key. Get them on the "🚀 Endpoint" page in Fuji X web app.
5. Also, set URL and API key in yours in `index.js`.
6. Run `npm start` command to launch the script.

## Code overview

1. First, a user with 3 posts will be created.
2. Then, we'll query all posts ordered by a title.
3. A user will be updated.
4. Finally, we'll create one more post.

You'll see an output like this one in a console:

```
A user was created { createdAt: '2020-02-17T12:54:53.419Z',
  email: 'dostoevsky@fujix.io',
  id: 'ck6qgo2jw00060ulbpzf5zlne',
  name: 'Fyodor D.',
  role: 'ADMIN',
  updatedAt: '2020-02-17T12:54:53.419Z' }
Posts ordered by title [ { id: 'ck6qgo2ke00080ulbo3pe5o8g',
    title: 'Crime and Punishment',
    author: { name: 'Fyodor D.' } },
  { id: 'ck6qgo2kg00090ulb6j13ph0s',
    title: 'Demons',
    author: { name: 'Fyodor D.' } },
  { id: 'ck6qgo2k000070ulbyl8ayxhn',
    title: 'Notes from Underground',
    author: { name: 'Fyodor D.' } } ]
A user was updated { createdAt: '2020-02-17T11:40:52.692Z',
  email: 'dostoevsky5@fujix.io',
  id: 'ck6qe0w2c00000umeh293kyg6',
  name: 'Fyodor D.',
  role: 'AUTHOR',
  updatedAt: '2020-02-17T12:54:55.306Z' }
A post was created { content: null,
  createdAt: '2020-02-17T12:54:55.832Z',
  id: 'ck6qgo4ez00100ulbvl3qra67',
  published: true,
  title: 'The Idiot',
  updatedAt: '2020-02-17T12:54:55.832Z' }
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
