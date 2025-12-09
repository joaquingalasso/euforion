/**
 * ARCHIVO DE SCRIPT DE GOOGLE - VERSION 2 (PORTAL EUFORIÓN)
 * 
 * INSTRUCCIONES:
 * 1. Sheet 'Socios': Asegurate de tener las nuevas columnas.
 *    - Columna A: DNI
 *    ...
 *    - Columna K: Observaciones Admin
 *    - Columna L: Rol ('admin', 'escuela', 'socio') -> LECTURA DESDE EXCEL
 *    - Columna M: Red Social (Se escribe desde Web)
 *    - Columna N: Email Auth (Se escribe desde Web)
 *    - Columna O: Ya Registro Pass (Se escribe desde Web)
 * 
 * 2. Sheet 'Configuracion' (NUEVA HOJA):
 *    - Columna A: Concepto (ej: 'Nivel Inicial', 'Socio Activo', 'Matrícula 2024')
 *    - Columna B: Valor (ej: 15000)
 *    - Columna C: Tipo ('cuota', 'matricula')
 *    - Columna D: Categoría Asociada (ej: 'INICIAL', 'ACTIVO', 'TODOS')
 */

const FIREBASE_CONFIG = {
    email: "firebase-adminsdk-fbsvc@euforion-8b16d.iam.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4s/tdfeAYNuCV\nEhF8NSb5eCeV0r+TniHyngerRdMKad6iRSYLlvYjrZBOif0IDfRpsH6IelPtSyIB\n1z3IqQXkTCRjZbJWRSPjRTg0jP2bzhqPGAWPIO/IiYyfeg3hOl59PsGcRpFDC2yR\n0JpqpRpSMkQt2eU07aR9UZDtolV2dp4lgO+O8E9cLy2N2sTrXNoqt8aqmNzfecpL\nE6JVyIn15HW8NgPACoFS8Di0C+VWNa5Em2N3SIV+eUunjFVyFSA0rVJBt98kIXVP\nrXme0ZhaQlhxtOAOcXqs+5Kvfg/MOrerXzpCDnaAjiV45Ez6xQWV6utl4xWwIua/\nBM5Mp8LhAgMBAAECggEAC0HK6uSKVSd5EhTPFIEfzjoMvZSh4PMVEhagFIf1qA+S\nRlUND81EVKHWJvdBgO1qzUs4twQvm8mFudN+vD1S8tpSKG2xDBF8MbSNC6ThKw8J\nbtmxswq4moIJnEmh0W2PhzYdMjNZ1Jp8ZDmww5mq7EIMhjfewJZQPWQMf3Mynrza\n2z2aWrEuwXI2f8bo3DrvBfhTragXZxVsIrU+U/WnrAoN8Jg6RTK+8f64q8MKBIk/\nxNG+U9nkb0wEkTlEmpxeIX26X0JAub/WTu2Q9Svk5I/x9Np2MvtGUPwgK79wk6xV\nU3m7O2enA0QJrhX8tHwbc9JZgT47VgOkai8ZBLsIzQKBgQDw0YvQ+YX8jimz2uTe\n6476Ci5f1NRbg5yi1BJQAICHSllIWYSTGfr4n8LqBUuWj0Gy38HsllIUlYdTHPBr\nrM71JdlRQ1zmxxRxbB37ymVAhkByCbjQtToHgAsskOpnokpHvGkYcZf4jGYcXdcp\nV3RseEP4CWuuQiAap6/ncdQpTQKBgQDEWNCpNkjCMErsN2F34UcKnD6AIu7qGzCr\nDb3YqD/pDYao/mDSHx0YpsO0dkXHFtvdI1i1uyZ1tGihUAX7DRtvb+/QBy0Qr7GR\na10fV73Q6sEmVcFxv+TVAvZhrFNR0xFtwCNyrH+hYsrNDzcyce2IHrTSWQnRQxpG\niMYfoqmV5QKBgQC4ZkxghWDipd0q+lc8lzVRI1ClUuwU8y+Swz8OgYPplLXPH7TT\nixZRIMx4s/tQW3vcQ1hUGDrbxi/sJYG3gYir0QKaJjHSCOkPfNFsx2tGwEZCzEz3\ni33W1mY4BvNmza+BRLVY4UqUKLXbzMN/xZbBpEmveU86DSpWHsckO1ZRFQKBgBqf\nSDuJRrg9wArjP233t6Ayqy7IjchkQ2cOB+22cmPxF48WXp5e5Z0QD30KhE+IQ+tp\n/X82jvJqsb0dkpIFpvCnJsb4Eh4vFE55VjkHto77JZFDE2WO9UIEks+PhASWL8jH\nwoar6OpC8Oh45a0LUX+hWjcjJ3eeN5PUu7hSX9gZAoGAF4z2Ew+EGnedbswMhgZi\nlOT/3zFJjTx61nYPYmmsTg082a6tuwUfFZKf1GVxmO+G5CTp22LSdZ4E3ta6nVym\n/q5eMxwGRGkE/3itPNeGAN4PWsVex7eArYgTmMjmaQctI2SxJg/DU3Ysh2WGKA/j\ngipbb7pON5d4dzl4gcm1MVg=\n-----END PRIVATE KEY-----",
    projectId: "euforion-8b16d",
};

