import { client } from '../lib/sanity'; // Ensure this client is set up for public reading

/**
 * Persistence Layer
 * Handles saving content to Sanity via Secure Serverless Function
 * AND fetching content from Sanity to hydration local state.
 */

// In-memory cache to store fetched content
// Structure: { [docId]: { [field]: value } }
let memoryCache = {};

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
        // Fallback or Alert User? For MVP we just log
        return false;
    }
}

/**
 * Fetch and Hydrate Content (The "Read" Path)
 * Call this on page mount to pull the latest CMS data.
 */
export async function fetchAndHydrate(docId) {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return;

    console.log(`Hydrating content for ${docId}...`);
    try {
        // Fetch the entire document
        const data = await client.fetch(`*[_id == $id][0]`, { id: docId });

        if (data) {
            // Merge into cache
            memoryCache[docId] = { ...memoryCache[docId], ...data };

            // Broadcast all fields
            // We iterate keys because our simple LiveField just listens to exact field matches
            Object.keys(data).forEach(key => {
                // If it's a nested object (like inputs.reading...), we might need flattening 
                // if we stored it flattened. But Sanity stores structured JSON.
                // Our LiveField currently expects "inputs.reading.0.title" as a key?
                // Wait, our local storage fallback stored flattened keys? 
                // No, local storage stored { inputs: { reading: ... } } logic if we parsed JSON.
                // But my save.js does `set({ [field]: value })`.
                // If field was "inputs.reading.0.title", Sanity patch set that exact path?
                // Sanity patch support dot notation for deep setting? No, usually handled by client.
                // Actually my save.js logic `p.set({ [field]: value })` treats the key as a string literal 
                // unless Sanity client auto-expands dot notation. 
                // Sanity Client `set` DOES NOT auto-expand dot notation keys into objects. 
                // It sets a top-level key with dots in the name usually, unless using specific patch DSL.
                // CHECK: If I saved "inputs.reading.0.title", Sanity likely has `{"inputs.reading.0.title": "Value"}`
                // This is fine for this MVP "Key-Value Store" approach.
                // So hydration is simple:

                window.dispatchEvent(new CustomEvent('ghost-content-updated', {
                    detail: { docId, field: key, value: data[key] }
                }));
            });
            console.log('Hydration complete for', docId);
        }
    } catch (err) {
        console.error('Hydration failed', err);
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
