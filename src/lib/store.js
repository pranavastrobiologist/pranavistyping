import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'blog_posts';

export const blogStore = {
    getPosts: () => {
        const posts = localStorage.getItem(STORAGE_KEY);
        return posts ? JSON.parse(posts) : [];
    },

    getPost: (id) => {
        const posts = blogStore.getPosts();
        return posts.find((post) => post.id === id);
    },

    createPost: (post) => {
        const posts = blogStore.getPosts();
        const newPost = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            ...post,
        };
        const updatedPosts = [newPost, ...posts];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        return newPost;
    },

    deletePost: (id) => {
        const posts = blogStore.getPosts();
        const updatedPosts = posts.filter((post) => post.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    }
};
