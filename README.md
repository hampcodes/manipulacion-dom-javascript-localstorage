# Manipulación del DOM y LocalStorage

## Descripción del Proyecto

Demo para explicar los conceptos fundamentales de manipulación del DOM y persistencia de datos con LocalStorage. El proyecto implementa un gestor de tareas con operaciones CRUD completas.

## Características

- Agregar tareas con descripción y fecha
- Filtrar tareas en tiempo real
- Eliminar tareas con confirmación modal
- Persistencia de datos con LocalStorage
- Validación de formularios con mensajes de error

## Estructura del Proyecto
```
proyecto-tareas/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── README.md
```

## Conceptos Clave

### 1. DOM (Document Object Model)

El DOM es la representación del documento HTML como un árbol de objetos que JavaScript puede manipular.

#### Métodos principales de selección:
```javascript
// Seleccionar por ID (más común y rápido)
document.getElementById('miElemento')

// Seleccionar por clase
document.getElementsByClassName('miClase')

// Seleccionar con CSS (más flexible)
document.querySelector('#miId')
document.querySelectorAll('.miClase')
```

#### Manipulación de elementos:
```javascript
// Crear elemento
const elemento = document.createElement('tr');

// Modificar contenido
elemento.innerHTML = '<td>Contenido</td>';
elemento.textContent = 'Solo texto';

// Agregar al DOM
padre.appendChild(elemento);

// Modificar clases CSS
elemento.classList.add('clase');
elemento.classList.remove('clase');
elemento.classList.toggle('clase');

// Modificar estilos
elemento.style.display = 'none';
```

### 2. LocalStorage

Permite almacenar datos en el navegador que persisten incluso después de cerrar la página.

#### Métodos principales:
```javascript
// Guardar datos (solo acepta strings)
localStorage.setItem('clave', 'valor');

// Guardar objetos/arrays (convertir a JSON)
localStorage.setItem('tareas', JSON.stringify(arrayTareas));

// Recuperar datos
const valor = localStorage.getItem('clave');

// Recuperar objetos/arrays (convertir de JSON)
const tareas = JSON.parse(localStorage.getItem('tareas'));

// Eliminar un item
localStorage.removeItem('clave');

// Limpiar todo
localStorage.clear();
```

**Importante**: LocalStorage solo puede almacenar strings, por eso usamos `JSON.stringify()` para convertir objetos a texto y `JSON.parse()` para convertirlos de vuelta.

### 3. Eventos

Los eventos permiten ejecutar código cuando ocurre una acción específica.
```javascript
// Prevenir comportamiento por defecto (importante en formularios)
evento.preventDefault();

// Evento submit en formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // código
});

// Evento input (se dispara al escribir)
input.addEventListener('input', (e) => {
    console.log(e.target.value);
});

// Evento click
boton.addEventListener('click', () => {
    // código
});
```

### 4. Arrow Functions

Sintaxis moderna para escribir funciones en JavaScript.
```javascript
// Función tradicional
function suma(a, b) {
    return a + b;
}

// Arrow function
const suma = (a, b) => {
    return a + b;
};

// Arrow function simplificada (retorno implícito)
const suma = (a, b) => a + b;

// Sin parámetros
const saludar = () => console.log('Hola');

// Un solo parámetro (paréntesis opcionales)
const doble = num => num * 2;
```

### 5. Métodos de Arrays
```javascript
// forEach: recorre cada elemento
tareas.forEach(tarea => {
    console.log(tarea.texto);
});

// filter: crea nuevo array con elementos que cumplen condición
const filtradas = tareas.filter(tarea => tarea.id !== 5);

// find: encuentra el primer elemento que cumple condición
const tarea = tareas.find(t => t.id === 3);

// map: transforma cada elemento y retorna nuevo array
const ids = tareas.map(tarea => tarea.id);

// some: verifica si al menos un elemento cumple condición
const existe = tareas.some(t => t.texto === 'Comprar pan');

// includes: verifica si un string contiene otro
'Hola Mundo'.includes('Mundo'); // true
```

## Funciones Importantes del Proyecto

### Funciones de LocalStorage
```javascript
// Guardar en LocalStorage
const guardarEnLocalStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    localStorage.setItem('contadorId', contadorId.toString());
};

// Cargar desde LocalStorage
const cargarTareas = () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        mostrarTareas();
    }
};
```

