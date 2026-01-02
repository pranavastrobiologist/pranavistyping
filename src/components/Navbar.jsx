import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav style={{
            borderBottom: '1px solid var(--border-color)',
            background: '#ffffff',
            padding: '20px 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '1200px'
            }}>
                {/* Logo Section */}
                <Link to="/" style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    fontFamily: 'serif',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.05em',
                    textDecoration: 'none'
                }}>
                    pranav is typing...
                </Link>

                {/* Navigation Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.875rem' }}>
                    <Link to="/now" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Now</Link>
                    <Link to="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>My story</Link>
                    <Link to="/travel" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Travel</Link>
                    <Link to="/create" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Write</Link>
                    <Link to="/signin" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>Sign in</Link>
                    <Link to="/get-started" className="btn" style={{
                        background: '#191919',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        textDecoration: 'none'
                    }}>
                        Get started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
