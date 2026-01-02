import React from 'react';
import Navbar from './Navbar';
import FloatingSearchBar from './FloatingSearchBar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
    const location = useLocation();
    
    // Determine current page name based on route
    const getPageName = () => {
        if (location.pathname === '/') return 'Home Page';
        if (location.pathname === '/create') return 'Create Post Page';
        if (location.pathname.startsWith('/post/')) return 'Post Details Page';
        if (location.pathname === '/about') return 'My Story Page';
        if (location.pathname === '/travel') return 'Travel Page';
        return 'Page';
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
            <FloatingSearchBar currentPage={getPageName()} />
            <Navbar />
            <main style={{ flex: 1, paddingTop: '80px' }}>
                <Outlet />
            </main>
        </div>
    );
}
