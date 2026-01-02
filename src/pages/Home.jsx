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
            <header style={{
                height: '80vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '40px'
            }}>
                {/* Spacer to reveal fixed background */}
            </header>

            <section className="container glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '40px',
                    borderBottom: '2px solid var(--border-color)',
                    paddingBottom: '10px'
                }}>
                    <h2 style={{ fontFamily: '"Permanent Marker", cursive', fontSize: '2rem' }}>Latest Scripts</h2>
                    <Link to="/create" className="btn btn-primary" style={{ border: '2px solid var(--text-primary)', background: 'transparent', color: 'var(--text-primary)', fontWeight: 'bold', boxShadow: '4px 4px 0 var(--text-primary)' }}>New Entry</Link>
                </div>

                {posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.7 }}>
                        <h3>Scene 1: Silence</h3>
                        <p>No scripts found in the archives.</p>
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
            </section>
        </div>
    );
}
