/* ============================================
   MENU DIGITAL — La Jaiba Gastrobar
   ============================================ */

const WHATSAPP_NUMBER = '573022713343'; // <-- Cambia este número

// ---- SVG Icons ----
const ICONS = {
  fire:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  ice:     `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 6-8 4-8-4"/><path d="m20 18-8-4-8 4"/><path d="m2 12 10 6 10-6"/></svg>`,
  soup:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/><path d="M7 21h10"/><path d="M19.5 12c.5-1.5.5-3 .5-4"/><path d="M12 2v4"/><path d="m8 4 4 4 4-4"/></svg>`,
  bowl:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z"/><path d="M7 21h10"/><path d="M7 9h10"/></svg>`,
  fish:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M6.5 12c.94-3.46 4.94-6 11.5-6-3.46.94-6 4.94-6 11.5-2.25-1.35-4.78-2.15-5.5-5.5z"/><path d="M18 12H6.5"/><path d="m6.5 12-3.24 5.4a.5.5 0 0 0 .76.65L7 16.5l2 3 1-3z"/></svg>`,
  share:   `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  waves:   `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
  lobster: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226"/><path d="M21 12a9 9 0 0 1-9 9"/><path d="M3 12a9 9 0 0 1 9-9"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"/></svg>`,
  anchor:  `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>`,
  chef:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>`,
  pizza:   `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 22a10 10 0 0 1 0-20"/><path d="m2 12 10 10L22 2"/><circle cx="12" cy="12" r="2"/></svg>`,
  cake:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h0.01"/><path d="M12 4h0.01"/><path d="M17 4h0.01"/></svg>`,
  glass:   `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/></svg>`,
  beer:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 3 11 3s2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5z"/><path d="M5 20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9H5v9z"/></svg>`,
  music:   `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  dessert: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M12 17c5 0 8-2.69 8-6H4c0 3.31 3 6 8 6z"/><path d="M12 17v4"/><path d="M8 21h8"/><path d="M7.6 6.4a1 1 0 1 0 1.4-1.4"/><path d="M15 5a1 1 0 1 0 1 1"/><path d="M12 4a1 1 0 1 0 1 1"/></svg>`,
  drinks:  `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/><path d="M5 8h14"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/><line x1="12" y1="2" x2="12" y2="5"/></svg>`,
  wine:    `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5z"/></svg>`,
};

