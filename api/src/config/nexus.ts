import {
  fieldAuthorizePlugin,
  makeSchema,
} from 'nexus';
import { join } from 'path';

import * as types from '../apollo';

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), '/src/nexus_generated/schema.graphql'),
    typegen: join(process.cwd(), '/src/nexus_generated/nexus-typegen.ts'),
  },
  contextType: {
    module: join(process.cwd(), './src/utils/context.ts'),
    export: 'Context',
  },
  plugins: [fieldAuthorizePlugin()],
});
