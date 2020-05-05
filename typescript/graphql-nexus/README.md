# GraphQL Nexus TS example

This example features a GraphQL server app built with [Nexus](https://nexus.js.org/). We are going to use Fuji X project from the [Quick Start](https://docs.fujix.io/getting-started/overview) guide.
It's a simple blog, similar to a default Fuji X project, just with an additional `Comment` model.

## Requirements

1. Create Fuji X account if you don't have one or request an invitation.
2. Follow a [Quick Start](https://docs.fujix.io/getting-started/overview) guide to create and deploy a project.

## Example usage

1. Clone the repository.
2. Go to `fujix-examples/typescript/graphql-nexus` folder and run `npm install`.
3. Get Fuji X API endpoint and API key values at `/endpoint` page.
4. Create `.env` file and add there `FUJIX_PROJECT_URL` and `FUJIX_API_KEY` values. 
5. Run `npm run generate` command to generate a client for your Fuji X endpoint.
6. Run `npm run dev` command to launch the script.

## 📚 Data Admin

In Fuji X web app you can use a UI to view data stored in a connected database.

## 🏄‍♂️ Explorer 

Use "Explorer" to send GraphQL queries to the Fuji X endpoint.
