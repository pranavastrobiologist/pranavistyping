/**
 * Sanity Content Schema Definitions
 * 
 * Since we don't have a Studio yet, we define the expected schemas here
 * to guide our Content Adapter implementation.
 */

export const schema = {
    // Blog Post Document
    post: {
        name: 'post',
        fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'slug', type: 'slug', title: 'Slug' },
            { name: 'excerpt', type: 'text', title: 'Excerpt' },
            { name: 'content', type: 'array', of: [{ type: 'block' }], title: 'Content' },
            { name: 'coverImage', type: 'image', title: 'Cover Image' },
            { name: 'publishedAt', type: 'datetime', title: 'Published at' },
            { name: 'author', type: 'reference', to: [{ type: 'author' }] }
        ]
    },

    // Site Settings (Singleton)
    siteSettings: {
        name: 'siteSettings',
        fields: [
            { name: 'title', type: 'string', title: 'Site Title' },
            { name: 'description', type: 'text', title: 'Site Description' },
            { name: 'navigation', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'url', type: 'string' }] }] }
        ]
    },

    // Author
    author: {
        name: 'author',
        fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'avatar', type: 'image', title: 'Avatar' }
        ]
    }
};
