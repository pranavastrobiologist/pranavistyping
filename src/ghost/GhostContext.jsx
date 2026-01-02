import React, { createContext, useContext, useState, useEffect } from 'react';
import { GhostOverlay } from './GhostOverlay';

/**
 * GhostContext
 * Manages the global state of the Authoring Mode (Ghost Mode).
 * 
 * State:
 * - isGhostActive: boolean - true if the user is authenticated as an owner
 * - isEditing: boolean - true if the user is currently editing a field
 * - activeField: LiveFieldId | null - the ID of the field currently being edited
 */

const GhostContext = createContext({
    isGhostActive: false,
    setIsGhostActive: () => { },
    isEditing: false,
    setIsEditing: () => { },
    activeField: null,
    setActiveField: () => { },
});

export const useGhost = () => useContext(GhostContext);

export function GhostProvider({ children }) {
    // In a real implementation, this would initialize from an HTTP-only cookie or secure token
    // For now, we default to false (Public logic)
    const [isGhostActive, setIsGhostActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeField, setActiveField] = useState(null);

    // Effect to check for existing session on mount (placeholder)
    useEffect(() => {
        const session = localStorage.getItem('ghost_mode_session');
        if (session === 'active') {
            setIsGhostActive(true);
        }
    }, []);

    const value = {
        isGhostActive,
        setIsGhostActive,
        isEditing,
        setIsEditing,
        activeField,
        setActiveField
    };

    return (
        <GhostContext.Provider value={value}>
            {children}
            <GhostOverlay />
        </GhostContext.Provider>
    );
}
