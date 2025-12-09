import { loadContent, loadCourseFiles } from './src/utils/contentLoader.js';

async function test() {
    console.log('--- Testing Novedades ---');
    const news = await loadContent('novedades');
    console.log('News found:', news.length);
    if (news.length > 0) console.log('First news title:', news[0].title);

    console.log('\n--- Testing Eventos (Primario) ---');
    const events = await loadContent('eventos', 'primario');
    console.log('Primary Events found:', events.length);
    if (events.length > 0) console.log('First event title:', events[0].title);

    console.log('\n--- Testing Course Files ---');
    // Note: This relies on the file actually existing and Vite glob working in this context
    // This script might not fully work without Vite's build context for 'import.meta.glob'
    // but serves as a logic check if run within the app. 
    console.log('Skipping standalone execution of course file check as it depends on Vite context.');
}

// NOTE: This file cannot be run directly with 'node' because of import.meta.glob and ESM.
// We will verification via the browser/app itself.
// This file is just for reference/placeholder.
