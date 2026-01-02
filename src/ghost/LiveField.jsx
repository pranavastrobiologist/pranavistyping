import React from 'react';
import { useGhost } from './GhostContext';
import { encodeLiveFieldId } from './liveFieldSpec';

/**
 * LiveField Component
 * 
 * Wraps content in a steganographically encoded container.
 * In Public Mode: Renders a clean element (span/div) with the content.
 * In Ghost Mode: Renders with data-ghost-id for the overlay to find.
 * 
 * @param {import('./liveFieldSpec').LiveFieldProps} props 
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

    // Generate the ID
    const ghostId = encodeLiveFieldId(docId, field, type);

    // If Ghost Mode is NOT active, render purely the content (or children)
    // We still render the wrapper to maintain DOM structure consistency between modes
    // unless 'ghost-only' prop is passed (future feature).
    // Note: To be truly "invisible" in public DOM, we could use React.Fragment, 
    // but that makes it hard to target for the overlay later without hydration mismatches.
    // For now, we render the Component (span/div).

    if (!isGhostActive) {
        return (
            <Component className={className}>
                {children || initialValue}
            </Component>
        );
    }

    // In Ghost Mode, attach the ID
    return (
        <Component
            className={className}
            data-ghost-id={ghostId}
            data-ghost-label={field} // Visual helper for tooltip
        >
            {children || initialValue}
        </Component>
    );
};
