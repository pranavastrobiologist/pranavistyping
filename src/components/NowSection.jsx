import React from 'react';

export default function NowSection({ label, children, accent = false }) {
    return (
        <div style={{
            marginBottom: '48px'
        }}>
            {label && (
                <h3 style={{
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: accent ? 'var(--accent-color)' : 'var(--text-secondary)',
                    marginBottom: '16px'
                }}>
                    {label}
                </h3>
            )}
            <div style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--text-primary)'
            }}>
                {children}
            </div>
        </div>
    );
}
