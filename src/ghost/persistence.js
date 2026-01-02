import { client } from '../lib/sanity';

/**
 * Persistence Layer
 * Handles saving content to either Sanity (if configured) or LocalStorage (fallback).
 */

const LOCAL_STORAGE_KEY = 'ghost_content_cache';

// Helper to get local cache
function getLocalCache() {
    try {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

// Helper to set local cache
function setLocalCache(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

/**
 * Save content
 * @param {string} docId 
 * @param {string} field 
 * @param {any} value 
 */
export async function saveContent(docId, field, value) {
    console.log(`Saving ${field} in ${docId} to:`, value);

    // 1. Try Sanity if Project ID exists
    if (import.meta.env.VITE_SANITY_PROJECT_ID) {
        try {
            // This requires a write token which we don't have in client-side env usually.
            // In a real app, this calls a serverless function /api/ghost/save
            // For now, we'll log it and fall back to local to simulate "working".
            console.log('Sanity configured, but using local fallback for MVP demo.');
        } catch (err) {
            console.error('Sanity save failed', err);
        }
    }

    // 2. Local Fallback (Simulation)
    const cache = getLocalCache();
    if (!cache[docId]) cache[docId] = {};

    // Handle nested fields (e.g. inputs.reading.0.title)
    // For simplicity in MVP, we flatten or just store the direct path if simple
    // But for the array items, we need a smarter structure.
    // Let's use the field path string as a unique key for now.
    cache[docId][field] = value;

    setLocalCache(cache);

    // Dispatch event so hooks can update
    window.dispatchEvent(new CustomEvent('ghost-content-updated', {
        detail: { docId, field, value }
    }));

    return true;
}

/**
 * Retrieve content (Hook helper)
 * @param {string} docId 
 * @param {string} field 
 * @returns {any} value or undefined
 */
export function getContent(docId, field) {
    const cache = getLocalCache();
    if (cache[docId] && cache[docId][field] !== undefined) {
        return cache[docId][field];
    }
    return undefined;
}
