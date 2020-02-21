import FujiX from './generated/fujix';

const fujix = new FujiX({
  url: 'https://SLUG.fujix.io',
  authorization: 'TOKEN'
});

const main = async () => {
  try {
    const user = await fujix.mutation.createOneUser({
      data: {
        name: 'Fyodor D.',
        email: 'dostoevsky@fujix.io',
        role: 'ADMIN',
        posts: {
          create: [
            { title: 'Notes from Underground' },
            { title: 'Crime and Punishment' },
            { title: 'Demons' },
          ],
        },
      },
    });
    console.log('A user was created', user);
  
    const posts = await fujix.query.findManyPost({
      where: { author: { id: { equals: user.id } } },
      orderBy: { title: 'asc' },
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
        author: {
          connect: { id: user.id },
        },
      },
    });
    console.log('A post was created', newPost);
  } catch (e) {
    console.log(e);
  }
};

main();