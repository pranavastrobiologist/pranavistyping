import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogStore } from '../lib/store';
import { format } from 'date-fns';
import { ArrowLeft, Trash2, Calendar, Clock } from 'lucide-react';

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

    if (!post) return null;

    return (
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/" className="btn btn-ghost" style={{ paddingLeft: 0, marginBottom: '20px' }}>
                <ArrowLeft size={18} /> Back to Home
            </Link>

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '20px' }}>{post.title}</h1>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '20px'
                }}>
                    <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Calendar size={16} />
                            {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Clock size={16} />
                            {Math.ceil(post.content.split(' ').length / 200)} min read
                        </span>
                    </div>

                    <button onClick={handleDelete} className="btn" style={{ color: 'var(--danger)' }}>
                        <Trash2 size={18} /> Delete
                    </button>
                </div>
            </header>

            <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                {post.content}
            </div>
        </article>
    );
}
