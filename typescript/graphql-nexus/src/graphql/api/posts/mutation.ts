import { extendType, stringArg, booleanArg } from 'nexus';

export const PostsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPost', {
      type: 'Post',
      args: {
        published: booleanArg({ required: true }),
        content: stringArg(),
        title: stringArg({ required: true }),
        userId: stringArg(),
      },
      resolve: (root, args, context) => {
        const { user } = context;
        const {
          published, title, content, userId,
        } = args;

        if (!user && !userId) {
          throw new Error('User is required for this operation');
        }

        return context.fujix.mutation.createOnePost({
          data: {
            published,
            title,
            content,
            author: {
              connect: {
                id: userId || user!.id,
              },
            },
          },
          select: {
            $default: true,
            author: true,
            comments: true,
          },
        });
      },
    });
    t.field('updatePost', {
      type: 'Post',
      args: {
        id: stringArg({ required: true }),
        content: stringArg(),
        title: stringArg(),
        published: booleanArg(),
      },
      resolve: async (root, args, context) => {
        const { fujix } = context;
        const { id, ...updates } = args;

        const post = await fujix.query.findOnePost({
          where: { id },
        });

        if (!post) {
          throw new Error('Post was not found');
        }

        if (!Object.keys(updates).length) {
          return post;
        }

        const updatedPost = await fujix.mutation.updateOnePost({
          where: {
            id,
          },
          data: {
            ...updates,
          },
          select: {
            $default: true,
            author: true,
            comments: true,
          },
        });

        return updatedPost;
      },
    });
    t.field('deletePost', {
      type: 'Post',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (root, args, context) => {
        const { fujix } = context;
        const { id } = args;

        const post = await fujix.query.findOnePost({
          where: { id },
          select: {
            $default: true,
            author: true,
            comments: true,
          },
        });

        if (!post) {
          throw new Error('Post was not found');
        }

        await fujix.mutation.deleteOnePost({ where: { id } });

        return post;
      },
    });
  },
});

export default {};
