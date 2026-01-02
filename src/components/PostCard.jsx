import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, Calendar } from 'lucide-react';

export default function PostCard({ post }) {
    return (
        <article className="glass-panel" style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'transform 0.2s',
            height: '100%'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <Calendar size={14} />
                <time>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
            </div>

            <Link to={`/post/${post.id}`} style={{ flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', lineHeight: '1.3' }}>{post.title}</h2>
                <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    color: 'var(--text-secondary)'
                }}>
                    {post.content}
                </p>
            </Link>

            <Link to={`/post/${post.id}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent-primary)',
                fontWeight: '600',
                alignSelf: 'flex-start',
                marginTop: 'auto'
            }}>
                Read Article <ArrowRight size={16} />
            </Link>
        </article>
    );
}