### Validación de Formulario
```javascript
const validarFormulario = () => {
    let esValido = true;
    
    if (input.value.trim() === '') {
        input.classList.add('error');
        errorTarea.classList.add('mostrar');
        esValido = false;
    }
    
    return esValido;
};
```

### Filtrado en Tiempo Real
```javascript
const filtrarTareas = (textoBusqueda) => {
    const textoMinuscula = textoBusqueda.toLowerCase().trim();
    
    if (textoMinuscula === '') {
        return tareas;
    }
    
    return tareas.filter(tarea => 
        tarea.texto.toLowerCase().includes(textoMinuscula)
    );
};
```

### Renderizado Dinámico
```javascript
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
```

## Código Completo

### index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tareas</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Mis Tareas</h1>
        
        <!-- Formulario -->
        <form id="formTarea">
            <div class="form-group">
                <input type="text" id="inputTarea" placeholder="Escribe una tarea...">
                <span class="mensaje-error" id="errorTarea">Por favor, ingresa una tarea</span>
            </div>
            <div class="form-group">
                <input type="date" id="inputFecha">
                <span class="mensaje-error" id="errorFecha">Por favor, selecciona una fecha</span>
            </div>
            <button type="submit">Agregar</button>
        </form>

        <!-- Filtro de búsqueda -->
        <div class="filtro-container">
            <input type="text" id="inputFiltro" placeholder="Buscar tarea...">
        </div>

        <!-- Tabla -->
        <table id="tablaTareas">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tarea</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="listaTareas">
                <!-- Se llenan con JavaScript -->
            </tbody>
        </table>
    </div>

    <!-- Modal de confirmación -->
    <div id="modalConfirmacion" class="modal">
        <div class="modal-content">
            <h3>Confirmar eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta tarea?</p>
            <div class="modal-buttons">
                <button id="btnConfirmar" class="btn-confirmar">Eliminar</button>
                <button id="btnCancelar" class="btn-cancelar">Cancelar</button>
            </div>
        </div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
```

### css/styles.css
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f0f0f0;
    padding: 20px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
}

/* Formulario */
#formTarea {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.form-group {
    flex: 1;
    min-width: 200px;
    position: relative;
}

#inputTarea,
#inputFecha {
    width: 100%;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

#inputFecha {
    cursor: pointer;
}

#inputTarea:focus,
#inputFecha:focus {
    outline: none;
    border-color: #4CAF50;
}

button {
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    align-self: flex-start;
}

button:hover {
    background: #45a049;
}

/* Filtro */
.filtro-container {
    margin-bottom: 20px;
}

#inputFiltro {
    width: 100%;
    padding: 10px;
    border: 2px solid #2196F3;
    border-radius: 5px;
    font-size: 16px;
}

#inputFiltro:focus {
    outline: none;
    border-color: #1976D2;
}

/* Tabla */
table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background: #4CAF50;
    color: white;
    padding: 12px;
    text-align: left;
}

td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

.btn-eliminar {
    background: #f44336;
    padding: 5px 15px;
    font-size: 14px;
}

.btn-eliminar:hover {
    background: #da190b;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.modal-content {
    background-color: white;
    margin: 15% auto;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s;
}

@keyframes slideDown {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-content h3 {
    color: #333;
    margin-bottom: 15px;
    text-align: center;
}

.modal-content p {
    color: #666;
    margin-bottom: 25px;
    text-align: center;
    font-size: 16px;
}

.modal-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-confirmar {
    background: #f44336;
    padding: 10px 25px;
}

.btn-confirmar:hover {
    background: #da190b;
}

.btn-cancelar {
    background: #6c757d;
    padding: 10px 25px;
}

.btn-cancelar:hover {
    background: #5a6268;
}

/* Validación de errores */
.error {
    border-color: #f44336 !important;
}

.mensaje-error {
    color: #f44336;
    font-size: 13px;
    margin-top: 5px;
    display: none;
    animation: shake 0.3s;
}

.mensaje-error.mostrar {
    display: block;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
```

### js/app.js
```javascript
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
```

## Depuración

Para ver los datos en LocalStorage:
1. Abre las DevTools (F12)
2. Ve a la pestaña "Application" o "Almacenamiento"
3. Busca "Local Storage" en el panel izquierdo
4. Verás las claves `tareas` y `contadorId`

Para limpiar LocalStorage desde la consola:
```javascript
localStorage.clear();
```

## Recursos Adicionales

- [MDN - Document Object Model](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [MDN - Web Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API)
- [MDN - Array Methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN - Arrow Functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## Autor

HAMP:Desarrollado con fines educativos

