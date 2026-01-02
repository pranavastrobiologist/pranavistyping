import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool, NotebookPen } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav style={{
            borderBottom: '1px solid var(--border-color)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(15, 23, 42, 0.8)'
        }}>
            <div className="container" style={{
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <NotebookPen size={24} />
                    </div>
                    <span>DevBlog</span>
                </Link>

                {location.pathname !== '/create' && (
                    <Link to="/create" className="btn btn-primary">
                        <PenTool size={18} />
                        <span>Write Post</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
