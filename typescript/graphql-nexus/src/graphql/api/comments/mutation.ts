import {
  extendType, stringArg,
} from 'nexus';

export const CommentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createComment', {
      type: 'Comment',
      args: {
        postId: stringArg({ required: true }),
        content: stringArg({ required: true }),
        userId: stringArg(),
      },
      resolve: (root, args, context) => {
        const { user } = context;
        const { postId, content, userId } = args;

        if (!user && !userId) {
          throw new Error('User is required for this operation');
        }

        return context.fujix.mutation.createOneComment({
          data: {
            content,
            post: { connect: { id: postId } },
            author: { connect: { id: userId || user!.id } },
          },
          select: {
            $default: true,
            author: true,
            post: true,
          },
        });
      },
    });
    t.field('updateComment', {
      type: 'Comment',
      args: {
        id: stringArg({ required: true }),
        content: stringArg(),
      },
      resolve: async (root, args, context) => {
        const { fujix } = context;
        const { id, ...updates } = args;

        const comment = await fujix.query.findOneComment({
          where: { id },
          select: {
            $default: true,
            author: true,
            post: true,
          },
        });

        if (!comment) {
          throw new Error('Comment was not found');
        }

        if (!Object.keys(updates).length) {
          return comment;
        }

        const updatedComment = fujix.mutation.updateOneComment({
          where: { id },
          data: updates,
          select: {
            $default: true,
            author: true,
            post: true,
          },
        });

        return updatedComment;
      },
    });
    t.field('deleteComment', {
      type: 'Comment',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (root, args, context) => {
        const { fujix } = context;
        const { id } = args;

        const comment = await fujix.query.findOneComment({
          where: { id },
          select: {
            $default: true,
            author: true,
            post: true,
          },
        });

        if (!comment) {
          throw new Error('Comment was not found');
        }

        await fujix.mutation.deleteOneComment({ where: { id } });

        return comment;
      },
    });
  },
});

export default {};
