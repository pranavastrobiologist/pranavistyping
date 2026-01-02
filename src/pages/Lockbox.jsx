import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGhost } from '../ghost/GhostContext';

export default function Lockbox() {
    const [key, setKey] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const { setIsGhostActive } = useGhost();

    const handleSubmit = (e) => {
        e.preventDefault();

        // In a real app, verify against a serverless function to prevent key leakage in bundle.
        // For this MVP, we verify against an env var which is acceptable for personal sites
        // as long as the write-token is server-side.
        if (key === import.meta.env.VITE_GHOST_SECRET_KEY) {
            localStorage.setItem('ghost_mode_session', 'active');
            setIsGhostActive(true);
            navigate('/');
        } else {
            setError(true);
            setKey('');
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#09090b', // Zinc-950
            color: '#fafafa'
        }}>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                width: '100%',
                maxWidth: '320px',
                padding: '24px'
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '300',
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    marginBottom: '8px',
                    color: '#71717a'
                }}>
                    Ghost Access
                </h1>

                <input
                    type="password"
                    value={key}
                    onChange={(e) => {
                        setKey(e.target.value);
                        setError(false);
                    }}
                    placeholder="Enter access key..."
                    autoFocus
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.2s',
                        fontFamily: 'monospace'
                    }}
                />

                {error && (
                    <span style={{
                        color: '#ef4444',
                        fontSize: '0.75rem',
                        textAlign: 'center'
                    }}>
                        Invalid authorization key
                    </span>
                )}
            </form>
        </div>
    );
}
