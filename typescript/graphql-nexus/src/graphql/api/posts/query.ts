import { extendType, arg } from 'nexus';

export const PostsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('posts', {
      type: 'Post',
      list: true,
      args: {
        authorIds: arg({ type: 'String', list: true }),
      },
      resolve: (root, args, context) => {
        if (args.authorIds) {
          return context.fujix.query
            .findManyPost({
              where: { author: { id: { in: args.authorIds } } },
              select: { $default: true, author: true },
            });
        }

        return context.fujix.query
          .findManyPost({ select: { $default: true, author: true } });
      },
    });
    t.field('post', {
      type: 'Post',
      args: { id: arg({ type: 'String', required: true }) },
      resolve: (root, args, context) => context.fujix.query
        .findOnePost({ where: { id: args.id }, select: { $default: true, author: true } }),
    });
  },
});

export default {};
