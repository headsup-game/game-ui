import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://headsup-indexer.up.railway.app/',
  documents: 'src/graphQueries/**/*.ts',
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        // scalars: {
        //   BigInt: 'string',
        // },
        withHooks: true, // Enables generating React hooks
        withHOC: false,  // Disables higher-order components (optional)
        withComponent: false, // Disables component wrappers (optional)
      },
    }
  }
}

export default config;  
