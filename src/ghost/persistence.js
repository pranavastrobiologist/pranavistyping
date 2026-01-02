import { client } from '../lib/sanity'; // Ensure this client is set up for public reading

/**
 * Persistence Layer
 * Handles saving content to Sanity via Secure Serverless Function
 * AND fetching content from Sanity to hydration local state.
 */

// In-memory cache to store fetched content
// Structure: { [docId]: { [field]: value } }
let memoryCache = {};

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
 * Save content
 * @param {string} docId 
 * @param {string} field 
 * @param {any} value 
 */
export async function saveContent(docId, field, value) {
    // 1. Optimistic Update (Memory)
    if (!memoryCache[docId]) memoryCache[docId] = {};
    memoryCache[docId][field] = value;

    window.dispatchEvent(new CustomEvent('ghost-content-updated', {
        detail: { docId, field, value }
    }));

    console.log(`Saving ${field} in ${docId} to Sanity (via API)...`);

    try {
        const response = await fetch('/api/ghost/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_GHOST_SECRET_KEY}`
            },
            body: JSON.stringify({ docId, field, value })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Sanity Save Success:', result);
        return true;
    } catch (err) {
        console.error('Failed to save to Sanity:', err);
        alert(`Cloud Save Failed: ${err.message}\nSaved locally instead.`);
        // Fallback to local storage so user doesn't lose data if offline or API fails
        fallbackSave(docId, field, value);
        return false;
    }
}

/**
 * Fetch and Hydrate Content (The "Read" Path)
 * Call this on page mount to pull the latest CMS data.
 */
export async function fetchAndHydrate(docId) {
    // 1. Load LocalStorage Fallback FIRST (Low latency + Offline support)
    try {
        const localData = localStorage.getItem('ghost_content_cache');
        if (localData) {
            const cache = JSON.parse(localData);
            if (cache[docId]) {
                const docData = cache[docId];
                Object.keys(docData).forEach(key => {
                    if (!memoryCache[docId]) memoryCache[docId] = {};
                    memoryCache[docId][field] = docData[key]; // Update memory

                    window.dispatchEvent(new CustomEvent('ghost-content-updated', {
                        detail: { docId, field: key, value: docData[key] }
                    }));
                });
                console.log('Local Hydration complete for', docId);
            }
        }
    } catch (e) { console.error('Local read failed', e); }

    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return;

    console.log(`Hydrating content for ${docId} from Cloud...`);
    try {
        const data = await client.fetch(`*[_id == $id][0]`, { id: docId });

        if (data) {
            // Merge into cache
            memoryCache[docId] = { ...memoryCache[docId], ...data };

            // Broadcast all fields
            Object.keys(data).forEach(key => {
                window.dispatchEvent(new CustomEvent('ghost-content-updated', {
                    detail: { docId, field: key, value: data[key] }
                }));
            });
            console.log('Cloud Hydration complete for', docId);
        }
    } catch (err) {
        console.error('Cloud Hydration failed', err);
    }
}

/**
 * Retrieve content
 */
export function getContent(docId, field) {
    if (memoryCache[docId] && memoryCache[docId][field] !== undefined) {
        return memoryCache[docId][field];
    }
    return undefined;
}
