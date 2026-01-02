import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
        </div>
    );
}