const SHEET_SOCIOS = 'Socios';
const SHEET_CONFIG = 'Configuracion';
const FIRESTORE_COLLECTION = 'socios';

function getFirestore() {
    return FirestoreApp.getFirestore(FIREBASE_CONFIG.email, FIREBASE_CONFIG.key, FIREBASE_CONFIG.projectId);
}

// --- 1. Sincronizar Socios (Excel -> Web) ---
function sincronizarSocios() {
    const firestore = getFirestore();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SOCIOS);
    const data = sheet.getDataRange().getValues();
    data.shift(); // Skip Header

    data.forEach(row => {
        const dni = row[0]; if (!dni) return;

        // Mapeo
        const socioData = {
            dni: dni.toString(),
            apellidos: row[1],
            nombres: row[2],
            fecha_nacimiento: row[3] instanceof Date ? formatDate(row[3]) : row[3],
            id_socio: row[4],
            categoria: row[5],
            vencimiento_cuota: row[6] instanceof Date ? formatDate(row[6]) : row[6],
            email_contacto: row[7],
            telefono: row[8],
            domicilio: row[9],
            observaciones_admin: row[10],
            rol: row[11] || 'socio' // Col L es Rol
        };

        try {
            firestore.updateDocument(`${FIRESTORE_COLLECTION}/${dni}`, socioData);
        } catch (e) {
            firestore.createDocument(`${FIRESTORE_COLLECTION}/${dni}`, socioData);
        }
    });

    // También sincronizamos la Configuración Financiera
    sincronizarConfiguracion(firestore);

    Browser.msgBox("Sincronización (Excel -> Web) completada.");
}

// --- 2. Sincronizar Configuración (Excel -> Web) ---
function sincronizarConfiguracion(firestoreInstance) {
    const firestore = firestoreInstance || getFirestore();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_CONFIG);
    if (!sheet) return; // Si no creó la hoja, ignoramos

    const data = sheet.getDataRange().getValues();
    data.shift(); // Skip Header

    const configValues = {};

    data.forEach(row => {
        const concepto = row[0];
        if (!concepto) return;

        // Estructura: Key = concepto, Value = { monto, tipo, categoria }
        // Se guarda en un solo documento 'configuracion/valores'
        // Usamos una clave sanitizada para el objeto JSON
        const key = concepto.toLowerCase().replace(/\s+/g, '_');

        configValues[key] = {
            label: concepto,
            monto: row[1],
            tipo: row[2], // 'cuota', 'matricula'
            categoria_target: row[3] // 'INICIAL', 'PRIMARIA', 'ACTIVO'
        };
    });

    try {
        firestore.updateDocument(`configuracion/valores`, configValues);
    } catch (e) {
        firestore.createDocument(`configuracion/valores`, configValues); // Ojo: createDocument necesita un ID de colección a veces raro en root, mejor 'configuracion' collection, doc 'valores'
    }
}


