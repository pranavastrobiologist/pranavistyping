import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogStore } from '../lib/store';
import { Save, Loader2 } from 'lucide-react';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !content.trim()) return;

        setIsSubmitting(true);

        try {
            // Simulate network delay for "Input Handling Stability" check
            await new Promise(resolve => setTimeout(resolve, 500));

            blogStore.createPost({ title, content });
            navigate('/');
        } catch (err) {
            setError('Failed to publish post. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ marginBottom: '16px' }}>New Post</h1>
                <p style={{ fontSize: '1.125rem' }}>Share your thoughts with the world.</p>
            </header>

            {error && (
                <div style={{
                    padding: '12px',
                    marginBottom: '20px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#fef2f2',
                    color: '#ef4444',
                    border: '1px solid #fee2e2'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title..."
                        autoFocus
                        required
                        disabled={isSubmitting}
                        style={{ fontSize: '1.5rem', padding: '16px', fontWeight: '600' }}
                    />
                </div>

                <div style={{ marginBottom: '32px' }}>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your story..."
                        required
                        rows={15}
                        disabled={isSubmitting}
                        style={{
                            fontSize: '1rem',
                            lineHeight: '1.75',
                            resize: 'vertical',
                            padding: '16px'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="btn btn-ghost"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ minWidth: '120px' }}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        {isSubmitting ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </form>
        </div>
    );
}
