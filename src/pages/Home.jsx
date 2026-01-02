import React, { useEffect, useState } from 'react';
import { blogStore } from '../lib/store';
import PostCard from '../components/PostCard';
import { PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(blogStore.getPosts());
    }, []);

    return (
        <div>
            <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '3rem',
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '16px'
                }}>
                    Simplicity is the soul of wit.
                </h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    Welcome to your personal space for thoughts, ideas, and stories.
                </p>
            </header>

            {posts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                    <div style={{
                        background: 'var(--bg-glass)',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                    }}>
                        <PenTool size={40} />
                    </div>
                    <h3>No posts yet</h3>
                    <p>Start writing your first blog post today.</p>
                    <div style={{ marginTop: '20px' }}>
                        <Link to="/create" className="btn btn-primary">Create Post</Link>
                    </div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