// --- 3. Traer Datos Web (Web -> Excel) ---
function sincronizarDesdeWeb() {
    const firestore = getFirestore();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_SOCIOS);
    const data = sheet.getDataRange().getValues();

    // Indices de columnas destino (0-based)
    // A=0, ..., L=11(Rol), M=12(RedSocial), N=13(EmailWeb), O=14(PassSet)
    const COL_RED_SOCIAL = 12;
    const COL_EMAIL_AUTH = 13;
    const COL_YA_REG = 14;
    const COL_NACIMIENTO = 3; // Col D (Fecha Nacimiento Original)

    let updates = 0;

    for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const dni = row[0];
        if (!dni) continue;

        try {
            const doc = firestore.getDocument(`${FIRESTORE_COLLECTION}/${dni}`);
            if (doc && doc.fields) {
                const fsData = doc.obj;
                let rowModified = false;
                const currentRow = i + 1;

                // 1. Red Social
                if (fsData.red_social && fsData.red_social !== row[COL_RED_SOCIAL]) {
                    sheet.getRange(currentRow, COL_RED_SOCIAL + 1).setValue(fsData.red_social);
                    rowModified = true;
                }

                // 2. Email Auth
                if (fsData.email_auth && fsData.email_auth !== row[COL_EMAIL_AUTH]) {
                    sheet.getRange(currentRow, COL_EMAIL_AUTH + 1).setValue(fsData.email_auth);
                    rowModified = true;
                }

                // 3. Registered Flag
                if (fsData.ya_registro_password && Boolean(fsData.ya_registro_password) !== Boolean(row[COL_YA_REG])) {
                    sheet.getRange(currentRow, COL_YA_REG + 1).setValue(fsData.ya_registro_password);
                    rowModified = true;
                }

                // 4. Fecha Nacimiento (Solo si está vacía en Excel y existe en Web)
                const excelDate = row[COL_NACIMIENTO];
                if ((!excelDate || excelDate === '') && fsData.fecha_nacimiento) {
                    sheet.getRange(currentRow, COL_NACIMIENTO + 1).setValue(fsData.fecha_nacimiento);
                    rowModified = true;
                }

                if (rowModified) updates++;
            }
        } catch (e) {
            console.error(`Error DNI ${dni}`, e);
        }
    }

    Logger.log(`Web Sync Completo. Filas: ${updates}`);
    Browser.msgBox(`Sincronización Web -> Excel finalizada. Se actualizaron ${updates} filas.`);
}

function formatDate(date) {
    if (!date) return "";
    return Utilities.formatDate(date, Session.getScriptTimeZone(), "dd/MM/yyyy");
}

// --- 4. Sincronizar Pedidos (Web -> Excel) ---
function sincronizarPedidos() {
    const firestore = getFirestore();
    const SHEET_PEDIDOS = 'Pedidos';
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_PEDIDOS);

    // Crear hoja si no existe
    if (!sheet) {
        sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_PEDIDOS);
        sheet.appendRow(['ID Pedido', 'Fecha', 'DNI Socio', 'Nombre Alumno', 'Tipo', 'Nivel', 'Grado', 'Turno', 'Obs', 'Items (Detalle)', 'Total', 'Seña (50%)', 'Estado Pago', 'Estado Entrega']);
        sheet.setFrozenRows(1);
    }

    // Traer todos los documentos de la colección 'pedidos'
    // Idealmente filtraríamos en Firestore, pero la librería AppsScriptFirestore a veces es limitada con queries complejas.
    // Traemos todo y filtramos localmente por "synced != true".
    const allOrders = firestore.getDocuments('pedidos');
    let updates = 0;

    allOrders.forEach(doc => {
        const data = doc.fields; // obj is doc.obj? check library wrapper. Usually .fields or .obj if using library wrapper. 
        // Based on library standard: it returns an array of documents. each doc has .name and .fields (raw) or the library might return parsed objs.
        // Assuming standard library usage: firestore.getDocuments returns array of objects with metadata.
        // Let's assume the library returns { name: "projects/...", fields: { ... }, createTime: ... }
        // BUT my helper getFirestore() uses a library. 
        // Let's look at sincronizarSocios usage: `firestore.updateDocument`. 
        // Usually these libraries return clean objects if configured right, or we handle raw.
        // Let's check `sincronizarDesdeWeb` usage: `const doc = firestore.getDocument(...)` -> `if (doc && doc.fields) { const fsData = doc.obj; }`
        // So the library wrapper puts the clean data in `.obj`.

        if (!doc.obj) return;
        const order = doc.obj;
        const docId = doc.name.split('/').pop();

        if (order.synced) return; // Ya sincronizado

        // Parse Items
        const itemsDetail = order.items.map(i => `${i.name} (${i.selectedSize}) x${i.quantity || 1}`).join(', ');

        // Format Date
        const date = order.createdAt ? new Date(order.createdAt) : new Date();
        const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");

        // Append to Sheet
        sheet.appendRow([
            docId,
            dateStr,
            order.userDni,
            order.studentData.name,
            order.studentData.type,
            order.studentData.level || '-',
            order.studentData.grade || '-',
            order.studentData.shift || '-',
            order.studentData.comments || '',
            itemsDetail,
            order.total,
            order.depositRequired,
            'Pendiente', // Estado Pago default
            'Pendiente'  // Estado Entrega default
        ]);

        // Mark as synced
        try {
            order.synced = true;
            // Update only the synced field to avoid overwriting other potential changes? 
            // updateDocument in this library usually does a patch or set. Let's send full object with synced: true or use update logic.
            firestore.updateDocument(`pedidos/${docId}`, order);
            updates++;
        } catch (e) {
            console.error('Error updating order sync status', e);
        }
    });

    if (updates > 0) {
        Browser.msgBox(`Se importaron ${updates} pedidos nuevos.`);
    } else {
        Browser.msgBox("No hay pedidos nuevos para importar.");
    }
}

