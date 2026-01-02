import React, { useState, useEffect } from 'react';

export function GhostInput({ field, initialValue, onSave, onCancel }) {
    const [value, setValue] = useState(initialValue || '');
    const [isSaving, setIsSaving] = useState(false);

    // If initialValue changes (e.g. fresh data), update state
    useEffect(() => {
        setValue(initialValue || '');
    }, [initialValue]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave(value);
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        } finally {
            setIsSaving(false);
        }
    };

    const isTextArea = field.type === 'text' || value.length > 50;

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px', // Standard placement for the panel
            width: '320px',
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
            padding: '16px',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'fadeInUp 0.2s ease-out'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #f4f4f5',
                paddingBottom: '8px'
            }}>
                <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: '#a1a1aa'
                }}>
                    Editing {field.label || field.field}
                </span>
                <span style={{ fontSize: '10px', color: '#d4d4d8' }}>
                    {field.docId}
                </span>
            </div>

            {isTextArea ? (
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    style={{
                        width: '100%',
                        minHeight: '120px',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e4e4e7',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        lineHeight: '1.5',
                        resize: 'vertical',
                        outline: 'none',
                    }}
                />
            ) : (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e4e4e7',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none',
                    }}
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                    onClick={onCancel}
                    style={{
                        padding: '8px 12px',
                        fontSize: '13px',
                        color: '#52525b',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'white',
                        background: isSaving ? '#52525b' : '#18181b',
                        border: 'none',
                        cursor: isSaving ? 'default' : 'pointer',
                        borderRadius: '4px',
                        transition: 'background 0.2s'
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
