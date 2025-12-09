import fs from 'fs';
import path from 'path';
import fm from 'front-matter';

const contentDir = path.join(process.cwd(), 'public/content');
const outputFile = path.join(contentDir, 'index.json');

// Helper to determine icon based on file extension (kept for compatibility logic if needed)
const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(ext)) return 'pdf';
    return 'file';
};

const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
};

const main = () => {
    if (!fs.existsSync(contentDir)) {
        console.error('Directory public/content does not exist.');
        return;
    }

    const files = getAllFiles(contentDir);
    const index = [];

    const galleriesMap = {};

    files.forEach(filePath => {
        const isMarkdown = filePath.endsWith('.md');
        // Check for gallery images (galeria*.web/jpg/png)
        const isGalleryImage = filePath.match(/[\\/]galeria.*\.(webp|jpg|jpeg|png)$/i);

        const relativePath = path.relative(contentDir, filePath).replace(/\\/g, '/');
        const parts = relativePath.split('/');
        const collection = parts[0];

        // 0. Collect Isolated Gallery Images
        if (isGalleryImage) {
            // ID is the parent folder name
            const parentFolder = parts[parts.length - 2];
            const collectionName = parts[parts.length - 3] || parts[0]; // e.g. 'talleres' inside 'content/talleres/yoga'

            // Only strictly for 'talleres' or known collections
            if (collectionName === 'talleres' || collection === 'talleres') {
                const id = parentFolder;
                const fullUrl = `/content/${relativePath}`;

                if (!galleriesMap[id]) {
                    galleriesMap[id] = [];
                }
                galleriesMap[id].push(fullUrl);
            }
        }

        // 1. Process Markdown (Posts)
        if (isMarkdown) {
            try {
                const rawContent = fs.readFileSync(filePath, 'utf8');
                const { attributes } = fm(rawContent);

                const url = `/content/${relativePath}`;

                // id is filename without ext, or folder name if index.md
                const filename = parts[parts.length - 1];
                const parentFolder = parts[parts.length - 2];
                const id = filename === 'index.md' ? parentFolder : filename.replace('.md', '');

                // Fallback for image
                let image = attributes.image;
                if (image && !image.startsWith('/') && !image.startsWith('http')) {
                    const dirUrl = url.substring(0, url.lastIndexOf('/'));
                    image = `${dirUrl}/${image}`;
                }

                // Gallery Detection (Files scan) - Kept for valid MDs
                let gallery = [];
                try {
                    const dirPath = path.dirname(filePath);
                    const dirFiles = fs.readdirSync(dirPath);
                    gallery = dirFiles
                        .filter(f => f.match(/^galeria.*\.(webp|jpg|jpeg|png)$/i))
                        .map(f => {
                            const dirUrl = url.substring(0, url.lastIndexOf('/'));
                            return `${dirUrl}/${f}`;
                        });
                } catch (e) {
                    console.warn(`Could not scan for gallery in ${filePath}`);
                }

                index.push({
                    id,
                    collection,
                    subtype: 'post', // Distinguish from files
                    ...attributes,
                    image,
                    gallery, // Add gallery array
                    url,
                    dateObj: attributes.date ? new Date(attributes.date) : new Date(0)
                });

            } catch (err) {
                console.error(`Error processing ${filePath}:`, err);
            }
        }
        // 2. Process Files (PDFs, docs, etc.) ONLY in 'cursos' collection
        else if (collection === 'cursos' && !['.json', '.DS_Store'].some(ext => filePath.endsWith(ext))) {
            const url = `/content/${relativePath}`;
            const filename = parts[parts.length - 1];

            // Try to guess metadata from path
            // Structure: cursos / [level] / [courseId] / [turn?] / file.ext
            // turn might not exist as a folder.

            index.push({
                id: filename,
                collection,
                subtype: 'file',
                title: filename.replace(/\.[^/.]+$/, ""), // Remove extension from title
                filename: filename,
                url,
                // Add sorting or filtering metadata if possible
                level: parts[1],
                course: parts[2], // e.g. '1-grado'
                dateObj: new Date(fs.statSync(filePath).mtime) // Use file modified time
            });
        }
    });

    // 3. Merge Orphan Galleries into Index
    // If an item with ID exists, add gallery. If not, create 'gallery-only' item.
    Object.keys(galleriesMap).forEach(id => {
        const existingItem = index.find(i => i.id === id);
        if (existingItem) {
            // Merge unique images
            const newImages = galleriesMap[id].filter(img => !existingItem.gallery.includes(img));
            existingItem.gallery = [...(existingItem.gallery || []), ...newImages];
        } else {
            // Create Orphan Item for merging with Sheet later
            index.push({
                id,
                collection: 'talleres', // Assumption based on logic above
                subtype: 'gallery-only',
                title: id.charAt(0).toUpperCase() + id.slice(1), // Fallback title
                gallery: galleriesMap[id],
                dateObj: new Date(0),
                showInHome: false // Default to false for orphans
            });
        }
    });

    // Sort by date descending
    index.sort((a, b) => b.dateObj - a.dateObj);

    // Remove dateObj before saving to keep JSON clean
    const cleanIndex = index.map(({ dateObj, ...rest }) => rest);

    fs.writeFileSync(outputFile, JSON.stringify(cleanIndex, null, 2));
    console.log(`Generated index.json with ${cleanIndex.length} items at ${outputFile}`);
};

main();
