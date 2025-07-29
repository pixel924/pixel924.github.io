/**
 * Lógica específica para la página de Galería.
 * Se ejecuta cada vez que se carga la vista de galería.
 */

import { renderGaleria, galeriaEjemplo } from './componentes.js';

let imagenesActuales = [...galeriaEjemplo];

function filterGaleria() {
    const categoria = document.getElementById('categoryFilter')?.value;
    const año = document.getElementById('yearFilter')?.value;
    const evento = document.getElementById('eventFilter')?.value;
    const busqueda = document.getElementById('searchGallery')?.value.toLowerCase();

    imagenesActuales = galeriaEjemplo.filter(img => {
        let match = true;
        if (categoria && img.categoria.toLowerCase() !== categoria.toLowerCase()) match = false;
        if (año && img.año !== año) match = false;
        if (evento && img.evento.toLowerCase() !== evento.toLowerCase()) match = false;
        if (busqueda && !img.titulo.toLowerCase().includes(busqueda) && !img.descripcion.toLowerCase().includes(busqueda)) match = false;
        return match;
    });

    renderGaleria('galeriaContainer', imagenesActuales);
}

function showImageDetail(id) {
    const img = galeriaEjemplo.find(i => i.id == id);
    if (!img) return;
    document.getElementById('imageModalLabel').textContent = img.titulo;
    document.getElementById('modalImage').src = img.img;
    document.getElementById('imageDescription').textContent = img.descripcion;
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    modal.show();
}

export default function init() {
    renderGaleria('galeriaContainer', galeriaEjemplo);

    document.getElementById('categoryFilter')?.addEventListener('change', filterGaleria);
    document.getElementById('yearFilter')?.addEventListener('change', filterGaleria);
    document.getElementById('eventFilter')?.addEventListener('change', filterGaleria);
    document.getElementById('searchGallery')?.addEventListener('input', filterGaleria);

    document.getElementById('galeriaContainer')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-btn')) {
            const id = e.target.getAttribute('data-id');
            showImageDetail(id);
        }
    });
}