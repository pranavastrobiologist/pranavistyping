import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main className="container" style={{ flex: 1, padding: '40px 20px' }}>
                <Outlet />
            </main>
            <footer style={{
                borderTop: '1px solid var(--border-color)',
                padding: '20px 0',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
            }}>
                <div className="container">
                    &copy; {new Date().getFullYear()} DevBlog. Built with React & Vite.
                </div>
            </footer>
        </div>
    );
}
