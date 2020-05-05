import { extendType, arg, stringArg } from 'nexus';

export const UsersMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      args: {
        email: stringArg({ required: true }),
        name: stringArg({ required: true }),
        role: arg({ type: 'Role', required: true }),
      },
      resolve: (root, args, context) => {
        const { email, name, role } = args;
        return context.fujix.mutation.createOneUser({
          data: {
            email,
            name,
            role,
          },
        });
      },
    });
    t.field('updateUser', {
      type: 'User',
      args: {
        id: stringArg({ required: true }),
        role: arg({ type: 'Role' }),
        name: stringArg(),
        email: stringArg(),
      },
      resolve: async (root, args, context) => {
        const { fujix } = context;
        const { id, ...updates } = args;

        const user = await fujix.query.findOneUser({
          where: { id },
          select: {
            $default: true,
            comments: true,
            posts: true,
          },
        });

        if (!user) {
          throw new Error('User was not found');
        }

        if (!Object.keys(updates).length) {
          return user;
        }

        const updatedUser = await fujix.mutation.updateOneUser({
          where: { id },
          data: updates,
          select: {
            $default: true,
            comments: true,
            posts: true,
          },
        });

        return updatedUser;
      },
    });
    t.field('deleteUser', {
      type: 'User',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (root, args, context) => {
        const { fujix } = context;
        const { id } = args;

        const user = await fujix.query.findOneUser({
          where: { id }, select: { $default: true, posts: true, comments: true },
        });

        if (!user) {
          throw new Error('User was not found');
        }

        await fujix.mutation.deleteOneUser({
          where: { id },
        });

        return user;
      },
    });
  },
});

export default {};
