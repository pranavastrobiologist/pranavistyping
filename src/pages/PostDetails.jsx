import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogStore } from '../lib/store';
import { format } from 'date-fns';
import { ArrowLeft, Trash2 } from 'lucide-react';
import SafeLink from '../components/SafeLink';

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = blogStore.getPost(id);
        if (!foundPost) {
            navigate('/');
            return;
        }
        setPost(foundPost);
    }, [id, navigate]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            blogStore.deletePost(id);
            navigate('/');
        }
    };

    const renderContent = (content) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = content.split(urlRegex);

        return parts.map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <SafeLink
                        key={index}
                        href={part}
                        style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}
                    >
                        {part}
                    </SafeLink>
                );
            }
            return part;
        });
    };

    if (!post) return null;

    return (
        <article className="container" style={{ maxWidth: '700px' }}>
            <Link to="/" className="btn btn-ghost" style={{ paddingLeft: 0, marginBottom: '32px' }}>
                <ArrowLeft size={16} /> Back to Home
            </Link>

            <header style={{ marginBottom: '40px' }}>
                <div style={{
                    marginBottom: '16px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9375rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <time dateTime={post.createdAt}>
                        {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                    </time>
                    <button onClick={handleDelete} className="btn btn-ghost" style={{
                        color: 'var(--danger)',
                        padding: '4px 8px',
                        fontSize: '0.875rem'
                    }}>
                        <Trash2 size={14} /> Delete
                    </button>
                </div>

                <h1 style={{
                    fontSize: '2.5rem',
                    lineHeight: '1.2',
                    marginBottom: '0',
                    letterSpacing: '-0.025em'
                }}>
                    {post.title}
                </h1>
            </header>

            <div style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                fontFamily: 'Georgia, serif'
            }}>
                {renderContent(post.content)}
            </div>
        </article>
    );
}
