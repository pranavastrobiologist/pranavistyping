import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogStore } from '../lib/store';
import { Save } from 'lucide-react';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        blogStore.createPost({ title, content });
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1>Create New Post</h1>
                <p>Share your thoughts with the world.</p>
            </header>

            <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="title">Post Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a catchy title..."
                        autoFocus
                        required
                        style={{ fontSize: '1.25rem', padding: '16px' }}
                    />
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write something amazing..."
                        required
                        rows={12}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                    <button type="button" onClick={() => navigate('/')} className="btn btn-ghost">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <Save size={18} />
                        Publish Post
                    </button>
                </div>
            </form>
        </div>
    );
}
