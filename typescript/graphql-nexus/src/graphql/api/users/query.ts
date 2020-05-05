import { extendType, arg } from 'nexus';

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('users', {
      type: 'User',
      args: {
        ids: arg({ type: 'String', list: true }),
      },
      list: true,
      resolve: (root, args, ctx) => {
        if (args.ids) {
          return ctx.fujix.query.findManyUser({ where: { id: { in: args.ids } } });
        }

        return ctx.fujix.query.findManyUser();
      },
    });
    t.field('user', {
      args: {
        id: arg({ type: 'String', required: true }),
      },
      type: 'User',
      resolve: (root, args, ctx) => ctx.fujix.query.findOneUser({ where: { id: args.id } }),
    });
  },
});

export default {};
