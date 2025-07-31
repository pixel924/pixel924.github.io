document.addEventListener('DOMContentLoaded', function () {
    const main = document.getElementById('contenido-principal');

    const rutas = {
        // Cada ruta define su HTML y su script (módulo) asociado.
        '/inicio': { html: 'resources/html/inicio.html', js: './inicio.js' },
        '/noticias': { html: 'resources/html/noticias.html', js: './noticias.js' },
        '/eventos': { html: 'resources/html/eventos.html', js: './eventos.js' },
        '/galeria': { html: 'resources/html/galeria.html', js: './galeria.js' },
        '/contacto': { html: 'resources/html/contacto.html', js: './contacto.js' }
    };

    function activarMenu(ruta) {
        document.querySelectorAll('#menu-principal .nav-link').forEach(link => {
            if (link.getAttribute('href') === `#${ruta}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function actualizarTitulo(ruta) {
        const titulos = {
            '/inicio': 'Mi Terre - Inicio',
            '/noticias': 'Mi Terre - Noticias',
            '/eventos': 'Mi Terre - Eventos',
            '/galeria': 'Mi Terre - Galería',
            '/contacto': 'Mi Terre - Contacto'
        };
        document.title = titulos[ruta] || 'Mi Terre';
    }

    async function cargarFragmento(ruta) {
        const pageConfig = rutas[ruta];
        if (!pageConfig) {
            main.innerHTML = `
                <div class="container py-5 text-center">
                    <h2>Error 404</h2>
                    <p>La página solicitada no existe.</p>
                    <a href="#/inicio" class="btn btn-primary mt-3">Volver al inicio</a>
                </div>`;
            activarMenu('/inicio');
            actualizarTitulo('/inicio');
            return;
        }
        main.innerHTML = `<div class="text-center py-5"><div class="spinner-border" role="status"></div></div>`;

        try {
            const resp = await fetch(pageConfig.html);
            if (!resp.ok) throw new Error('No se pudo cargar el contenido');
            const html = await resp.text();
            main.innerHTML = html;
            activarMenu(ruta);
            actualizarTitulo(ruta);

            // Carga dinámica del módulo JS si está definido para la ruta
            if (pageConfig.js) {
                const module = await import(pageConfig.js);
                if (module.default && typeof module.default === 'function') {
                    module.default(); // Ejecuta la función 'init' exportada por defecto
                }
            }
        } catch (err) {
            console.error("Error al cargar la página:", err);
            main.innerHTML = `
                <div class="container py-5 text-center">
                    <h2>Error</h2>
                    <p>No se pudo cargar el contenido.</p>
                    <a href="#/inicio" class="btn btn-primary mt-3">Volver al inicio</a>
                </div>`;
            activarMenu('/inicio');
            actualizarTitulo('/inicio');
        }
    }

    function getRutaActual() {
        let hash = window.location.hash.replace(/^#/, '');
        if (!hash) return '/inicio';
        if (!hash.startsWith('/')) hash = '/' + hash;
        return hash;
    }

    // --- INICIALIZACIÓN DE LA APP ---
    const rutaInicial = getRutaActual();
    cargarFragmento(rutaInicial);

    window.addEventListener('popstate', function (e) {
        const ruta = e.state?.ruta || getRutaActual();
        cargarFragmento(ruta);
    });

    document.body.addEventListener('click', function (e) {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href')?.startsWith('#/')) {
            e.preventDefault();
            let href = link.getAttribute('href').replace(/^#/, '');
            if (!href.startsWith('/')) href = '/' + href;
            cargarFragmento(href);
            window.history.pushState({ruta: href}, '', '#' + href);
        }
    });

    
});
