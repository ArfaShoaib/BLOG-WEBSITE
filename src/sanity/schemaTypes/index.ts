import { type SchemaTypeDefinition } from 'sanity'
import { posts } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [posts],
}
