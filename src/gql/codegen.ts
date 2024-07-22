import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'schema.graphql',
    documents: ['../components/**/*.tsx', '../app/**/*.tsx'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/': {
            preset: 'client'
        }
    }
}

export default config