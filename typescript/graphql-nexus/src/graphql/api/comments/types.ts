import { objectType } from 'nexus';

export * from './mutation';

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.string('id');
    t.string('createdAt');
    t.string('updatedAt');
    t.string('content', { nullable: true });
    t.field('post', {
      type: 'Post',
      nullable: true,
    });
    t.field('author', {
      type: 'User',
      nullable: true,
    });
  },
});

export default {};
