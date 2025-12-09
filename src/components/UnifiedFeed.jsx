import { useState, useEffect } from 'react';
import { useContents } from '../hooks/useContents'; // Use the hook instead of legacy loader
import { Link, useLocation } from 'react-router-dom';
import { FaCalendarAlt, FaBullhorn, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import FeedItem from './FeedItem';

/**
 * UnifiedFeed Component
 * Displays a list of content (novedades, eventos, avisos) filtered by tag OR current route path.
 * 
 * @param {string} tag - The filter tag (e.g., 'primario', 'inicial', '1-grado').
 * @param {string[]} types - Array of types to include: ['novedades', 'eventos', 'avisos'].
 * @param {string} className - Optional class name.
 * @param {number} limit - Max items to show (default 4).
 */
function UnifiedFeed({ tag, tags: propsTags, types = ['novedades', 'eventos', 'avisos'], className = '', limit = 4 }) {
    const { data, loading } = useContents();
    const location = useLocation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (loading) return;

        // 1. Get current path (clean trailing slash)
        const currentPath = location.pathname.endsWith('/') && location.pathname.length > 1
            ? location.pathname.slice(0, -1)
            : location.pathname;

        // 2. Prepare Tags
        const activeTags = (propsTags || (tag ? [tag] : [])).map(t => t.toLowerCase());

        // 3. Filter
        let filtered = data.filter(item => {
            // Filter by requested Types (Collection)
            // Note: item.collection is 'avisos', 'eventos', 'novedades'
            // item.type sometimes varies (e.g. 'novedades'), but collection is reliable from useContents
            if (!types.includes(item.collection)) return false;

            // --- A. Tag Matching ---
            // Matches if item.category OR item.target OR item.audience matches ANY activeTag
            const itemCat = item.category ? item.category.toLowerCase() : '';
            // Combined tags from hook (audience/target are arrays)
            const itemTags = [
                ...(item.target || []),
                ...(item.audience || []),
                ...(item.tags || []) // legacy local tags
            ].map(t => t.toLowerCase());

            const matchesTag = activeTags.some(filterTag =>
                itemCat === filterTag || itemCat.includes(filterTag) || itemTags.includes(filterTag)
            );

            // --- B. Page/Route Matching (New) ---
            // Matches if item.pages array includes currentPath
            const matchesPage = item.pages && item.pages.some(p => p.toLowerCase() === currentPath.toLowerCase());

            return matchesTag || matchesPage;
        });

        // 4. Sort by Date (Desc)
        filtered.sort((a, b) => b.dateObj - a.dateObj);

        // 5. Apply Limit
        setItems(filtered.slice(0, limit));

    }, [data, loading, tag, JSON.stringify(propsTags), JSON.stringify(types), limit, location.pathname]);

    if (loading) return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
            Cargando contenido...
        </div>
    );

    if (items.length === 0) return null;

    return (
        <div className={`unified-feed ${className}`}>
            <div className="grid grid-2" style={{ gap: '1.5rem', alignItems: 'stretch' }}>
                {items.map(item => (
                    <FeedItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default UnifiedFeed;
