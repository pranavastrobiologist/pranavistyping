import { createClient } from '@sanity/client';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // 1. Security Check
    // We verify that the requestor knows the Ghost Mode Secret Key
    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.VITE_GHOST_SECRET_KEY; // Using the server-side env var

    if (!authHeader || authHeader !== `Bearer ${SECRET_KEY}`) {
        return res.status(401).json({ message: 'Unauthorized: Invalid Ghost Key' });
    }

    // 2. Initialize Sanity Client (Privileged)
    // using the token that allows writes
    const client = createClient({
        projectId: process.env.VITE_SANITY_PROJECT_ID,
        dataset: process.env.VITE_SANITY_DATASET || 'production',
        token: process.env.SANITY_API_TOKEN, // Critical: Only available server-side
        useCdn: false, // We want fresh data for writes
        apiVersion: '2023-05-03',
    });

    const { docId, field, value } = req.body;

    if (!docId || !field) {
        return res.status(400).json({ message: 'Missing docId or field' });
    }

    console.log(`[Ghost Server] Patching ${docId} :: ${field} = ${value}`);

    try {
        // 3. Perform the Patch
        // Handle nested fields (e.g. inputs.reading.0.title)
        // Sanity requires specific patch syntax for arrays/nested paths.
        // For this MVP, we will assume the field path provided by LiveField is valid Sanity path syntax.

        await client
            .patch(docId)
            .set({ [field]: value }) // Basic set. For arrays this might need 'setIfMissing' or deeper logic
            .commit();

        return res.status(200).json({ success: true, message: 'Content persisted to Sanity' });
    } catch (err) {
        console.error('[Ghost Server Error]', err);
        return res.status(500).json({ message: 'Failed to update Sanity', error: err.message });
    }
}
