import { renderEventos, eventosEjemplo, renderProximosEventos } from './componentes.js';

let eventosActuales = [...eventosEjemplo];

function filterEventos() {
    const tipo = document.getElementById('eventTypeFilter')?.value;
    const vereda = document.getElementById('veredaFilter')?.value;
    const busqueda = document.getElementById('searchEvents')?.value.toLowerCase();

    eventosActuales = eventosEjemplo.filter(evento => {
        let match = true;
        if (tipo && evento.tipo.toLowerCase() !== tipo.toLowerCase()) match = false;
        if (vereda && evento.vereda.toLowerCase() !== vereda.toLowerCase()) match = false;
        if (busqueda && !evento.titulo.toLowerCase().includes(busqueda) && !evento.resumen.toLowerCase().includes(busqueda)) match = false;
        return match;
    });

    renderEventos('eventosContainer', eventosActuales);
}

function showEventDetail(id) {
    const evento = eventosEjemplo.find(e => e.id == id);
    if (!evento) return;
    document.getElementById('eventDetailLabel').textContent = evento.titulo;
    document.getElementById('eventTitle').textContent = evento.titulo;
    document.getElementById('eventDate').textContent = formateaFecha(evento.fecha);
    document.getElementById('eventTime').textContent = evento.hora;
    document.getElementById('eventPlace').textContent = evento.lugar;
    document.getElementById('eventOrganizer').textContent = evento.organizador;
    document.getElementById('eventDescription').textContent = evento.resumen;
    const ul = document.getElementById('eventActivities');
    ul.innerHTML = '';
    evento.actividades.forEach(act => {
        ul.innerHTML += `<li>${act}</li>`;
    });
    const modal = new bootstrap.Modal(document.getElementById('eventDetailModal'));
    modal.show();
}

function formateaFecha(fecha) {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const [a, m, d] = fecha.split("-");
    return `${parseInt(d)} de ${meses[parseInt(m) - 1]}, ${a}`;
}

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month = currentMonth, year = currentYear) {
    const calendarBody = document.getElementById('calendarBody');
    if (!calendarBody) return;

    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay(); // 0=Domingo
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Obtén los días con eventos para este mes/año
    const eventosDelMes = eventosEjemplo.filter(ev => {
        const [evYear, evMonth, evDay] = ev.fecha.split('-').map(Number);
        return evYear === year && evMonth === (month + 1);
    });

    let date = 1;
    for (let i = 0; i < 6; i++) { // máximo 6 filas
        let row = '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                row += '<td></td>';
            } else if (date > daysInMonth) {
                row += '<td></td>';
            } else {
                // ¿Hay evento este día?
                const evento = eventosDelMes.find(ev => Number(ev.fecha.split('-')[2]) === date);
                if (evento) {
                    row += `<td class="bg-info-subtle fw-bold text-primary calendar-event-day" data-event-id="${evento.id}" title="${evento.titulo}" style="text-decoration: underline; cursor: pointer;">${date}</td>`;
                } else {
                    row += `<td>${date}</td>`;
                }
                date++;
            }
        }
        row += '</tr>';
        calendarBody.innerHTML += row;
        if (date > daysInMonth) break;
    }
    // Actualiza el título del mes
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById('currentMonth').textContent = `${meses[month]} ${year}`;
}


export default function init() {
    renderProximosEventos('proximosEventos', eventosEjemplo, 3);
    renderEventos('eventosContainer', eventosEjemplo);
    renderCalendar(currentMonth, currentYear);

    // Asigna los listeners cada vez que se carga la sección
    document.getElementById('eventTypeFilter')?.addEventListener('change', filterEventos);
    document.getElementById('veredaFilter')?.addEventListener('change', filterEventos);
    document.getElementById('searchEvents')?.addEventListener('input', filterEventos);

    document.getElementById('eventosContainer')?.addEventListener('click', function (e) {
        if (e.target.classList.contains('event-btn')) {
            const id = e.target.getAttribute('data-id');
            showEventDetail(id);
        }
    });

    // Navegación de meses
    document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    document.getElementById('calendarBody')?.addEventListener('click', function (e) {
        const td = e.target.closest('.calendar-event-day');
        if (td) {
            const eventId = td.getAttribute('data-event-id');
            showEventDetail(eventId);
        }
    });
}