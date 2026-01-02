/**
 * Persistence Layer
 * Handles saving content to Sanity via Secure Serverless Function
 */

// We don't import the client here directly for WRITES, because we don't have the write-token.
// We only use the client for READS (if we wanted to fetch fresh data).

/**
 * Save content
 * @param {string} docId 
 * @param {string} field 
 * @param {any} value 
 */
export async function saveContent(docId, field, value) {
    console.log(`Saving ${field} in ${docId} to Sanity (via API)...`);

    try {
        const response = await fetch('/api/ghost/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // We send the secret key as proof we are the owner.
                // Since this runs in the browser, the User MUST have the env var loaded 
                // (which Lockbox verifies).
                'Authorization': `Bearer ${import.meta.env.VITE_GHOST_SECRET_KEY}`
            },
            body: JSON.stringify({ docId, field, value })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Sanity Save Success:', result);

        // Dispatch local event so UI updates immediately (Optimistic UI handled by Overlay, but this confirms it)
        window.dispatchEvent(new CustomEvent('ghost-content-updated', {
            detail: { docId, field, value }
        }));

        return true;
    } catch (err) {
        console.error('Failed to save to Sanity:', err);
        // Fallback to local storage so user doesn't lose data if offline or API fails
        fallbackSave(docId, field, value);
        return false;
    }
}

// Keep local fallback for offline resilience
function fallbackSave(docId, field, value) {
    const LOCAL_STORAGE_KEY = 'ghost_content_cache';
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY) || '{}';
        const cache = JSON.parse(data);
        if (!cache[docId]) cache[docId] = {};
        cache[docId][field] = value;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cache));
        console.warn('Saved to LocalStorage (Fallback)');
    } catch (e) {
        console.error('Fallback save failed', e);
    }
}

/**
 * Retrieve content
 * For now, we still rely on initialProps (SSR) or the component's own state.
 * But we can check local cache for pending/optimistic updates.
 */
export function getContent(docId, field) {
    // In Phase 5+, we could fetch live draft content from Sanity here.
    // For now, return undefined so it falls back to the static props / children.
    return undefined;
}
