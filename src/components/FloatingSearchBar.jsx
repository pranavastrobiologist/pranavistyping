import React, { useState } from 'react';
import { Star, ChevronLeft, Menu, ChevronUp } from 'lucide-react';

export default function FloatingSearchBar({ currentPage = "Home Page" }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div style={{
            position: 'fixed',
            bottom: '30px', // Moved to bottom to avoid covering navbar
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 900,
            width: 'auto',
            minWidth: '320px',
            maxWidth: '600px'
        }}>
            <div style={{
                background: 'rgba(60, 60, 60, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                gap: '24px'
            }}>
                {/* Left Section - Star Icon and Text */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    whiteSpace: 'nowrap'
                }}>
                    <Star 
                        size={18} 
                        style={{ 
                            color: '#ffffff',
                            fill: 'none',
                            strokeWidth: 2
                        }} 
                    />
                    <span style={{
                        color: '#ffffff',
                        fontSize: '0.875rem',
                        fontWeight: '400',
                        letterSpacing: '0.3px'
                    }}>
                        You are at the {currentPage}
                    </span>
                </div>

                {/* Right Section - Navigation Icons */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <button 
                        onClick={() => window.history.back()}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <ChevronLeft size={20} style={{ color: '#ffffff' }} />
                    </button>

                    <div style={{
                        width: '1px',
                        height: '16px',
                        background: 'rgba(255, 255, 255, 0.3)'
                    }} />

                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <Menu size={20} style={{ color: '#ffffff' }} />
                    </button>

                    <div style={{
                        width: '1px',
                        height: '16px',
                        background: 'rgba(255, 255, 255, 0.3)'
                    }} />

                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <ChevronUp size={20} style={{ color: '#ffffff' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
