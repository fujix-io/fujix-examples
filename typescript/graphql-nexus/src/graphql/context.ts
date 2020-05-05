import { IncomingMessage } from 'http';

import FujiX, { User } from '../../generated/fujix';

import fujix from '../fujix';

export interface Context {
  user?: User | null,
  fujix: FujiX,
}

const context = async ({ req }: { req: IncomingMessage; }) => {
  const ctx: Context = {
    fujix,
  };

  // Fake authentication
  if (req.headers?.userid) {
    const user = await fujix.query.findOneUser({ where: { id: req.headers?.userid as string } });
    ctx.user = user;
  }

  return ctx;
};

export default context;
