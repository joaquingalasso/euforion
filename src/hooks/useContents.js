import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { SHEET_AVISOS_URL, SHEET_EVENTOS_URL, SHEET_NOVEDADES_URL, SHEET_TALLERES_URL, SHEET_PERSONAL_URL, SHEET_LIBROS_URL } from '../config';

// Helper to transform Google Drive URLs to viewable images
const transformDriveImage = (url) => {
    if (!url) return null;
    if (url.includes('drive.google.com')) {
        let id = '';
        const parts = url.split('/');
        const dIndex = parts.indexOf('d');
        if (dIndex !== -1 && parts[dIndex + 1]) {
            id = parts[dIndex + 1];
        } else {
            const match = url.match(/id=([^&]+)/);
            if (match) id = match[1];
        }

        if (id) return `https://lh3.googleusercontent.com/d/${id}`;
    }
    return url;
};

// Hook to load content from Local JSON + Multiple Google Sheets
export const useContents = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Fetch Local Content
                const localRes = await fetch('/content/index.json');
                let localData = [];
                if (localRes.ok) {
                    localData = await localRes.json();
                    localData = localData.map(item => ({
                        ...item,
                        source: 'local',
                        dateObj: item.date ? new Date(item.date) : new Date(0),
                        // Local Content Defaults:
                        // showInHome: Default TRUE for local dev (so you can see what you create), unless explicit 'no'
                        // OR if user strictly wants empty=no everywhere, we can align.
                        // But usually local files are manual. Let's make them obey frontmatter or default to TRUE to be friendly?
                        // User said: "el show_home en general que si esté vacío sea un NO".
                        // Use strict interpretation.
                        showInHome: (item.showInHome === true || item.show_home === true || item.show_home === 'si'),
                        showInFeed: (item.showInFeed !== false && item.show_feed !== false && item.show_feed !== 'no'),
                        price: Array.isArray(item.price) ? item.price : (item.price || item.monto || '').split('\n').map(s => s.trim()).filter(Boolean),
                        featured: !!(item.featured || item.destacar || item.destacado)
                    }));
                } else {
                    console.warn("Could not load local content index.");
                }

                // 2. Fetch Sheets
                const fetchSheet = async (url, defaultCollection) => {
                    if (!url) return [];
                    try {
                        const res = await fetch(url);
                        if (!res.ok) return [];
                        const text = await res.text();
                        return await new Promise((resolve) => {
                            Papa.parse(text, {
                                header: true,
                                skipEmptyLines: true,
                                complete: (results) => {
                                    const parsed = results.data.map((row, index) => ({
                                        // Generate ID
                                        // Generate ID: Use explicit ID or normalize Title (slug) to match local folders
                                        id: row.id || (row.title ? row.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') : `item-${index}`),
                                        source: 'sheet',
                                        // Force collection from the URL context if provided, else fallback to row
                                        collection: defaultCollection.toLowerCase(),

                                        // Standard fields
                                        title: row.title,
                                        date: row.date,
                                        dateObj: (() => {
                                            if (!row.date) return new Date();
                                            // Handle DD/MM/YYYY or DD-MM-YYYY format manually
                                            if (row.date.match(/^\d{1,2}[/-]\d{1,2}[/-]\d{4}$/)) {
                                                const [day, month, year] = row.date.split(/[/-]/).map(Number);
                                                return new Date(year, month - 1, day);
                                            }
                                            return new Date(row.date);
                                        })(),
                                        excerpt: row.excerpt || row.bajada || '',
                                        content: row.content || '',
                                        category: row.category || '',
                                        image: transformDriveImage(row.image),
                                        link: row.link || null,
                                        catalogLink: row.catalogLink || row.link_catalogo || row.disponibilidad || null,
                                        author: row.author || row.autor || '',

                                        // Events/Workshops fields
                                        // Events/Workshops fields
                                        time: (row.time || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean),
                                        schedule: (row.schedule || row.time || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean),
                                        location: row.location || '',
                                        instructor: (row.instructor || row.teacher || '').replace(/^\s*profe(sor|sora)?[\.:]?\s*/i, ''),

                                        // Audience/Target
                                        target: row.target ? row.target.split(',').map(s => s.trim()) : [],
                                        audience: row.audience ? row.audience.split(',').map(s => s.trim()) : (row.target ? row.target.split(',').map(s => s.trim()) : []),

                                        // Workshop specifics
                                        requirements: row.requirements ? row.requirements.split(';').map(s => s.trim()) : [],
                                        contact: row.contact || '',
                                        contact_phone: row.contact_phone || '',
                                        teacher_image: transformDriveImage(row.teacher_image),

                                        // Personal fields
                                        role: row.role || row.cargo || '', // 'docente', 'directivo', 'staff'
                                        subject: row.subject || row.materia || '',

                                        expirationDate: row.expirationDate || null,

                                        level: (row.type || 'info').toLowerCase().trim(), // For notices: info, alert, warning
                                        // Explicit Page Targeting (User request: "colocando las rutas de la web")
                                        // Column name in sheet can be 'pages' or 'rutas'
                                        pages: (row.pages || row.rutas || '').split(',').map(s => s.trim()).filter(Boolean),

                                        // Featured / Destacado
                                        featured: ['si', 'true', 'yes'].includes((row.featured || row.destacar || row.destacado || '').toLowerCase().trim()),

                                        // Pricing / Monto (Array handling)
                                        price: (row.monto || row.price || '').split('\n').map(s => s.trim()).filter(Boolean),

                                        // Collection Grouping (e.g. Lote Verano, Donación X)
                                        // Using 'group_name' to avoid conflict with 'collection' type
                                        group_name: row.collection || row.coleccion || '',

                                        level: (row.type || 'info').toLowerCase().trim(), // For notices: info, alert, warning
                                        tagline: row.tagline || '',

                                        // Visibility Controls
                                        // showInHome: Default FALSE. Must be explicit 'si' or 'true'.
                                        // Note: Added trim() to ensure no whitespace issues.
                                        showInHome: !!(row.show_home && ['si', 'true', 'yes'].includes(row.show_home.toLowerCase().trim())),

                                        // showInFeed: Default TRUE. Hidden only if 'no' or 'false'.
                                        showInFeed: !(row.show_feed && (row.show_feed.toLowerCase().trim() === 'no' || row.show_feed.toLowerCase().trim() === 'false')),
                                    }));

                                    // Debug specific item
                                    /*
                                    const debugItem = parsed.find(p => p.title.includes('Suspensión'));
                                    if(debugItem) console.log('DEBUG AVISO:', debugItem.title, 'ShowHome:', debugItem.showInHome, 'Raw:', results.data.find(r => r.title.includes('Suspensión')).show_home);
                                    */

                                    resolve(parsed);
                                },
                                error: (err) => {
                                    console.error(`Error parsing CSV from ${url}:`, err);
                                    resolve([]);
                                }
                            });
                        });
                    } catch (e) {
                        console.error("Error fetching sheet:", url, e);
                        return [];
                    }
                };

                // Fetch all sheets in parallel
                const [avisosData, eventosData, novedadesData, talleresData, personalData, librosData] = await Promise.all([
                    fetchSheet(SHEET_AVISOS_URL, 'avisos'),
                    fetchSheet(SHEET_EVENTOS_URL, 'eventos'),
                    fetchSheet(SHEET_NOVEDADES_URL, 'novedades'),
                    fetchSheet(SHEET_TALLERES_URL, 'talleres'),
                    fetchSheet(SHEET_PERSONAL_URL, 'personal'),
                    fetchSheet(SHEET_LIBROS_URL, 'libros')
                ]);

                // 3. Merge Strategies
                // We need to merge Local "Orphans" (Galleries) into Sheet items if IDs match.
                // Also, if a Local item exists with same ID as Sheet, we might want to suppress the Local one to valid duplicates, 
                // BUT keep its gallery images.

                // A. Map Local Items by ID
                const localMap = new Map();
                localData.forEach(item => {
                    // key lookup strategies: id, or title normalized
                    const key = item.id.toLowerCase();
                    localMap.set(key, item);
                });

                // B. Enrich Sheet Data with Local Assets (Gallery)
                const enrichedTalleres = talleresData.map(sheetItem => {
                    // Try to find matching local item
                    // 1. Exact ID match (if sheet has explicit ID)
                    // 2. Title match (normalized)
                    const titleKey = sheetItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    const match = localMap.get(sheetItem.id.toLowerCase()) || localMap.get(titleKey);

                    if (match && match.gallery && match.gallery.length > 0) {
                        return {
                            ...sheetItem,
                            gallery: match.gallery
                        };
                    }
                    return sheetItem;
                });

                // C. Filter Local Data to remove items that are now represented by Sheet data 
                // (to avoid duplicates in the final list)
                const finalLocalData = localData.filter(localItem => {
                    // If this local item was used to enrich a sheet item, do we hide it?
                    // If it's "gallery-only", definite yes.
                    // If it's a full MD, user deleted it so it won't be here.
                    // If user keeps MD + Sheet, we usually want Sheet to win or valid distinct items.
                    // Let's assume if title matches, Sheet wins.
                    if (localItem.subtype === 'gallery-only') return false;

                    const titleKey = localItem.id.toLowerCase();
                    const hasSheetEquivalent = talleresData.some(s =>
                        s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === titleKey
                    );
                    return !hasSheetEquivalent;
                });

                // 4. Combine
                const merged = [
                    ...finalLocalData,
                    ...avisosData,
                    ...eventosData,
                    ...novedadesData,
                    ...enrichedTalleres,
                    ...personalData,
                    ...librosData
                ].sort((a, b) => b.dateObj - a.dateObj);

                setData(merged);

            } catch (err) {
                console.error("Error in useContents:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getCollection = (collectionName) => {
        return data.filter(item => item.collection === collectionName);
    };

    return { data, loading, error, getCollection };
};
