import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useGhost } from './GhostContext';
import { decodeLiveFieldId } from './liveFieldSpec';

export function GhostOverlay() {
    const { isGhostActive, isEditing, setIsEditing, activeField, setActiveField } = useGhost();

    // Core state for the "Inspector"
    const [hoverRect, setHoverRect] = useState(null);
    const [hoverField, setHoverField] = useState(null); // { id, label, parts }

    // Handlers
    const handleMouseMove = useCallback((e) => {
        if (isEditing) return; // Don't highlight while editing

        const target = e.target.closest('[data-ghost-id]');

        if (target) {
            const rect = target.getBoundingClientRect();
            const id = target.getAttribute('data-ghost-id');
            const label = target.getAttribute('data-ghost-label');
            const parts = decodeLiveFieldId(id);

            setHoverRect({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height
            });
            setHoverField({ id, label, parts });
        } else {
            setHoverRect(null);
            setHoverField(null);
        }
    }, [isEditing]);

    const handleClick = useCallback((e) => {
        if (!isGhostActive) return;

        // If we click a ghost field, preventing default is optional, 
        // but often good to prevent link navigation while editing intent is clear.
        // For now, let's capture it.
        const target = e.target.closest('[data-ghost-id]');
        if (target) {
            e.preventDefault();
            e.stopPropagation();

            const id = target.getAttribute('data-ghost-id');
            const parts = decodeLiveFieldId(id);

            setActiveField({ id, ...parts, rect: target.getBoundingClientRect() });
            setIsEditing(true);
            setHoverRect(null); // Clear hover when editing
        }
    }, [isGhostActive]);

    // Attach listeners
    useEffect(() => {
        if (!isGhostActive) return;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick, true); // Capture phase to intercept

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick, true);
        };
    }, [isGhostActive, handleMouseMove, handleClick]);


    if (!isGhostActive) return null;

    return createPortal(
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Letting clicks pass through to document listener 
            zIndex: 9999
        }}>
            {/* Hover Highlight */}
            {hoverRect && !isEditing && (
                <div style={{
                    position: 'absolute',
                    top: hoverRect.top,
                    left: hoverRect.left,
                    width: hoverRect.width,
                    height: hoverRect.height,
                    border: '1px dashed rgba(59, 130, 246, 0.5)',
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'start',
                    transition: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                    <span style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontSize: '10px',
                        padding: '2px 4px',
                        transform: 'translateY(-100%)',
                        fontFamily: 'monospace',
                        borderRadius: '2px 2px 2px 0'
                    }}>
                        {hoverField?.label}
                    </span>
                </div>
            )}

            {/* Active Editor (Placeholder for next step) */}
            {isEditing && activeField && (
                <div style={{
                    position: 'fixed', // Fixed for editor UI
                    bottom: '20px',
                    right: '20px',
                    background: 'white',
                    padding: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5',
                    pointerEvents: 'auto', // Enable interaction for editor
                    minWidth: '200px'
                }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        Editing <strong>{activeField.field}</strong>
                    </div>
                    <button
                        onClick={() => { setIsEditing(false); setActiveField(null); }}
                        style={{
                            background: '#191919',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>,
        document.body
    );
}
