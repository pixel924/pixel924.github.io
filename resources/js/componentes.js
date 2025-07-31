// Array de ejemplo de noticias (puedes cargarlo dinámicamente en el futuro)
export const noticiasEjemplo = [
    {
        id: 1,
        titulo: "Noticia 1 (EJEMPLO)",
        categoria: "Salud",
        fecha: "2025-06-15",
        img: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=600&q=80",
        resumen: "La comunidad de Gran Mallama celebra la apertura de nuevas instalaciones médicas que beneficiarán a más de 2,000 familias..."
    },
    {
        id: 2,
        titulo: "Noticia 2 (EJEMPLO)",
        categoria: "Educación",
        fecha: "2025-06-10",
        img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=600&q=80",
        resumen: "Iniciativa para capacitar a jóvenes y adultos en el uso de tecnologías digitales, fortaleciendo las competencias de nuestra comunidad..."
    },
    {
        id: 3,
        titulo: "Noticia 3 (EJEMPLO)",
        categoria: "Desarrollo",
        fecha: "2025-06-08",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",
        resumen: "Implementación de técnicas agrícolas ecológicas..."
    }
];

// Renderiza un bloque de noticias en el contenedor indicado
export function renderUltimasNoticias(containerId, noticias, max = 2) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    noticias.slice(0, max).forEach(noticia => {
        container.innerHTML += `
            <div class="news-card">
                <img src="${noticia.img}" alt="${noticia.titulo}" class="news-img">
                <div class="news-title">${noticia.titulo}</div>
                <div class="news-category">${noticia.categoria}</div>
                <div class="news-date">${noticia.fecha}</div>
                <p class="news-summary">${noticia.resumen}</p>
                <button class="news-btn" data-id="${noticia.id}">Leer Más</button>
            </div>
        `;
    });
}

export function renderNoticias(containerId, noticias) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    noticias.forEach((noticia, idx) => {
        container.innerHTML += `
            <div class="news-card" data-id="${noticia.id}">
                <img src="${noticia.img}" alt="${noticia.titulo}" class="news-img">
                <div class="news-title">${noticia.titulo}</div>
                <div class="news-category">${noticia.categoria}</div>
                <div class="news-date">${formateaFecha(noticia.fecha)}</div>
                <p class="news-summary">${noticia.resumen}</p>
                <button class="news-btn" data-id="${noticia.id}">Leer Más</button>
            </div>
        `;
    });
}

export const eventosEjemplo = [
    {
        id: 1,
        titulo: "Lunada de Verano",
        tipo: "Cultural",
        vereda: "Centro",
        fecha: "2025-08-01",
        hora: "2:00 PM",
        lugar: "Salón Cultural",
        organizador: "Kevin Pizanda - Jrking Music",
        resumen: "Preparate para recibir el verano con toda la energia en una jornada cultural, deportiva y musical. Entrada a cinco mil pesos.",
        actividades: [
            "Artistas y grupos locales.",
            "Torneos de ping pong.",
            "Torneos de ajedrez",
            "Torneos de boxeo.",
            "Presentacion de DJ's",
        ],
        img: "resources/images/lunada-portada.jpg"
    },
    {
        id: 2,
        titulo: "Evento 2 (EJEMPLO)",
        tipo: "Cultural",
        vereda: "Centro",
        fecha: "2025-09-21",
        hora: "9:00 AM - 4:00 PM",
        lugar: "Plaza Principal",
        organizador: "Junta Comunal",
        resumen: "Feria con exposición y venta de artesanías, comida típica y presentaciones culturales.",
        actividades: [
            "Exposición de artesanías",
            "Venta de productos locales",
            "Presentaciones culturales",
            "Degustación de comida típica"
        ],
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        titulo: "Evento 3 (EJEMPLO)",
        tipo: "Educativo",
        vereda: "Norte",
        fecha: "2025-10-05",
        hora: "8:00 AM - 12:00 PM",
        lugar: "Casa Comunal Norte",
        organizador: "Asociación de Agricultores",
        resumen: "Aprende técnicas de agricultura sostenible con expertos locales.",
        actividades: [
            "Charlas técnicas",
            "Demostraciones prácticas"
        ],
        img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    }
    // ...agrega más eventos...
];

export function renderEventos(containerId, eventos) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    eventos.forEach(evento => {
        container.innerHTML += `
            <div class="news-card event-card" data-id="${evento.id}">
                <img src="${evento.img}" alt="${evento.titulo}" class="news-img event-img">
                <div class="news-title event-title">${evento.titulo}</div>
                <div class="news-category event-type">${evento.tipo}</div>
                <div class="news-category event-vereda">${evento.vereda}</div>
                <div class="news-date event-date">${formateaFecha(evento.fecha)}</div>
                <p class="news-summary event-summary">${evento.resumen}</p>
                <button class="news-btn event-btn" data-id="${evento.id}">Ver Detalle</button>
            </div>
        `;
    });
}

export const galeriaEjemplo = [
    {
        id: 1,
        titulo: "Festival Cultural",
        categoria: "eventos",
        año: "2025",
        evento: "festival",
        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        descripcion: "Celebración anual con música y danzas típicas."
    },
    {
        id: 2,
        titulo: "Paisaje Andino",
        categoria: "paisajes",
        año: "2024",
        evento: "",
        img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
        descripcion: "Vista panorámica de las montañas de Mallama."
    }
    // ...más imágenes...
];

export function renderGaleria(containerId, imagenes) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    imagenes.forEach(img => {
        container.innerHTML += `
            <div class="gallery-card" data-id="${img.id}">
                <img src="${img.img}" alt="${img.titulo}" class="gallery-img">
                <div class="gallery-title">${img.titulo}</div>
                <div class="gallery-category">${img.categoria}</div>
                <div class="gallery-year">${img.año}</div>
                <button class="gallery-btn" data-id="${img.id}">Ver Imagen</button>
            </div>
        `;
    });
}

function formateaFecha(fecha) {
    const meses = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
    const [a, m, d] = fecha.split("-");
    return `${parseInt(d)} de ${meses[parseInt(m)-1]}, ${a}`;
}

export function renderProximosEventos(containerId, eventos, max = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    eventos
        .sort((a, b) => a.fecha.localeCompare(b.fecha))
        .slice(0, max)
        .forEach(evento => {
            const [a, m, d] = evento.fecha.split('-');
            container.innerHTML += `
                <div class="event-item">
                    <div class="event-date-box">
                        ${parseInt(d)}<br><span>${["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"][parseInt(m)-1]}</span>
                    </div>
                    <div class="event-info">${evento.titulo}</div>
                </div>
            `;
        });
}
