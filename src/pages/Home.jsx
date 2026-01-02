import React, { useEffect, useState } from 'react';
import { blogStore } from '../lib/store';
import PostCard from '../components/PostCard';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(blogStore.getPosts());
    }, []);

    return (
        <div style={{ background: '#ffffff' }}>
            {/* Hero Section */}
            <div style={{
                borderBottom: '1px solid var(--border-color)',
                background: '#ffffff',
                padding: '100px 0',
                marginBottom: '60px'
            }}>
                <div className="container" style={{
                    maxWidth: '1200px',
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '40px',
                    alignItems: 'center',
                    minHeight: '400px'
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '6.5rem',
                            lineHeight: '0.95',
                            fontFamily: 'serif',
                            fontWeight: '500',
                            marginBottom: '32px',
                            letterSpacing: '-0.04em',
                            color: '#000000'
                        }}>
                            Human stories & ideas
                        </h1>
                        <p style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '48px',
                            maxWidth: '540px',
                            lineHeight: '1.4'
                        }}>
                            A place to read, write, and deepen your understanding
                        </p>
                        <button className="btn" style={{
                            background: '#191919',
                            color: 'white',
                            borderRadius: '30px',
                            padding: '12px 40px',
                            fontSize: '1.25rem',
                            fontWeight: '400'
                        }}>
                            Start reading
                        </button>
                    </div>

                    {/* Hero Illustration Placeholder */}
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {/* We use a colored geometric shape as a placeholder for the illustration */}
                        <div style={{
                            width: '400px',
                            height: '400px',
                            background: '#4ade80', /* Greenish tone from screenshot */
                            borderRadius: '50% 0 50% 0',
                            opacity: '0.8',
                            position: 'relative',
                            zIndex: 1
                        }}></div>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: '#facc15', /* Yellow tone */
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '20%',
                            right: '20%',
                            zIndex: 2
                        }}></div>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="container" style={{ maxWidth: '750px', paddingBottom: '100px' }}>
                {posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <p>No stories yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        {posts.map(post => (
                            <div key={post.id} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '48px' }}>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