// Icono SVG para los productos (ola marina uniforme)
const PRODUCT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,180,216,0.6)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`;

// ---- Menu Data ----

const menuData = {
  'entradas-calientes': {
    icon: ICONS.fire,
    title: 'Entradas Calientes',
    desc: 'Para abrir el apetito',
    items: [
      { name: 'Muelas de Jaiba al Ajillo', price: '$21.900' },
      { name: 'Canasta de Patacón con Camarón', price: '$24.000' },
      { name: 'Canasta de Patacón con Caracol y Camarón', price: '$31.000' },
      { name: 'Canasta de Patacón con Pulpo', price: '$38.000' },
      { name: 'Canoa de Plátano Amarillo con Camarón', price: '$25.000' },
      { name: 'Canoa de Plátano Amarillo con Caracol y Camarón', price: '$31.900' },
      { name: 'Canoa de Plátano Amarillo con Pulpo', price: '$38.000' },
    ]
  },
  'entradas-frias': {
    icon: ICONS.ice,
    title: 'Entradas Frías',
    desc: 'Cócteles y ceviches frescos',
    subcategories: [
      {
        name: 'Cóctel de Camarón',
        items: [
          { name: 'Cóctel de Camarón Pequeño', price: '$19.000' },
          { name: 'Cóctel de Camarón Grande', price: '$31.900' },
        ]
      },
      {
        name: 'Cóctel Mixto Camarón y Caracol',
        items: [
          { name: 'Cóctel Mixto Pequeño', price: '$25.000' },
          { name: 'Cóctel Mixto Grande', price: '$33.900' },
        ]
      },
      {
        name: 'Ceviche de Camarón',
        items: [
          { name: 'Ceviche de Camarón Pequeño', price: '$23.900' },
          { name: 'Ceviche de Camarón Grande', price: '$33.900' },
        ]
      },
      {
        name: 'Cóctel o Ceviche Frutos del Mar',
        items: [
          { name: 'Frutos del Mar Pequeño', price: '$38.900' },
          { name: 'Frutos del Mar Grande', price: '$59.900' },
        ]
      },
    ]
  },
  'sancochos': {
    icon: ICONS.soup,
    title: 'Sancochos de Pescado',
    desc: 'Acompañados de arroz con coco y patacón',
    note: 'Acompañados de arroz con coco y patacón',
    items: [
      { name: 'Sancocho de Mojarra Roja', price: '$35.000' },
      { name: 'Sancocho de Mojarra Negra', price: '$35.000' },
      { name: 'Sancocho de Sierra', price: '$45.000' },
      { name: 'Sancocho de Róbalo', price: '$45.000' },
      { name: 'Sancocho de Pargo Rojo', price: '$52.000' },
    ]
  },
  'cazuelas': {
    icon: ICONS.bowl,
    title: 'Cazuelas',
    desc: 'Acompañadas de arroz con coco y patacón',
    note: 'Acompañadas de arroz con coco y patacón',
    items: [
      { name: 'Cazuela de Jaiba', price: '$32.000' },
      { name: 'Cazuela de Camarón', price: '$49.000' },
      { name: 'Cazuela de Camarón y Caracol', price: '$55.900' },
      { name: 'Cazuela de Camarón y Langostinos', price: '$62.900' },
      { name: 'Cazuela Mixta Frutos del Mar', price: '$73.900' },
    ]
  },
  'pescados': {
    icon: ICONS.fish,
    title: 'Pescados',
    desc: 'Acompañados de arroz con coco, patacón y ensalada',
    note: 'Acompañados de arroz con coco, patacón y ensalada',
    subcategories: [
      {
        name: 'Pargo Rojo',
        items: [
          { name: 'Pargo Rojo Frito', price: '$46.900' },
          { name: 'Pargo Rojo al Ajillo con Camarones', price: '$59.900' },
          { name: 'Pargo Rojo con Camarón y Caracol', price: '$64.900' },
          { name: 'Pargo Asado', price: '$49.990' },
        ]
      },
      {
        name: 'Bocachico',
        items: [
          { name: 'Viuda de Bocachico', price: '$59.900' },
          { name: 'Bocachico Asado', price: '$45.000' },
          { name: 'Bocachico al Ajillo', price: '$48.000' },
          { name: 'Bocachico Mixto', price: '$65.000' },
        ]
      },
      {
        name: 'Róbalo',
        items: [
          { name: 'Róbalo Frito', price: '$41.900' },
          { name: 'Róbalo al Ajillo con Camarones', price: '$52.900' },
          { name: 'Róbalo con Camarón y Caracol', price: '$66.900' },
          { name: 'Róbalo Asado', price: '$46.900' },
        ]
      },
      {
        name: 'Sierra',
        items: [
          { name: 'Sierra Frita', price: '$46.900' },
          { name: 'Sierra al Ajillo con Camarones', price: '$59.900' },
          { name: 'Sierra con Camarón y Caracol', price: '$64.900' },
          { name: 'Sierra Asada', price: '$49.990' },
        ]
      },
      {
        name: 'Mojarra Roja',
        items: [
          { name: 'Mojarra Roja Frita', price: '$39.900' },
          { name: 'Mojarra Roja al Ajillo con Camarones', price: '$43.900' },
          { name: 'Mojarra Roja con Caracol', price: '$62.900' },
          { name: 'Mojarra Roja Asada', price: '$43.900' },
        ]
      },
      {
        name: 'Mojarra Negra',
        items: [
          { name: 'Mojarra Negra Frita', price: '$39.900' },
          { name: 'Mojarra Negra al Ajillo con Camarones', price: '$43.900' },
          { name: 'Mojarra Negra con Caracol', price: '$62.900' },
          { name: 'Mojarra Negra Asada', price: '$43.900' },
        ]
      }
    ]
  },
  'picadas': {
    icon: ICONS.share,
    title: 'Picadas para Compartir',
    desc: 'Medallón de pescado, camarón al ajillo, mejillón, jaiba, langostino y cazuela',
    note: 'Medallón de pescado, camarón al ajillo, mejillón, jaiba, langostino y cazuela',
    items: [
      { name: 'Picada para Compartir 2 Personas', price: '$125.900' },
      { name: 'Picada para Compartir 4 Personas', price: '$189.900' },
      { name: 'Picada para Compartir 6 Personas', price: '$249.000' },
    ]
  },
  'otros-del-mar': {
    icon: ICONS.lobster,
    title: 'Otros del Mar',
    desc: 'Acompañados de arroz con coco y patacón',
    note: 'Acompañados de arroz con coco y patacón',
    items: [
      { name: 'Camarones al Ajillo', price: '$48.000' },
      { name: 'Langosta al Ajillo', price: '$60.900' },
      { name: 'Langosta Gratinada', price: '$66.990' },
      { name: 'Caracol Guisado', price: '$45.990' },
      { name: 'Pulpo Frutos del Mar', price: '$89.900' },
      { name: 'Explosión de Camarones en Salsa de Piña', price: '$69.900' },
      { name: 'Caracol y Camarón', price: '$82.900' },
      { name: 'Pulpo a la Parrilla', price: '$60.900' },
      { name: 'Filete de Tilapia', price: '$45.000' },
    ]
  },
  'langosta': {
    icon: ICONS.lobster,
    title: 'Langosta',
    desc: 'Sola o con camarones',
    note: 'Precios disponibles sola o acompañada con camarones',
    items: [
      { name: 'Langosta Pequeña', price: '$52.900' },
      { name: 'Langosta Pequeña con Camarones', price: '$68.000' },
      { name: 'Langosta Mediana', price: '$80.900' },
      { name: 'Langosta Mediana con Camarones', price: '$89.900' },
      { name: 'Langosta Grande', price: '$98.900' },
      { name: 'Langosta Grande con Camarones', price: '$109.000' },
    ]
  },
  'especialidades': {
    icon: ICONS.chef,
    title: 'Otras Especialidades',
    desc: 'Carnes y pollo de la casa',
    items: [
      { name: 'Pechuga a la Plancha', price: '$38.000' },
      { name: 'Pechuga Gratinada', price: '$42.000' },
      { name: 'Punta Gorda', price: '$38.000' },
    ]
  },
  'infantil': {
    icon: ICONS.share,
    title: 'Menú Infantil',
    desc: 'Para los más pequeños de la casa',
    items: [
      { name: 'Croquetas de Pollo + Papas y Gaseosa', price: '$38.000' },
    ]
  },
  'paellas': {
    icon: ICONS.bowl,
    title: 'Paellas',
    desc: 'Con langostino, mejillones, camarón y delicias del mar',
    note: 'Con langostino, mejillones, camarón y otras delicias del mar',
    items: [
      { name: 'Paella Sencilla', price: '$48.000' },
      { name: 'Paella para Compartir 2 Personas', price: '$82.000' },
      { name: 'Paella para Compartir 4 Personas', price: '$152.000' },
      { name: 'Paella para Compartir 6 Personas', price: '$232.000' },
      { name: 'Paella Especial de la Casa', price: '$302.000' },
    ]
  },
  'pastas': {
    icon: ICONS.waves,
    title: 'Pastas',
    desc: 'Preparadas al momento',
    items: [
      { name: 'Pasta de Camarón', price: '$42.000' },
      { name: 'Pasta de Pollo', price: '$40.000' },
      { name: 'Pasta de Camarón y Caracol', price: '$48.000' },
      { name: 'Pasta de Camarón y Langostino', price: '$68.900' },
      { name: 'Pasta Frutos del Mar', price: '$78.900' },
      { name: 'Pasta a la Langosta', price: '$125.000' },
    ]
  },
  'pizzas': {
    icon: ICONS.pizza,
    title: 'Pizzas',
    desc: 'Disponibles en Pizzeta, Mediana y Grande',
    pizzas: [
      { name: 'Jamón con Queso', pizzeta: '$20.000', mediana: '$38.000', grande: '$48.000' },
      { name: 'Hawaiana', pizzeta: '$20.000', mediana: '$38.000', grande: '$48.000' },
      { name: 'Camarón al Ajillo', pizzeta: '$28.000', mediana: '$45.000', grande: '$62.000' },
      { name: 'Camarón y Caracol', pizzeta: '$35.000', mediana: '$49.900', grande: '$66.900' },
      { name: 'Cuatro Carnes', pizzeta: '$28.000', mediana: '$49.900', grande: '$68.900' },
      { name: 'Pollo', pizzeta: '$20.900', mediana: '$38.000', grande: '$48.000' },
      { name: 'Carne Esmechada', pizzeta: '$25.000', mediana: '$40.900', grande: '$52.900' },
    ]
  },
  'postres': {
    icon: ICONS.dessert,
    title: 'Postres',
    desc: 'El dulce final perfecto',
    items: [
      { name: 'Torta de Queso / Naranja (con helado)', price: '$22.000' },
      { name: 'Arroz con Leche', price: '$12.000' },
    ]
  },
  'bebidas': {
    icon: ICONS.drinks,
    title: 'Bebidas',
    desc: 'Refrescantes opciones para acompañar tu comida',
    items: [
      { name: 'Jugos Naturales en Agua', price: '$10.000' },
      { name: 'Jugos Naturales en Leche', price: '$12.000' },
      { name: 'Coca Cola / Kola Roman / Sprite / Quatro', price: '$8.000' },
      { name: 'Colombiana', price: '$8.000' },
      { name: 'Prod. Postobón', price: '$8.000' },
      { name: 'Hatsu (frambuesa, fresa, sandía, uva, hierba limón)', price: '$8.000' },
      { name: 'Agua', price: '$5.000' },
      { name: 'Soda Schweppes', price: '$5.000' },
    ]
  },
  'cervezas': {
    icon: ICONS.beer,
    title: 'Cervezas Nacionales',
    desc: 'Las mejores marcas colombianas',
    items: [
      { name: 'Águila Light', price: '$5.000' },
      { name: 'Águila Negra', price: '$5.000' },
      { name: 'Costeña', price: '$5.000' },
      { name: 'Club Colombia', price: '$7.000' },
      { name: 'Coronita', price: '$6.000' },
    ]
  },
  'cocteles': {
    icon: ICONS.glass,
    title: 'Cócteles',
    desc: 'Creaciones especiales de la casa',
    cocteles: [
      { name: 'Fruto del Amor', price: '$25.000', desc: 'Bebida a base de frutos rojos, ácido cítrico y soda' },
      { name: 'Oleada de Verano', price: '$28.000', desc: 'Maracuyá, jengibre, zumo de limón y soda hatsu' },
      { name: 'Soda de Tamarindo', price: '$25.000', desc: 'Sirope de tamarindo, soda y zumo de limón' },
      { name: 'Soda de Maracuyá', price: '$25.000', desc: 'Sirope de maracuyá, soda y zumo de limón' },
      { name: 'Soda de Jamaica', price: '$25.000', desc: 'Sirope de jamaica, soda y zumo de limón' },
      { name: 'Soda de Corozo', price: '$25.000', desc: 'Sirope de corozo, soda y zumo de limón' },
      { name: 'Mojito Cubano de la Casa', price: '$28.000', desc: 'Ron oscuro, hierba buena, zumo de limón y soda' },
      { name: 'Mojito de Corozo', price: '$28.000', desc: 'Ron oscuro, hierba buena, zumo de limón corozo y soda' },
      { name: 'Piña Colada', price: '$30.000', desc: 'Ron oscuro, piña, crema de coco y leche condensada' },
      { name: 'Coronita Endiablada', price: '$18.000', desc: 'Coronita, zumo de limón, zumo de naranja y granadilla' },
      { name: 'Lulada', price: '$25.000', desc: 'Bebida a base de lulo y soda' },
      { name: 'Margarita Tradicional', price: '$22.000', desc: 'Tequila, triple-sec y jugo de limón' },
      { name: 'Margarita Blue', price: '$25.000', desc: 'Tequila, jugo de limón y curaçao' },
      { name: 'Cuba Libre', price: '$24.000', desc: 'Ron, coca-cola y limón' },
      { name: 'Daikiri', price: '$26.000', desc: 'Ron, fresa y limón' },
      { name: 'Caipirinha', price: '$28.000', desc: 'Limón, ron y jengibre' },
      { name: 'Mojito de Maracuyá', price: '$28.000', desc: 'Ron, limón, menta, soda y pulpa de maracuyá' },
      { name: 'Tequila Sunrise', price: '$28.000', desc: 'Tequila, jugo de naranja y granadilla' },
      { name: 'Gin Tonic', price: '$30.000', desc: 'Ginebra, agua tónica y jugo de limón' },
      { name: 'Long Island', price: '$30.000', desc: 'Vodka, gin, tequila, triple-sec, sirup, coca-cola y limón' },
      { name: 'Destornillador', price: '$28.000', desc: 'Vodka y jugo de naranja' },
    ]
  },
  'licores': {
    icon: ICONS.wine,
    title: 'Licores',
    desc: 'Selección premium',
    licores: [
      { name: 'Ron Viejo de Caldas 750 ml', price: '$99.900' },
      { name: 'Ron Medellín Añejo 8 años 375 ml', price: '$85.000' },
      { name: 'Ron Medellín Añejo 8 años 750 ml', price: '$139.000' },
      { name: 'Ron Medellín Añejo 12 años 375 ml', price: '$199.900' },
      { name: 'Aguardiente Amarillo 750 ml', price: '$80.000' },
      { name: 'Aguardiente Antioqueño 375 ml', price: '$51.000' },
      { name: 'Aguardiente Real 700 ml', price: '$89.900' },
      { name: 'Aguardiente GRD 750 ml', price: '$89.900' },
      { name: "Buchanan's Master 750 ml", price: '$402.000' },
      { name: "Buchanan's Deluxe 750 ml", price: '$294.000' },
      { name: 'Johnnie Walker 700 ml', price: '$139.900' },
      { name: 'Ginebra Heinkes 750 ml', price: '$111.000' },
      { name: 'Ginebra Gordon 700 ml', price: '$149.000' },
      { name: 'Ginebra Tanqueray 750 ml', price: '$299.900' },
      { name: 'Vodka Smirnoff Lulo 750 ml', price: '$89.990' },
      { name: 'Tequila José Cuervo 750 Reposado', price: '$175.000' },
      { name: 'Tequila José Cuervo 750 Blanco', price: '$175.000' },
      { name: 'Tequila Don Julio 700 ml', price: '$459.000' },
      { name: 'Tequila Don Julio Cristal 70 años', price: '$520.000' },
      { name: 'Baileys 1 lt.', price: '$165.000' },
      { name: 'Vino Tinto Plaza Castillo 750 ml', price: '$45.000' },
      { name: 'Vino Viejo Viñedo Blanco 750 ml', price: '$45.000' },
    ]
  }
};

// ---- Render Functions ----

function renderItems(items, note) {
  let html = '';
  if (note) {
    html += `<div class="note-card"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14" style="vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> ${note}</div>`;
  }
  html += '<div class="product-grid">';
  for (const item of items) {
    html += `
      <div class="product-card">
        <div class="product-img">${PRODUCT_ICON}</div>
        <div class="product-body">
          <div class="product-name">${item.name}</div>
        </div>
        <div class="product-footer">
          <div class="product-price">${item.price}</div>
        </div>
      </div>`;
  }
  html += '</div>';
  return html;
}

function renderSection(key) {
  const data = menuData[key];
  if (!data) return '';

  let html = `
    <div class="category-banner">
      <div class="category-banner-icon">${data.icon}</div>
      <div class="category-banner-text">
        <div class="category-banner-title">${data.title}</div>
        <div class="category-banner-desc">${data.desc}</div>
      </div>
    </div>`;

  if (data.subcategories) {
    for (const sub of data.subcategories) {
      html += `<div class="subcategory-title">${sub.name}</div>`;
      html += renderItems(sub.items, null);
    }
  } else if (data.items) {
    html += renderItems(data.items, data.note);
  } else if (data.pizzas) {
    html += '<div class="product-grid">';
    for (const pizza of data.pizzas) {
      html += `
        <div class="product-card">
          <div class="product-img">${ICONS.pizza}</div>
          <div class="product-body">
            <div class="product-name">${pizza.name}</div>
          </div>
          <div class="product-footer">
            <div class="pizza-sizes">
              <div>Pizzeta: <span>${pizza.pizzeta}</span></div>
              <div>Mediana: <span>${pizza.mediana}</span></div>
              <div>Grande: <span>${pizza.grande}</span></div>
            </div>
          </div>
        </div>`;
    }
    html += '</div>';
  } else if (data.cocteles) {
    html += '<div class="cocteles-grid">';
    for (const c of data.cocteles) {
      html += `
        <div class="coctel-card">
          <div class="coctel-header">
            <div class="coctel-name">${c.name}</div>
            <div class="coctel-price">${c.price}</div>
          </div>
          <div class="coctel-desc">${c.desc}</div>
        </div>`;
    }
    html += '</div>';
  } else if (data.licores) {
    html += '<div class="licores-card"><div class="licores-list">';
    for (const l of data.licores) {
      html += `
        <div class="licor-item">
          <div class="licor-name">${l.name}</div>
          <div class="licor-price">${l.price}</div>
        </div>`;
    }
    html += '</div></div>';
  }

  return html;
}

// ---- Tabs ----

function initTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById('panel-' + target);
      if (panel) {
        if (!panel.dataset.rendered) {
          panel.innerHTML = renderSection(target);
          panel.dataset.rendered = '1';
        }
        panel.classList.add('active');
      }

      // Scroll tab into view
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Render first tab
  if (tabs.length > 0) tabs[0].click();
}

// ---- Search ----

function initSearch() {
  const input = document.getElementById('menu-search');
  if (!input) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    if (!query) {
      // Restore current tab view
      const activeTab = document.querySelector('.menu-tab.active');
      if (activeTab) activeTab.click();
      return;
    }

    // Search across all data
    const results = [];
    for (const [key, section] of Object.entries(menuData)) {
      const itemsList = [];
      if (section.items) itemsList.push(...section.items);
      if (section.subcategories) section.subcategories.forEach(s => itemsList.push(...s.items));
      if (section.pizzas) section.pizzas.forEach(p => itemsList.push({ name: p.name, price: `Pizzeta ${p.pizzeta}` }));
      if (section.cocteles) section.cocteles.forEach(c => itemsList.push({ name: c.name, price: c.price }));
      if (section.licores) section.licores.forEach(l => itemsList.push({ name: l.name, price: l.price }));

      for (const item of itemsList) {
        if (item.name.toLowerCase().includes(query)) {
          results.push({ ...item, category: section.title });
        }
      }
    }

    // Display results in active panel
    const activePanel = document.querySelector('.menu-panel.active');
    if (!activePanel) return;

    if (results.length === 0) {
      activePanel.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
          <p>No se encontraron platos con "<strong>${query}</strong>"</p>
        </div>`;
    } else {
      let html = `<div class="category-banner" style="margin-top:24px">
        <div class="category-banner-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
        <div class="category-banner-text">
          <div class="category-banner-title">Resultados</div>
          <div class="category-banner-desc">${results.length} plato(s) encontrado(s)</div>
        </div>
      </div>`;
      html += '<div class="product-grid">';
      for (const item of results) {
        html += `
          <div class="product-card">
            <div class="product-img">${PRODUCT_ICON}</div>
            <div class="product-body">
              <div class="product-name">${item.name}</div>
              <div class="product-desc">${item.category}</div>
            </div>
            <div class="product-footer">
              <div class="product-price">${item.price}</div>
            </div>
          </div>`;
      }
      html += '</div>';
      activePanel.innerHTML = html;
      activePanel.dataset.rendered = '';
    }
  });
}

// ---- WhatsApp nav button ----
function initWhatsApp() {
  const btn = document.getElementById('nav-whatsapp');
  if (btn) {
    btn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20información%20sobre%20La%20Jaiba%20Gastrobar.`;
  }
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initSearch();
  initWhatsApp();
});
