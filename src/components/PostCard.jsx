import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

export default function PostCard({ post }) {
    return (
        <article className="glass-panel" style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: '100%',
            transition: 'box-shadow 0.2s',
            background: 'var(--bg-secondary)'
        }}>
            <time style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {format(new Date(post.createdAt), 'MMM d, yyyy')}
            </time>

            <Link to={`/post/${post.id}`} style={{ flex: 1, display: 'block' }}>
                <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    lineHeight: '1.4',
                    color: 'var(--text-primary)'
                }}>
                    {post.title}
                </h2>
                <p style={{
                    fontSize: '0.9375rem',
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
                gap: '4px',
                color: 'var(--text-primary)',
                fontWeight: '500',
                fontSize: '0.875rem',
                marginTop: '12px'
            }}>
                Read <ArrowRight size={14} />
            </Link>
        </article>
    );
}
