
import { defineType, defineField, defineArrayMember } from "sanity"

export const posts = defineType({
    name: 'Blog_Posts',
    type: 'document',
    title: 'Blog Posts',
    fields: [
        defineField({
            name: 'Post_Posts',
            type: 'string',
            title: 'Post Title',
            description: "Title Of Post",
            validation: Rule => Rule.required()
        }),

        // SLUG FIELD
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: {
                source: "Post_Posts", // <-- Fixed the source field
                maxLength: 90
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            title: 'Description',
            name: 'description',
            type: 'text',
            validation: Rule => Rule.required()
        }),
        defineField({
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true // <-- Defaults to false
            },
        }),
        defineField({
            title: 'Content',
            name: 'content',
            type: 'array',
            of: [
                defineArrayMember({ type: 'block' })
            ]
        }),
        defineField({
            name: "author",
            type: 'reference',
            title: 'Author',
            to: [{
                type: 'author'
            }]
        })
    ]
});
