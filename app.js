// Base de datos local de reservas del complejo Les Courts
let reservasComplejo = JSON.parse(localStorage.getItem('lescourts_reservas')) || [
    { fecha: '2026-10-20', cancha: 'Fútbol 7', horario: '21:00 hs', cliente: 'Carlos T.', telefono: '3514112233' },
    { fecha: '2026-10-20', cancha: 'Pádel', horario: '19:30 hs', cliente: 'Agustín P.', telefono: '3519988776' }
];

// Horarios fijos que maneja el complejo por día
const horariosDisponibles = ['17:00 hs', '18:30 hs', '20:00 hs', '21:30 hs', '23:00 hs'];

document.addEventListener('DOMContentLoaded', () => {
    // Settear la fecha de hoy por defecto en el input date
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fechaReserva').value = hoy;
    actualizarCalendario();
});

function saveStorage() {
    localStorage.setItem('lescourts_reservas', JSON.stringify(reservasComplejo));
}

// Función principal para renderizar la grilla de turnos según la fecha y cancha seleccionada
function actualizarCalendario() {
    const fechaSeleccionada = document.getElementById('fechaReserva').value;
    const canchaFiltro = document.getElementById('filtroCanchaCalendario').value;
    const grilla = document.getElementById('grillaTurnos');
    
    grilla.innerHTML = '';

    // Definimos qué canchas mostrar en la grilla
    const canchasAExaminar = canchaFiltro === 'todas' ? ['Fútbol 7', 'Pádel'] : [canchaFiltro];

    canchasAExaminar.forEach(cancha => {
        horariosDisponibles.forEach(horario => {
            // Buscamos si ya existe una reserva para esta fecha, cancha y horario
            const reservaExistente = reservasComplejo.find(r => r.fecha === fechaSeleccionada && r.cancha === cancha && r.horario === horario);

            const card = document.createElement('div');
            card.className = "p-3.5 rounded-xl border flex justify-between items-center text-xs";

            if (reservaExistente) {
                // Turno Ocupado
                card.className += " bg-rose-500/5 border-rose-500/20 text-rose-300";
                card.innerHTML = `
                    <div>
                        <strong class="text-white">${cancha}</strong> - ${horario}<br>
                        <span class="text-slate-400">Ocupado por: ${reservaExistente.cliente}</span>
                    </div>
                    <span class="bg-rose-500/10 text-rose-400 px-2.5 py-1 rounded-md font-semibold">Ocupado</span>
                `;
            } else {
                // Turno Libre
                card.className += " bg-emerald-500/5 border-emerald-500/20 text-slate-300 hover:bg-emerald-500/10 transition-colors";
                card.innerHTML = `
                    <div>
                        <strong class="text-white">${cancha}</strong> - ${horario}<br>
                        <span class="text-emerald-400 font-medium">Disponible</span>
                    </div>
                    <button type="button" onclick="seleccionarTurnoLibre('${cancha}', '${horario}')" class="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer">
                        Reservar
                    </button>
                `;
            }
            grilla.appendChild(card);
        });
    });

    // Limpiar selección previa al cambiar fecha/filtro
    resetearFormularioReserva();
}

function seleccionarCanchaServicio(cancha) {
    document.getElementById('filtroCanchaCalendario').value = cancha;
    actualizarCalendario();
    window.location.href = '#reservas';
}

function seleccionarTurnoLibre(cancha, horario) {
    const fecha = document.getElementById('fechaReserva').value;
    document.getElementById('horarioSeleccionado').value = `${fecha}|${cancha}|${horario}`;
    
    const btn = document.getElementById('btnConfirmar');
    btn.disabled = false;
    btn.className = "w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-sm shadow-lg shadow-emerald-600/20";
    btn.textContent = `Confirmar Turno (${cancha} - ${horario} del ${fecha})`;

    document.getElementById('turnoElegidoTexto').textContent = `Turno seleccionado: Cancha ${cancha} a las ${horario}.`;
}

function resetearFormularioReserva() {
    document.getElementById('horarioSeleccionado').value = '';
    const btn = document.getElementById('btnConfirmar');
    btn.disabled = true;
    btn.className = "w-full bg-slate-800 text-slate-500 font-bold py-3 rounded-xl transition-all cursor-not-allowed text-sm";
    btn.textContent = "Seleccioná un horario libre arriba";
    document.getElementById('turnoElegidoTexto').textContent = "Ningún turno seleccionado.";
}

function confirmarReserva(event) {
    event.preventDefault();
    const datos = document.getElementById('horarioSeleccionado').value;
    if (!datos) return;

    const [fecha, cancha, horario] = datos.split('|');
    const cliente = document.getElementById('nombreCliente').value.trim();
    const telefono = document.getElementById('telefonoCliente').value.trim();

    // Validar por seguridad que no esté ocupado
    const ocupado = reservasComplejo.some(r => r.fecha === fecha && r.cancha === cancha && r.horario === horario);
    if (ocupado) {
        alert('Lo sentimos, este turno acaba de ser reservado por otro usuario.');
        actualizarCalendario();
        return;
    }

    reservasComplejo.push({ fecha, cancha, horario, cliente, telefono });
    saveStorage();
    actualizarCalendario();

    document.getElementById('formReservarTurno').reset();
    resetearFormularioReserva();

    alert(`¡Reserva confirmada con éxito!\n\nComplejo: Les Courts\nCancha: ${cancha}\nFecha: ${fecha}\nHorario: ${horario}`);
}