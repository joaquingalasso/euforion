
export const UNIFORMS_DATA = [
    {
        id: 1,
        name: 'Buzo',
        description: 'Buzo de frisa de algodón, ideal para uso diario y abrigo ligero.',
        usage: 'Abrigo',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Abrigo',
        images: {
            model: '/images/uniformes/modelos/buzo.png',
            real: ['/images/uniformes/real/buzo.png', '/images/uniformes/real/buzo-atras.png'],
            ai: '/images/uniformes/ai/conjunto.png'
        },
    },
    {
        id: 2,
        name: 'Campera',
        description: 'Campera institucional con cierre, perfecta para los días más frescos.',
        usage: 'Abrigo',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Abrigo',
        images: {
            model: '/images/uniformes/modelos/campera.png',
            real: ['/images/uniformes/real/campera.png', '/images/uniformes/real/campera-atras.png'],
            ai: '/images/uniformes/ai/trio.png'
        },
    },
    {
        id: 3,
        name: 'Chomba',
        description: 'Chomba de piqué de algodón, parte del uniforme de uso diario.',
        usage: 'Diario',
        levels: ['Primaria', 'Secundaria'],
        type: 'Superior',
        images: {
            model: '/images/uniformes/modelos/chomba.png',
            real: ['/images/uniformes/real/chomba.png'],
            ai: '/images/uniformes/ai/chomba-pantalon.png'
        },
    },
    {
        id: 4,
        name: 'Remera Manga Corta',
        description: 'Remera clásica de algodón para uso diario.',
        usage: 'Diario',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Superior',
        images: {
            model: '/images/uniformes/modelos/remera.png',
            real: ['/images/uniformes/real/manga-corta-adelante.png', '/images/uniformes/real/remera-atras.png'],
            ai: '/images/uniformes/ai/remera.png'
        },
    },
    {
        id: 5,
        name: 'Remera Manga Larga',
        description: 'Remera clásica de algodón manga larga para media estación.',
        usage: 'Diario',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Superior',
        images: {
            model: '/images/uniformes/modelos/remera.png',
            real: ['/images/uniformes/real/manga-larga-adelante.png', '/images/uniformes/real/remera-atras.png'],
        },
    },
    {
        id: 6,
        name: 'Remera Deportiva',
        description: 'Remera de tela técnica para actividades de educación física.',
        usage: 'Educación Física',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Deportivo',
        images: {
            model: '/images/uniformes/modelos/deportiva.png',
            real: ['/images/uniformes/real/camiseta-deportiva.png', '/images/uniformes/real/deportiva-atras.png'],
            ai: '/images/uniformes/ai/remera.png'
        },
    },
    {
        id: 7,
        name: 'Pantalón / Chupín',
        description: 'Pantalón de jogging clásico, cómodo para el día a día.',
        usage: 'Diario',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Inferior',
        images: {
            model: '/images/uniformes/modelos/pantalon.png',
            real: ['/images/uniformes/real/pantalon.png'],
        },
    },
    {
        id: 8,
        name: 'Bermuda / Short',
        description: 'Short deportivo para las clases de educación física.',
        usage: 'Educación Física',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Deportivo',
        images: {
            model: '/images/uniformes/modelos/short.png',
            real: ['/images/uniformes/real/short.png'],
        },
    },
    {
        id: 9,
        name: 'Polar',
        description: 'Buzo de polar, una capa extra de abrigo para el invierno.',
        usage: 'Abrigo',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Abrigo',
        images: {
            model: '/images/uniformes/modelos/polar.png',
            real: ['/images/uniformes/real/polar.png'],
            ai: '/images/uniformes/ai/trio.png'
        },
    },
    {
        id: 10,
        name: 'Mochila',
        description: 'Mochila institucional oficial, espaciosa y resistente.',
        usage: 'Accesorio',
        levels: ['Inicial', 'Primaria', 'Secundaria'],
        type: 'Accesorio',
        images: {
            model: '/images/uniformes/modelos/mochila.png',
            real: ['/images/uniformes/real/mochila.png'],
        },
    },
];

