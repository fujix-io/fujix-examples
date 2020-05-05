import { makeSchema } from 'nexus';
import path from 'path';

import * as types from './types';

const rawSchema = makeSchema({
  types,
  shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
  outputs: {
    schema: path.join(__dirname, '../../../generated/schema.graphql'),
    typegen: path.join(__dirname, '../../../generated/types.d.ts'),
  },
});

export default rawSchema;
