import { renderUltimasNoticias, noticiasEjemplo, renderProximosEventos, eventosEjemplo } from './componentes.js';
import { showNewsDetail } from './noticias.js';

export default function init() {
    renderUltimasNoticias('ultimasNoticiasInicio', noticiasEjemplo, 2);
    renderProximosEventos('proximosEventosInicio', eventosEjemplo, 3);

    document.getElementById('ultimasNoticiasInicio')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('news-btn')) {
            const id = e.target.getAttribute('data-id');
            showNewsDetail(id);
        }
    });
}