export const PRICES_DATA = [
    { article: 'Campera', description: 'Modelo Clásico', size: 'T. 1 al 14', price: '$35.000' },
    { article: 'Campera', description: 'Modelo Clásico', size: 'T. S al L', price: '$40.000' },
    { article: 'Buzo', description: 'Cuello Redondo', size: 'T. 1 al 14', price: '$28.000' },
    { article: 'Buzo', description: 'Cuello Redondo', size: 'T. S al L', price: '$32.000' },
    { article: 'Remera Clásica', description: 'Manga Corta', size: 'T. 1 al 14', price: '$15.000' },
    { article: 'Remera Clásica', description: 'Manga Corta', size: 'T. S al XL', price: '$18.000' },
    { article: 'Remera Clásica', description: 'Manga Larga', size: 'T. 1 al 14', price: '$17.000' },
    { article: 'Remera Clásica', description: 'Manga Larga', size: 'T. S al XL', price: '$20.000' },
    { article: 'Remera Deportiva', description: 'Educación Física', size: 'T. 1 al 14', price: '$16.000' },
    { article: 'Remera Deportiva', description: 'Educación Física', size: 'T. S al L', price: '$19.000' },
    { article: 'Chomba', description: 'Piqué de Algodón', size: 'T. 1 al 14', price: '$20.000' },
    { article: 'Chomba', description: 'Piqué de Algodón', size: 'T. S al L', price: '$23.000' },
    { article: 'Pantalón / Chupín', description: 'Clásico', size: 'T. 1 al 14', price: '$25.000' },
    { article: 'Pantalón / Chupín', description: 'Clásico', size: 'T. S al L', price: '$29.000' },
    { article: 'Bermuda / Short', description: 'Deportivo', size: 'T. 1 al 14', price: '$14.000' },
    { article: 'Bermuda / Short', description: 'Deportivo', size: 'T. S al L', price: '$17.000' },
    { article: 'Polar', description: 'Abrigo', size: 'T. 1 al 14', price: '$30.000' },
    { article: 'Polar', description: 'Abrigo', size: 'T. S al L', price: '$35.000' },
    { article: 'Mochila', description: 'Institucional', size: 'Único', price: '$25.000' },
    { article: 'Gorra', description: 'Institucional', size: 'Único', price: '$10.000' },
    { article: 'Pintor', description: 'Jardín', size: 'Único', price: '$12.000' },
    { article: 'Bolsa de tela', description: 'Institucional', size: 'Único', price: '$8.000' },
];

export const SIZES_BUZO = {
    image: '/images/uniformes/medidas/buzo.png',
    data: [
        { talle: '2', a: 30, b: 41 },
        { talle: '4', a: 32, b: 44 },
        { talle: '6', a: 35, b: 48 },
        { talle: '8', a: 38, b: 52 },
        { talle: '10', a: 40, b: 55 },
        { talle: '12', a: 43, b: 59 },
        { talle: '14', a: 46, b: 63 },
        { talle: 'S', a: 50, b: 65 },
        { talle: 'M', a: 54, b: 68 },
        { talle: 'L', a: 58, b: 71 },
    ]
};

export const SIZES_REMERA = {
    image: '/images/uniformes/medidas/remera.png',
    data: [
        { talle: '2', a: 35, b: 42 },
        { talle: '4', a: 38, b: 46 },
        { talle: '6', a: 40, b: 50 },
        { talle: '8', a: 42, b: 54 },
        { talle: '10', a: 44, b: 58 },
        { talle: '12', a: 46, b: 61 },
        { talle: '14', a: 49, b: 64 },
        { talle: 'S', a: 53, b: 68 },
        { talle: 'M', a: 56, b: 70 },
        { talle: 'L', a: 59, b: 72 },
        { talle: 'XL', a: 61, b: 74 },
    ]
};

export const SIZES_CHUPIN = {
    image: '/images/uniformes/medidas/chupin.png',
    data: [
        { talle: '2', largo: 54 },
        { talle: '4', largo: 63 },
        { talle: '6', largo: 70 },
        { talle: '8', largo: 76 },
        { talle: '10', largo: 83 },
        { talle: '12', largo: 92 },
        { talle: '14', largo: 95 },
        { talle: 'S', largo: 104 },
        { talle: 'M', largo: 110 },
        { talle: 'L', largo: 114 },
    ]
};

export const SIZES_BERMUDA = {
    image: '/images/uniformes/medidas/bermuda.png',
    data: [
        { talle: '2', largo: 25 },
        { talle: '4', largo: 28 },
        { talle: '6', largo: 32 },
        { talle: '8', largo: 35 },
        { talle: '10', largo: 38 },
        { talle: '12', largo: 41 },
        { talle: '14', largo: 46 },
        { talle: 'S', largo: 48 },
        { talle: 'M', largo: 52 },
        { talle: 'L', largo: 54 },
    ]
};

export const SIZES_CAMPERA = {
    image: '/images/uniformes/medidas/campera.png',
    data: [
        { talle: '2', a: 32, b: 43 },
        { talle: '4', a: 34, b: 46 },
        { talle: '6', a: 37, b: 50 },
        { talle: '8', a: 40, b: 54 },
        { talle: '10', a: 42, b: 57 },
        { talle: '12', a: 45, b: 61 },
        { talle: '14', a: 48, b: 65 },
        { talle: 'S', a: 52, b: 67 },
        { talle: 'M', a: 56, b: 70 },
        { talle: 'L', a: 60, b: 73 },
        { talle: 'XL', a: 62, b: 75 },
    ]
};
