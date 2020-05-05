import { objectType } from 'nexus';

export * from './query';
export * from './mutation';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.id('id');
    t.boolean('published');
    t.string('title');
    t.string('updatedAt');
    t.string('createdAt');
    t.string('content', {
      nullable: true,
    });
    t.field('author', {
      type: 'User',
      nullable: true,
    });
    t.field('comments', {
      type: 'Comment',
      nullable: true,
      list: true,
      resolve: (root, args, context) => context.fujix.query
        .findManyComment({
          where: { post: { id: { equals: root.id } } },
          select: { $default: true, author: true, post: true },
        }),
    });
  },
});

export default {};
