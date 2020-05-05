import { objectType, enumType } from 'nexus';

export * from './query';
export * from './mutation';

export const Role = enumType({
  name: 'Role',
  members: ['AUTHOR', 'ADMIN'],
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('updatedAt');
    t.string('createdAt');
    t.string('email');
    t.field('role', {
      type: Role,
    });
    t.field('posts', {
      type: 'Post',
      list: true,
      resolve: (root, args, context) => context.fujix.query
        .findManyPost({
          where: { author: { id: { equals: root.id } } },
          select: { $default: true, author: true, comments: true },
        }),
    });
  },
});

export default {};
