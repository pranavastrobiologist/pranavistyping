import { createClient } from '@sanity/client';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const authHeader = req.headers.authorization;
    const SECRET_KEY = process.env.VITE_GHOST_SECRET_KEY;

    if (!authHeader || authHeader !== `Bearer ${SECRET_KEY}`) {
        console.warn(`[Ghost Server] Auth failed. Expected: ${SECRET_KEY?.slice(0, 3)}... Got: ${authHeader?.slice(0, 10)}...`);
        return res.status(401).json({ message: 'Unauthorized: Ghost Key mismatch or missing.' });
    }

    if (!process.env.SANITY_API_TOKEN) {
        console.error('[Ghost Server] Missing SANITY_API_TOKEN');
        return res.status(500).json({ message: 'Server Config Error: Sanity Write Token is missing.' });
    }

    const client = createClient({
        projectId: process.env.VITE_SANITY_PROJECT_ID,
        dataset: process.env.VITE_SANITY_DATASET || 'production',
        token: process.env.SANITY_API_TOKEN,
        useCdn: false,
        apiVersion: '2023-05-03',
    });

    const { docId, field, value } = req.body;

    if (!docId || !field) {
        return res.status(400).json({ message: 'Missing docId or field' });
    }

    console.log(`[Ghost Server] Upserting ${docId} :: ${field} = ${value}`);

    try {
        // Robust update: Create if not exists, then patch
        const transaction = client.transaction();

        // Ensure doc exists. We use a generic 'page' type for now.
        transaction.createIfNotExists({
            _id: docId,
            _type: 'page',
            title: 'Auto-generated Ghost Page'
        });

        transaction.patch(docId, (p) => p.set({ [field]: value }));

        await transaction.commit();

        return res.status(200).json({ success: true, message: 'Content persisted to Sanity' });
    } catch (err) {
        console.error('[Ghost Server Error]', err);
        return res.status(500).json({ message: 'Failed to update Sanity', error: err.message });
    }
}
