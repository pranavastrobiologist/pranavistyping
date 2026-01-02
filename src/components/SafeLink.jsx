import React, { useState } from 'react';
import { ExternalLink, AlertTriangle } from 'lucide-react';

export default function SafeLink({ href, children, ...props }) {
    const [showWarning, setShowWarning] = useState(false);

    const handleClick = (e) => {
        // Check if it's an external link
        if (href.startsWith('http')) {
            e.preventDefault();
            setShowWarning(true);
        }
    };

    const handleConfirm = () => {
        setShowWarning(false);
        window.open(href, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <a href={href} onClick={handleClick} {...props}>
                {children} <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
            </a>

            {showWarning && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass-panel" style={{
                        padding: '32px',
                        maxWidth: '400px',
                        width: '90%',
                        background: 'var(--bg-secondary)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            color: '#eab308',
                            marginBottom: '16px',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <AlertTriangle size={48} />
                        </div>
                        <h3 style={{ marginBottom: '12px' }}>Leaving Website</h3>
                        <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
                            You are about to visit an external link:<br />
                            <code style={{
                                background: 'var(--bg-hover)',
                                padding: '4px',
                                borderRadius: '4px',
                                display: 'block',
                                margin: '8px 0',
                                wordBreak: 'break-all'
                            }}>{href}</code>
                            Please verify this URL is safe before proceeding.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setShowWarning(false)}
                                className="btn btn-ghost"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="btn btn-primary"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