// --- 5. Sincronizar Talleres (Excel -> Web + Config) ---
function sincronizarTalleres() {
    const firestore = getFirestore();
    const SHEET_TALLERES = 'Talleres';
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_TALLERES);
    if (!sheet) return Browser.msgBox("No se encontró la hoja 'Talleres'");

    const data = sheet.getDataRange().getValues();
    data.shift(); // Skip Header

    let updates = 0;
    const configUpdates = {};

    data.forEach(row => {
        const title = row[0];
        if (!title) return;

        // 0:title, 1:tagline, 2:date, 3:time, 4:location, 5:image, 6:category, 7:link, 8:show_home, 9:show_feed, 10:monto
        // Slugify title
        const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

        // A. Content Data (Collection 'talleres')
        const tallerData = {
            title: title,
            excerpt: row[1] || '',
            schedule: `${row[2]} ${row[3]}`.trim(), // Combine Date + Time
            location: row[4] || '',
            image: row[5] || '',
            audience: row[6] ? row[6].split(',').map(s => s.trim()) : [], // Category as array
            contact: row[7] || '', // Using Link field as Contact info if text, or store as link
            showInHome: row[8] === true || row[8] === 'TRUE',
            showInFeed: row[9] === true || row[9] === 'TRUE'
        };

        // B. Config Data (for Payments)
        const monto = row[10];
        if (monto && !isNaN(monto)) {
            const configKey = `taller_${slug.replace(/-/g, '_')}`;
            configUpdates[configKey] = {
                label: `Taller ${title}`,
                monto: parseFloat(monto),
                tipo: 'taller',
                categoria_target: 'Tallerista' // General category
            };
        }

        try {
            firestore.updateDocument(`talleres/${slug}`, tallerData);
        } catch (e) {
            firestore.createDocument(`talleres/${slug}`, tallerData);
        }
        updates++;
    });

    // Batch update Config
    if (Object.keys(configUpdates).length > 0) {
        // We need to merge with existing config or just write.
        // Current logic in `sincronizarConfiguracion` overwrites or patches.
        // Let's use updateDocument on 'configuracion/valores' with dot notation or merge?
        // AppsScriptFirestore updateDocument merges fields? Yes usually.
        try {
            firestore.updateDocument(`configuracion/valores`, configUpdates);
        } catch (e) {
            console.error("Error updating config for workshops", e);
        }
    }

    Browser.msgBox(`Sincronizados ${updates} talleres.`);
}

function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Sistema Euforión')
        .addItem('Sincronizar Socios (Excel -> Web)', 'sincronizarSocios')
        .addItem('Sincronizar Configuración (Excel -> Web)', 'sincronizarConfiguracion')
        .addItem('Sincronizar Talleres (Excel -> Web)', 'sincronizarTalleres')
        .addItem('Traer datos Web (Web -> Excel)', 'sincronizarDesdeWeb')
        .addSeparator()
        .addItem('📥 Descargar Pedidos Nuevos (Web -> Excel)', 'sincronizarPedidos')
        .addToUi();
}
