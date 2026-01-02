import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="container" style={{ flex: 1, paddingTop: '40px', paddingBottom: '40px' }}>
                <Outlet />
            </main>
            <footer style={{
                borderTop: '1px solid var(--border-color)',
                padding: '32px 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                marginTop: 'auto'
            }}>
                <div className="container">
                    &copy; {new Date().getFullYear()} DevBlog. Minimalist Edition.
                </div>
            </footer>
        </div>
    );
}
