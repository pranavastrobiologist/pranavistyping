import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Now from './pages/Now';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, ProtectedRoute } from './components/AuthContext';

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
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
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
