import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
    return (
        <article style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Pranav Subramanian</span>
                <span>·</span>
                <time>{format(new Date(post.createdAt), 'MMM d, yyyy')}</time>
            </div>

            <Link to={`/post/${post.id}`} style={{ display: 'block', textDecoration: 'none' }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    marginBottom: '8px',
                    lineHeight: '1.25',
                    fontFamily: 'serif',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.025em'
                }}>
                    {post.title}
                </h2>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    color: 'var(--text-secondary)',
                    fontFamily: 'serif',
                    marginTop: '4px'
                }}>
                    {post.content}
                </p>
            </Link>

            <div style={{ paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                        background: '#f4f4f5',
                        padding: '4px 12px',
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        color: 'var(--text-secondary)'
                    }}>
                        Design
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', paddingTop: '4px' }}>4 min read</span>
                </div>
            </div>
        </article>
    );
}
