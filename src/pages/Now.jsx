import React from 'react';
import ActiveIndicator from '../components/ActiveIndicator';
import NowSection from '../components/NowSection';

export default function Now() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            padding: '80px 24px 120px'
        }}>
            <div style={{
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                <header style={{
                    marginBottom: '80px',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '700',
                        lineHeight: '1.1',
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        marginBottom: '24px'
                    }}>
                        What I'm doing now
                    </h1>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        marginBottom: '12px'
                    }}>
                        <ActiveIndicator />
                    </div>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--accent-color)',
                        fontWeight: '500'
                    }}>
                        Last updated {lastUpdated}
                    </p>
                </header>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    borderRadius: '16px',
                    padding: '48px',
                    marginBottom: '64px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <h2 style={{
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-color)',
                        marginBottom: '24px'
                    }}>
                        Current Focus
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        lineHeight: '1.7',
                        color: 'var(--text-primary)',
                        fontFamily: 'Georgia, serif',
                        margin: 0
                    }}>
                        Building a refined digital presence that balances creativity with technical depth. 
                        Exploring the intersection of design systems, web performance, and thoughtful storytelling.
                    </p>
                </div>

                <div style={{ marginBottom: '64px' }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        marginBottom: '32px',
                        color: 'var(--text-primary)'
                    }}>
                        Inputs
                    </h2>

                    <NowSection label="Reading" accent>
                        <p style={{ margin: '0 0 8px 0' }}>
                            <strong>The Design of Everyday Things</strong> by Don Norman
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                            Revisiting the fundamentals of user-centered design
                        </p>
                    </NowSection>

                    <div style={{
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.06)',
                        margin: '32px 0'
                    }} />

                    <NowSection label="Listening" accent>
                        <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Tycho</strong> — Weather
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                            Ambient soundscapes for deep work sessions
                        </p>
                    </NowSection>

                    <div style={{
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.06)',
                        margin: '32px 0'
                    }} />

                    <NowSection label="Learning" accent>
                        <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Advanced React Patterns</strong>
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                            Compound components, render props, and custom hooks
                        </p>
                    </NowSection>
                </div>

                <div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        marginBottom: '32px',
                        color: 'var(--text-primary)'
                    }}>
                        Outputs
                    </h2>

                    <NowSection label="Building" accent>
                        <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Personal Blog Platform</strong>
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                            A minimalist writing space with Medium-inspired aesthetics
                        </p>
                    </NowSection>

                    <div style={{
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.06)',
                        margin: '32px 0'
                    }} />

                    <NowSection label="Writing" accent>
                        <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Design Systems in Practice</strong>
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                            Documenting patterns and principles for scalable UI
                        </p>
                    </NowSection>

                    <div style={{
                        height: '1px',
                        background: 'rgba(0, 0, 0, 0.06)',
                        margin: '32px 0'
                    }} />

                    <NowSection label="Exploring" accent>
                        <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Generative Art with Canvas API</strong>
                        </p>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                            Creating algorithmic patterns and interactive visualizations
                        </p>
                    </NowSection>
                </div>
            </div>
        </div>
    );
}
