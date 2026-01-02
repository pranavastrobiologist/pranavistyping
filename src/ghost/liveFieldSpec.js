/**
 * LiveField Contract & Specification
 * 
 * This file defines the types and structure for "Live Fields" - content elements
 * that are editable in Ghost Mode.
 * 
 * A LiveField must identify itself to the Ghost Layer using a steganographic ID.
 */

/**
 * @typedef {string} DocumentId - The unique ID of the document in CMS (e.g. Sanity _id)
 */

/**
 * @typedef {string} FieldPath - Dot-notation path to the field (e.g. "hero.title" or "content[0].text")
 */

/**
 * @typedef {string} LiveFieldId
 * Format: "ghost:<DocumentId>:<FieldPath>:<Type>"
 * Example: "ghost:home-page:hero.title:string"
 * 
 * This ID is embedded in the DOM via `data-ghost-id` attribute.
 */

/**
 * @typedef {Object} LiveFieldProps
 * @property {DocumentId} docId
 * @property {FieldPath} field
 * @property {string} type - 'string', 'text', 'image', 'portable-text'
 * @property {string | React.ReactNode} initialValue - The server-rendered content
 * @property {string} [className]
 * @property {React.ElementType} [as] - Component to render as (default: 'div' or 'span')
 */

/**
 * Steganographic Encoder
 * Encodes document and field data into a unique string ID safe for DOM attributes.
 * 
 * @param {DocumentId} docId 
 * @param {FieldPath} field 
 * @param {string} type 
 * @returns {LiveFieldId}
 */
export function encodeLiveFieldId(docId, field, type = 'string') {
    return `ghost:${docId}:${field}:${type}`;
}

/**
 * Steganographic Decoder
 * Decodes a DOM attribute back into actionable field data.
 * 
 * @param {LiveFieldId} liveId 
 * @returns {{ docId: DocumentId, field: FieldPath, type: string } | null}
 */
export function decodeLiveFieldId(liveId) {
    if (!liveId || !liveId.startsWith('ghost:')) return null;
    const parts = liveId.split(':');
    if (parts.length < 4) return null;

    return {
        docId: parts[1],
        field: parts[2],
        type: parts[3]
    };
}
