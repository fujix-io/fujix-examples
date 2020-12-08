const FujiX = require('./generated/fujix/').default;

const fujix = new FujiX({
  url: 'https://SLUG.fujix.io',
  apiKey: 'TOKEN',
});

async function main() {
  try {
    const user = await fujix.mutation.createOneUser({
      data: {
        name: 'Fyodor D.',
        email: 'dostoevsky@fujix.io',
        role: 'ADMIN',
        posts: {
          create: [
            { title: 'Notes from Underground', published: true },
            { title: 'Crime and Punishment', published: true },
            { title: 'Demons', published: true },
          ],
        },
      },
    });
    console.log('A user was created', user);
  
    const posts = await fujix.query.findManyPost({
      where: { author: { id: { equals: user.id } } },
      orderBy: [{ title: 'asc' }],
      select: {
        id: true,
        title: true,
        author: { name: true },
      },
    });
    console.log('Posts ordered by title', posts);
  
    const updatedUser = await fujix.mutation.updateOneUser({
      where: { email: 'dostoevsky@fujix.io' },
      data: { role: 'AUTHOR' },
    });
    console.log('A user was updated', updatedUser);
  
    const newPost = await fujix.mutation.createOnePost({
      data: {
        title: 'The Idiot',
        published: true,
        author: {
          connect: { id: user.id },
        },
      },
    });
    console.log('A post was created', newPost);
  } catch (e) {
    console.error(e);
  }
};

main();
