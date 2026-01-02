import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Now from './pages/Now';
import Lockbox from './pages/Lockbox';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, ProtectedRoute } from './components/AuthContext';

import { GhostProvider } from './ghost/GhostContext';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <GhostProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route
                                    path="create"
                                    element={
                                        <ProtectedRoute>
                                            <CreatePost />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="post/:id" element={<PostDetails />} />
                                <Route path="now" element={<Now />} />
                                <Route path="lockbox" element={<Lockbox />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </GhostProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
