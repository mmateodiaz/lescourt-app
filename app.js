// Base de datos local en memoria y LocalStorage
let alumnos = JSON.parse(localStorage.getItem('futbol_alumnos')) || [
    { id: 1, nombre: 'Lucas Gómez', categoria: 'Sub-15', telefono: '3515442211', estado: 'pagado' },
    { id: 2, nombre: 'Mateo Fernández', categoria: 'Sub-17', telefono: '3516778899', estado: 'debe' },
    { id: 3, nombre: 'Joaquín Benítez', categoria: 'Sub-15', telefono: '3519881122', estado: 'pagado' },
    { id: 4, nombre: 'Thiago Silva', categoria: 'Sub-13', telefono: '3513334455', estado: 'debe' }
];

let currentMpId = null;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderAlumnos();
});

// Guardar en LocalStorage
function saveToStorage() {
    localStorage.setItem('futbol_alumnos', JSON.stringify(alumnos));
}

// Renderizar tabla y estadísticas
function renderAlumnos(filteredList = null) {
    const listToRender = filteredList || alumnos;
    const tbody = document.getElementById('alumnosTableBody');
    const emptyState = document.getElementById('emptyState');
    
    tbody.innerHTML = '';

    if (listToRender.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        listToRender.forEach(alumno => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-800/40 transition-colors';
            
            const badgeClass = alumno.estado === 'pagado' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
            
            const badgeText = alumno.estado === 'pagado' ? 'Al Día' : 'Debe Cuota';
            
            tr.innerHTML = `
                <td class="p-4 font-medium text-white">${alumno.nombre}</td>
                <td class="p-4 text-slate-300"><span class="bg-slate-800 px-2.5 py-1 rounded-md text-xs font-mono">${alumno.categoria}</span></td>
                <td class="p-4 text-slate-300"><i class="fa-brands fa-whatsapp text-emerald-500 mr-1.5"></i>${alumno.telefono}</td>
                <td class="p-4">
                    <span class="px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}">
                        ${badgeText}
                    </span>
                </td>
                <td class="p-4 text-center">
                    <button onclick="openMpModal(${alumno.id})" class="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 px-3 py-1.5 rounded-xl text-xs font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer">
                        <i class="fa-solid fa-credit-card"></i> Pagar (MP)
                    </button>
                </td>
                <td class="p-4 text-right space-x-2">
                    <button onclick="editAlumno(${alumno.id})" class="text-slate-400 hover:text-sky-400 transition-colors p-1 cursor-pointer" title="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onclick="deleteAlumno(${alumno.id})" class="text-slate-400 hover:text-rose-400 transition-colors p-1 cursor-pointer" title="Eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    updateStats();
}

// Actualizar estadísticas del Dashboard
function updateStats() {
    const total = alumnos.length;
    const pagados = alumnos.filter(a => a.estado === 'pagado').length;
    const deudores = total - pagados;
    const valorCuota = 15000; // Valor base de la cuota
    const recaudacion = pagados * valorCuota;

    document.getElementById('statTotal').innerText = total;
    document.getElementById('statPagados').innerText = pagados;
    document.getElementById('statDeudores').innerText = deudores;
    document.getElementById('statRecaudacion').innerText = `$${recaudacion.toLocaleString()}`;
}

// Manejo del Modal de Alumno
function openModal(id = null) {
    const modal = document.getElementById('alumnoModal');
    const title = document.getElementById('modalTitle');
    document.getElementById('alumnoForm').reset();
    document.getElementById('alumnoId').value = '';

    if (id) {
        title.innerText = 'Editar Alumno';
        const alumno = alumnos.find(a => a.id === id);
        if (alumno) {
            document.getElementById('alumnoId').value = alumno.id;
            document.getElementById('nombre').value = alumno.nombre;
            document.getElementById('categoria').value = alumno.categoria;
            document.getElementById('telefono').value = alumno.telefono;
            document.getElementById('estado').value = alumno.estado;
        }
    } else {
        title.innerText = 'Registrar Nuevo Alumno';
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('alumnoModal').classList.add('hidden');
}

// Guardar o Actualizar Alumno
function saveAlumno(event) {
    event.preventDefault();
    const id = document.getElementById('alumnoId').value;
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const telefono = document.getElementById('telefono').value;
    const estado = document.getElementById('estado').value;

    if (id) {
        // Editar
        const index = alumnos.findIndex(a => a.id == id);
        if (index !== -1) {
            alumnos[index] = { id: Number(id), nombre, categoria, telefono, estado };
        }
    } else {
        // Crear nuevo
        const newAlumno = {
            id: Date.now(),
            nombre,
            categoria,
            telefono,
            estado
        };
        alumnos.push(newAlumno);
    }

    saveToStorage();
    renderAlumnos();
    closeModal();
}

// Eliminar Alumno
function deleteAlumno(id) {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
        alumnos = alumnos.filter(a => a.id !== id);
        saveToStorage();
        renderAlumnos();
    }
}

// Editar shortcut
function editAlumno(id) {
    openModal(id);
}

// Filtros y Búsqueda
function filterAlumnos() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const estadoFiltro = document.getElementById('filterEstado').value;

    const filtered = alumnos.filter(alumno => {
        const matchesQuery = alumno.nombre.toLowerCase().includes(query) || alumno.categoria.toLowerCase().includes(query);
        const matchesEstado = estadoFiltro === 'todos' || alumno.estado === estadoFiltro;
        return matchesQuery && matchesEstado;
    });

    renderAlumnos(filtered);
}

// Simulador Mercado Pago
function openMpModal(id) {
    currentMpId = id;
    const alumno = alumnos.find(a => a.id === id);
    if (alumno) {
        document.getElementById('mpAlumnoName').innerText = alumno.nombre;
        document.getElementById('mpModal').classList.remove('hidden');
    }
}

function closeMpModal() {
    document.getElementById('mpModal').classList.add('hidden');
    currentMpId = null;
}

function simularPagoExitoso() {
    if (currentMpId) {
        const alumno = alumnos.find(a => a.id === currentMpId);
        if (alumno) {
            alumno.estado = 'pagado';
            saveToStorage();
            renderAlumnos();
            alert(`¡Pago acreditado con éxito para ${alumno.nombre} vía Mercado Pago! Cuota al día.`);
        }
    }
    closeMpModal();
}