import { defineType, defineField } from "sanity"
export const authors = defineType({
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [
        defineField({
            name:'name',
            type:'string',
            title:"Author's Name"
        }),
        defineField({
            name:'bio',
            type:'text',
            title:"Author's Bio"
            
        }),
        defineField({
            name:'image',
            type:'image',
            title:'Image',
            options:{
                hotspot:true
            }
        }),
    ]
})