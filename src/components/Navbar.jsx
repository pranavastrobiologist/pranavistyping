import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav style={{
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '64px'
            }}>
                <Link to="/" style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: 'var(--text-primary)'
                }}>
                    DevBlog
                </Link>

                {location.pathname !== '/create' && (
                    <Link to="/create" className="btn btn-primary">
                        <PenTool size={16} />
                        <span>Write Post</span>
                    </Link>
                )}

                {location.pathname === '/create' && (
                    <Link to="/" className="btn btn-ghost">Back to Home</Link>
                )}
            </div>
        </nav>
    );
}
