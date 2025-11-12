//1. Seleccionar elementos del DOM
const form = document.getElementById('formTarea');
const input = document.getElementById('inputTarea');
const inputFecha = document.getElementById('inputFecha');
const inputFiltro = document.getElementById('inputFiltro');
const listaTareas = document.getElementById('listaTareas');
const modal = document.getElementById('modalConfirmacion');
const btnConfirmar = document.getElementById('btnConfirmar');
const btnCancelar = document.getElementById('btnCancelar');
const errorTarea = document.getElementById('errorTarea');
const errorFecha = document.getElementById('errorFecha');


//2. variables
let tareas = [];
let contadorId = 1;
let tareaAEliminar = null;


//3. funciones de localstorage
// Guardar tareas en LocalStorage
const guardarEnLocalStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    localStorage.setItem('contadorId', contadorId.toString());
};

// Cargar tareas desde LocalStorage
const cargarTareas = () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    const idGuardado = localStorage.getItem('contadorId');
    
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        mostrarTareas();
    }
    
    if (idGuardado) {
        contadorId = parseInt(idGuardado);
    }
};

//4. Funciones de manipulacion de tareas
// Agregar una nueva tarea
const agregarTarea = (texto, fecha) => {
    const tarea = {
        id: contadorId++,
        texto: texto,
        fecha: fecha
    };
    
    tareas.push(tarea);
    guardarEnLocalStorage();
    mostrarTareas();
    
    // Evento al agregar tarea (Google Analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'agregar_tarea', {
            'event_category': 'tareas',
            'event_label': 'Nueva tarea agregada'
        });
    }
};

// Mostrar modal de confirmación
const mostrarModalEliminar = (id) => {
    tareaAEliminar = id;
    modal.style.display = 'block';
};

// Cerrar modal
const cerrarModal = () => {
    modal.style.display = 'none';
    tareaAEliminar = null;
};

// Eliminar una tarea por ID
const eliminarTarea = () => {
    if (tareaAEliminar !== null) {
        tareas = tareas.filter(tarea => tarea.id !== tareaAEliminar);
        guardarEnLocalStorage();
        mostrarTareas();
        cerrarModal();
        
        // Evento al eliminar tarea (Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'eliminar_tarea', {
                'event_category': 'tareas',
                'event_label': 'Tarea eliminada'
            });
        }
    }
};

// Filtrar tareas según texto de búsqueda
const filtrarTareas = (textoBusqueda) => {
    const textoMinuscula = textoBusqueda.toLowerCase().trim();
    
    if (textoMinuscula === '') {
        return tareas;
    }
    
    return tareas.filter(tarea => 
        tarea.texto.toLowerCase().includes(textoMinuscula)
    );
};

// Validar formulario
const validarFormulario = () => {
    let esValido = true;
    
    // Validar tarea
    if (input.value.trim() === '') {
        input.classList.add('error');
        errorTarea.classList.add('mostrar');
        esValido = false;
    } else {
        input.classList.remove('error');
        errorTarea.classList.remove('mostrar');
    }
    
    // Validar fecha
    if (inputFecha.value === '') {
        inputFecha.classList.add('error');
        errorFecha.classList.add('mostrar');
        esValido = false;
    } else {
        inputFecha.classList.remove('error');
        errorFecha.classList.remove('mostrar');
    }
    
    return esValido;
};

// Formatear fecha
const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};

//5. Funciones de renderizado
// Mostrar todas las tareas en la tabla
const mostrarTareas = (tareasFiltradas = tareas) => {
    listaTareas.innerHTML = '';
    
    tareasFiltradas.forEach(tarea => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.texto}</td>
            <td>${tarea.fecha}</td>
            <td>
                <button class="btn-eliminar" onclick="mostrarModalEliminar(${tarea.id})">
                    Eliminar
                </button>
            </td>
        `;
        
        listaTareas.appendChild(fila);
    });
};

//6. Eventos
// Evento al enviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
        const textoTarea = input.value.trim();
        const fechaFormateada = formatearFecha(inputFecha.value);
        
        agregarTarea(textoTarea, fechaFormateada);
        input.value = '';
        inputFecha.value = '';
        input.focus();
    }
});

// Evento al escribir en el filtro
inputFiltro.addEventListener('input', (e) => {
    const tareasFiltradas = filtrarTareas(e.target.value);
    mostrarTareas(tareasFiltradas);
    
    // Evento al buscar (Google Analytics)
    if (e.target.value.trim() !== '' && typeof gtag !== 'undefined') {
        gtag('event', 'buscar_tarea', {
            'event_category': 'tareas',
            'event_label': 'Búsqueda realizada'
        });
    }
});

// Evento confirmar eliminación
btnConfirmar.addEventListener('click', eliminarTarea);

// Evento cancelar eliminación
btnCancelar.addEventListener('click', cerrarModal);

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// Remover clase de error al escribir
input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
        input.classList.remove('error');
        errorTarea.classList.remove('mostrar');
    }
});

inputFecha.addEventListener('change', () => {
    if (inputFecha.value !== '') {
        inputFecha.classList.remove('error');
        errorFecha.classList.remove('mostrar');
    }
});

//7. Inicialización
cargarTareas();
