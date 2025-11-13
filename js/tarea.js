// 1. Variables
let tareas = [];
let contadorId = 1;
let tareaAEliminar = null;

// 2. LocalStorage
const guardarTareas = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    localStorage.setItem(`tareas_${usuario.email}`, JSON.stringify(tareas));
    localStorage.setItem(`contadorId_${usuario.email}`, contadorId.toString());
};

const cargarTareas = () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const tareasGuardadas = localStorage.getItem(`tareas_${usuario.email}`);
    const idGuardado = localStorage.getItem(`contadorId_${usuario.email}`);

    if (tareasGuardadas) tareas = JSON.parse(tareasGuardadas);
    if (idGuardado) contadorId = parseInt(idGuardado);
};

// 3. Funciones principales
const agregarTarea = (texto, fecha) => {
    tareas.push({ id: contadorId++, texto, fecha });
    guardarTareas();
    mostrarTareas();
};

const eliminarTarea = () => {
    if (tareaAEliminar) {
        tareas = tareas.filter(t => t.id !== tareaAEliminar);
        guardarTareas();
        mostrarTareas();
        cerrarModal();
    }
};

const filtrarTareas = (texto) => {
    const textoLower = texto.toLowerCase().trim();
    return textoLower ? tareas.filter(t => t.texto.toLowerCase().includes(textoLower)) : tareas;
};

const mostrarTareas = (tareasFiltradas = tareas) => {
    const listaTareas = document.getElementById('listaTareas');
    if (!listaTareas) return;

    listaTareas.innerHTML = tareasFiltradas.map(t => `
        <tr>
            <td>${t.id}</td>
            <td>${t.texto}</td>
            <td>${t.fecha}</td>
            <td>
                <button class="btn-eliminar" onclick="mostrarModalEliminar(${t.id})">
                    Eliminar
                </button>
            </td>
        </tr>
    `).join('');
};

// 4. Modal
const mostrarModalEliminar = (id) => {
    tareaAEliminar = id;
    document.getElementById('modalConfirmacion').style.display = 'block';
};

const cerrarModal = () => {
    document.getElementById('modalConfirmacion').style.display = 'none';
    tareaAEliminar = null;
};

// 5. Validacion
const validarCampo = (elemento, error) => {
    const valido = elemento.value.trim() !== '';
    elemento.classList.toggle('error', !valido);
    error.classList.toggle('mostrar', !valido);
    return valido;
};

const validarFormulario = (input, inputFecha, errorTarea, errorFecha) => {
    const validoTarea = validarCampo(input, errorTarea);
    const validoFecha = validarCampo(inputFecha, errorFecha);
    return validoTarea && validoFecha;
};

const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

// 6. Inicializacion de lista de tareas
if (document.getElementById('listaTareas')) {
    cargarTareas();
    mostrarTareas();

    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const nombreUsuario = document.getElementById('nombreUsuario');
    if (nombreUsuario) nombreUsuario.textContent = usuario.nombre;

    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('usuarioActual');
            window.location.href = '../auth/login.html';
        });
    }

    const inputFiltro = document.getElementById('inputFiltro');
    if (inputFiltro) {
        inputFiltro.addEventListener('input', (e) => {
            mostrarTareas(filtrarTareas(e.target.value));
        });
    }

    const btnConfirmar = document.getElementById('btnConfirmar');
    const btnCancelar = document.getElementById('btnCancelar');
    const modal = document.getElementById('modalConfirmacion');

    if (btnConfirmar) btnConfirmar.addEventListener('click', eliminarTarea);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });
}

// 7. Inicializacion de formulario de tareas
if (document.getElementById('formTarea')) {
    const form = document.getElementById('formTarea');
    const input = document.getElementById('inputTarea');
    const inputFecha = document.getElementById('inputFecha');
    const errorTarea = document.getElementById('errorTarea');
    const errorFecha = document.getElementById('errorFecha');

    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    const nombreUsuario = document.getElementById('nombreUsuario');
    if (nombreUsuario) nombreUsuario.textContent = usuario.nombre;

    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('usuarioActual');
            window.location.href = '../auth/login.html';
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validarFormulario(input, inputFecha, errorTarea, errorFecha)) {
            agregarTarea(input.value.trim(), formatearFecha(inputFecha.value));
            input.value = '';
            inputFecha.value = '';
            input.focus();
            window.location.href = 'tarea-list.html';
        }
    });

    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.classList.remove('error');
            errorTarea.classList.remove('mostrar');
        }
    });

    inputFecha.addEventListener('change', () => {
        if (inputFecha.value) {
            inputFecha.classList.remove('error');
            errorFecha.classList.remove('mostrar');
        }
    });
}
