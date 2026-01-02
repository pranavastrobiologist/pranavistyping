import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PenTool } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav style={{
            position: 'absolute', /* Absolute to sit on top of the yellow background seamlessly */
            top: 0,
            width: '100%',
            zIndex: 100,
            padding: '20px 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '60px'
            }}>
                {/* Removed Logo to let the hero text shine */}

                {location.pathname !== '/create' && (
                    <Link to="/create" className="btn" style={{
                        border: '2px solid var(--text-primary)',
                        boxShadow: '4px 4px 0 var(--text-primary)',
                        color: 'var(--text-primary)',
                        fontWeight: 'bold',
                        background: 'transparent'
                    }}>
                        <PenTool size={18} />
                        <span>Write Script</span>
                    </Link>
                )}

                {location.pathname === '/create' && (
                    <Link to="/" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Back to Set</Link>
                )}
            </div>
        </nav>
    );
}
