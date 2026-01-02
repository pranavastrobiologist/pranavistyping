import React, { useEffect, useState } from 'react';
import { blogStore } from '../lib/store';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(blogStore.getPosts());
    }, []);

    return (
        <div>
            <div style={{
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <h1 style={{ marginBottom: 0 }}>Latests Posts</h1>
            </div>

            {posts.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '80px 0',
                    color: 'var(--text-secondary)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3>No posts yet</h3>
                    <p style={{ marginBottom: '24px' }}>Start writing your first blog post.</p>
                    <Link to="/create" className="btn btn-primary">Create Post</Link>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '24px'
                }}>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
