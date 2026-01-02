import React from 'react';

export default function ActiveIndicator() {
    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.7)',
                animation: 'pulse 2s ease-in-out infinite'
            }} />
            <span style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
            }}>
                Active
            </span>
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
                        transform: scale(1);
                    }
                    50% {
                        box-shadow: 0 0 0 4px rgba(16, 185, 129, 0);
                        transform: scale(1.1);
                    }
                }
            `}</style>
        </div>
    );
}
