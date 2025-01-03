import { type SchemaTypeDefinition } from 'sanity'
import { posts } from './blog'
import { authors } from './author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [posts,authors],
}
