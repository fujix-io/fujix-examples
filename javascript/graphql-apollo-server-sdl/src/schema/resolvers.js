const resolvers = {
  Query: {
    posts: (parent, args, ctx) => {
      const where = {};

      if (args.searchString) {
        where.OR = [
          { title: { contains: args.searchString } },
          { content: { contains: args.searchString } },
        ];
      }

      if (args.isPublished !== undefined) where.published = { equals: args.isPublished };

      return ctx.fujix.query.findManyPost({ where });
    },
    post: (parent, args, ctx) => {
      return ctx.fujix.query.findOnePost({ where: { id: args.id } })
    },
  },
  Mutation: {
    signUp: async (parent, { email, name, role, posts }, ctx) => {
      const user = await ctx.fujix.query.findOneUser({ where: { email } });
      if (user) throw new Error('Email address is already in use');

      return ctx.fujix.mutation.createOneUser({ 
        data: { 
          email, 
          name, 
          role,
          posts: { create: posts.map(post => ({ ...post, published: true })) },
        },
      });
    },
    createPost: async (parent, { title, content, authorId }, ctx) => {
      const author = await ctx.fujix.query.findOneUser({ where: { id: authorId }, select: { id: true } });
      if (!author) throw new Error('Author does not exist');

      const post = ctx.fujix.mutation.createOnePost({
        data: {
          title,
          content,
          published: false,
          author: { connect: { id: authorId } },
        },
      });

      return post;
    },
    publishPost: async (parent, args, ctx) => {
      const post = await ctx.fujix.query.findOnePost({ where: { id: args.id }, select: { id: true } });
      if (!post) throw new Error('Post does not exist');

      return ctx.fujix.mutation.updateOnePost({ where: { id: args.id }, data: { published: true } });
    },
    deletePost: async (parent, args, ctx) => {
      const post = await ctx.fujix.query.findOnePost({ where: { id: args.id }, select: { id: true } });
      if (!post) throw new Error('Post to delete does not exist');

      return ctx.fujix.mutation.deleteOnePost({ where: { id: args.id } });
    },
  },
  User: {
    posts: async (parent, arg, ctx) => {
      return ctx.fujix.query.findManyPost({ where: { author: { id: { equals: parent.id } } } });
    },
  },
  Post: {
    author: async (parent, arg, ctx) => {
      const { author } = await ctx.fujix.query.findOnePost({ where: { id: parent.id }, select: { author: true } });

      return author;
    },
  }
};

module.exports = {
  resolvers,
};
