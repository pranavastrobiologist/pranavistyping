import React, { useState, useEffect } from 'react';
import { useGhost } from './GhostContext';
import { encodeLiveFieldId } from './liveFieldSpec';
import { getContent } from './persistence';

/**
 * LiveField Component
 * 
 * Wraps content in a steganographically encoded container.
 * Now supports reading from Persistence Layer for updates.
 */
export const LiveField = ({
    docId,
    field,
    type = 'string',
    initialValue,
    className = '',
    as: Component = 'span',
    children
}) => {
    const { isGhostActive } = useGhost();

    // Attempt to read saved value from persistence
    // In a real app, this would use a proper swr/query hook
    const [savedValue, setSavedValue] = useState(undefined);

    useEffect(() => {
        // Load initial
        const val = getContent(docId, field);
        if (val !== undefined) setSavedValue(val);

        // Listen for updates
        const handleUpdate = (e) => {
            const { docId: updateDoc, field: updateField, value } = e.detail;
            if (updateDoc === docId && updateField === field) {
                setSavedValue(value);
            }
        };

        window.addEventListener('ghost-content-updated', handleUpdate);
        return () => window.removeEventListener('ghost-content-updated', handleUpdate);
    }, [docId, field]);

    // Determine final content: Saved > Children/Initial
    const contentToRender = savedValue !== undefined ? savedValue : (children || initialValue);

    // Generate the ID
    const ghostId = encodeLiveFieldId(docId, field, type);

    if (!isGhostActive) {
        return (
            <Component className={className}>
                {contentToRender}
            </Component>
        );
    }

    return (
        <Component
            className={className}
            data-ghost-id={ghostId}
            data-ghost-label={field}
        >
            {contentToRender}
        </Component>
    );
};
