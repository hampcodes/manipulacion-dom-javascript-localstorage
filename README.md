# Gestor de Tareas con Autenticacion

Un sistema completo de gestion de tareas con autenticacion de usuarios, construido con HTML, CSS y JavaScript vanilla (sin librerias externas). Perfecto para aprender los fundamentos del desarrollo web.

## Tabla de Contenidos

1. [Que es este proyecto?](#que-es-este-proyecto)
2. [Que aprenderas?](#que-aprenderas)
3. [Como usar el proyecto?](#como-usar-el-proyecto)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Conceptos basicos explicados](#conceptos-basicos-explicados)
6. [Explicacion de las funciones](#explicacion-de-las-funciones)
7. [Como funciona la autenticacion?](#como-funciona-la-autenticacion)
8. [Como funciona el sistema de tareas?](#como-funciona-el-sistema-de-tareas)
9. [Glosario](#glosario-para-principiantes)

---

## Que es este proyecto?

Es una aplicacion web que permite a los usuarios:
- **Registrarse** con nombre, email y contrasena
- **Iniciar sesion** para acceder a sus tareas
- **Crear tareas** con descripcion y fecha
- **Ver todas sus tareas** en una lista
- **Buscar tareas** en tiempo real
- **Eliminar tareas** con confirmacion
- **Guardar todo** en el navegador (sin necesidad de internet)

## Que aprenderas?

### Conceptos de HTML
- Estructura de paginas web
- Formularios y campos de entrada
- Tablas para mostrar datos
- Modales (ventanas emergentes)

### Conceptos de CSS
- Estilos y colores
- Diseno responsive (se adapta a pantallas)
- Animaciones simples
- Clases dinamicas

### Conceptos de JavaScript
- Variables y funciones
- Eventos (clicks, escritura, etc.)
- Manipulacion del DOM (cambiar la pagina)
- LocalStorage (guardar datos en el navegador)
- Validacion de formularios
- Filtrado de datos

---

## Como usar el proyecto?

### Paso 1: Abrir el proyecto
1. Descarga todos los archivos
2. Abre el archivo `index.html` en tu navegador
3. Veras la pagina de inicio

### Paso 2: Registrarte
1. Haz click en "Registrarse"
2. Escribe tu nombre, email y contrasena (minimo 6 caracteres)
3. Click en "Registrarse"

### Paso 3: Crear tareas
1. Click en "Nueva Tarea"
2. Escribe la descripcion de la tarea
3. Selecciona una fecha
4. Click en "Agregar Tarea"

### Paso 4: Gestionar tareas
- **Buscar:** Escribe en el campo de busqueda para filtrar
- **Eliminar:** Click en el boton "Eliminar" y confirma
- **Cerrar sesion:** Click en "Cerrar Sesion"

---

## Estructura del proyecto

```
proyecto/
│
├── index.html                    # Pagina de inicio (landing page)
│
├── page/
│   ├── auth/
│   │   ├── login.html           # Pagina de inicio de sesion
│   │   └── register.html        # Pagina de registro
│   │
│   └── tarea/
│       ├── tarea-list.html      # Lista de tareas del usuario
│       └── tarea-form.html      # Formulario para crear tareas
│
├── js/
│   ├── auth.js                  # Funciones de autenticacion
│   └── tarea.js                 # Funciones de gestion de tareas
│
└── css/
    └── styles.css               # Todos los estilos
```

---

## Conceptos basicos explicados

### 1. DOM (Document Object Model)

**Que es?**
Es la forma en que JavaScript puede "hablar" con el HTML. Imagina que el HTML es un arbol y JavaScript puede:
- Buscar elementos (ramas)
- Cambiar texto o estilos
- Agregar o eliminar elementos
- Escuchar eventos (clicks, escritura, etc.)

**Ejemplo practico:**
```javascript
// Buscar un elemento por su ID
const boton = document.getElementById('miBoton');

// Cambiar su texto
boton.textContent = 'Nuevo texto';

// Escuchar cuando hacen click
boton.addEventListener('click', () => {
    alert('Hiciste click!');
});
```

### 2. LocalStorage

**Que es?**
Es como una "caja de almacenamiento" en el navegador donde puedes guardar informacion. Los datos se quedan guardados incluso si cierras el navegador.

**Como funciona?**
```javascript
// GUARDAR datos
localStorage.setItem('nombre', 'Juan');

// LEER datos
const nombre = localStorage.getItem('nombre'); // 'Juan'

// ELIMINAR un dato
localStorage.removeItem('nombre');

// ELIMINAR todo
localStorage.clear();
```

**Problema: Solo guarda texto**
Si quieres guardar objetos o arrays, debes convertirlos:

```javascript
// Objeto que queremos guardar
const usuario = { nombre: 'Juan', edad: 25 };

// GUARDAR: Convertir a texto
localStorage.setItem('usuario', JSON.stringify(usuario));

// LEER: Convertir de texto a objeto
const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
console.log(usuarioGuardado.nombre); // 'Juan'
```

### 3. Arrow Functions (Funciones flecha)

**Que es?**
Una forma moderna y corta de escribir funciones en JavaScript.

**Comparacion:**
```javascript
// Forma tradicional
function sumar(a, b) {
    return a + b;
}

// Arrow function
const sumar = (a, b) => {
    return a + b;
};

// Arrow function super corta (cuando solo devuelves algo)
const sumar = (a, b) => a + b;
```

### 4. Metodos de Arrays

Los arrays (listas) tienen funciones especiales muy utiles:

```javascript
const numeros = [1, 2, 3, 4, 5];

// filter: Crear nueva lista con elementos que cumplan una condicion
const pares = numeros.filter(num => num % 2 === 0); // [2, 4]

// map: Transformar cada elemento
const dobles = numeros.map(num => num * 2); // [2, 4, 6, 8, 10]

// find: Encontrar el primer elemento que cumpla una condicion
const numero = numeros.find(num => num > 3); // 4

// some: Verificar si al menos uno cumple la condicion
const hayPares = numeros.some(num => num % 2 === 0); // true

// includes: Verificar si contiene un valor
const tieneTres = numeros.includes(3); // true
```

---

## Explicacion de las funciones

### ARCHIVO: auth.js

Este archivo maneja todo lo relacionado con usuarios: registro, login y sesiones.

#### 1. validarEmail(email)
**Que hace?** Verifica si un email es valido.

**Como funciona?**
```javascript
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
```

**Ejemplo:**
```javascript
validarEmail('juan@gmail.com');  // true (valido)
validarEmail('juan.com');        // false (invalido)
validarEmail('juan@');           // false (invalido)
```

**Explicacion:**
- `regex` es un patron que dice "debe tener texto + @ + texto + . + texto"
- `test()` verifica si el email coincide con el patron

#### 2. validarPassword(password)
**Que hace?** Verifica que la contrasena tenga al menos 6 caracteres.

```javascript
const validarPassword = (password) => {
    return password.length >= 6;
};
```

**Ejemplo:**
```javascript
validarPassword('12345');    // false (muy corta)
validarPassword('123456');   // true (valida)
```

#### 3. guardarUsuario(usuario)
**Que hace?** Guarda un nuevo usuario en LocalStorage.

```javascript
const guardarUsuario = (usuario) => {
    // 1. Obtener lista actual de usuarios (o crear lista vacia)
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // 2. Agregar el nuevo usuario a la lista
    usuarios.push(usuario);

    // 3. Guardar lista actualizada
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};
```

**Como funciona paso a paso:**
1. Lee la lista de usuarios guardados
2. Si no hay usuarios, crea una lista vacia `[]`
3. Agrega el nuevo usuario con `push()`
4. Convierte la lista a texto con `JSON.stringify()`
5. Guarda todo en LocalStorage

#### 4. buscarUsuario(email, password)
**Que hace?** Busca un usuario con ese email y contrasena.

```javascript
const buscarUsuario = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.find(u => u.email === email && u.password === password);
};
```

**Ejemplo:**
```javascript
// Si existe el usuario, devuelve: { nombre: 'Juan', email: 'juan@mail.com', password: '123456' }
// Si NO existe, devuelve: undefined
```

#### 5. verificarSesion()
**Que hace?** Verifica si hay un usuario con sesion activa. Si no hay, redirige al login.

```javascript
const verificarSesion = () => {
    const usuario = obtenerSesion();
    if (!usuario) {
        // No hay sesion, enviar al login
        window.location.href = '../../page/auth/login.html';
    }
    return usuario;
};
```

**Donde se usa?** Esta funcion se ejecuta automaticamente en `tarea-list.html` y `tarea-form.html` para proteger esas paginas.

---

### ARCHIVO: tarea.js

Este archivo maneja todo lo relacionado con las tareas del usuario.

#### 1. cargarTareas()
**Que hace?** Carga las tareas del usuario actual desde LocalStorage.

```javascript
const cargarTareas = () => {
    // 1. Obtener usuario actual
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));

    // 2. Buscar las tareas de ESE usuario especifico
    const tareasGuardadas = localStorage.getItem(`tareas_${usuario.email}`);
    const idGuardado = localStorage.getItem(`contadorId_${usuario.email}`);

    // 3. Si hay tareas guardadas, cargarlas
    if (tareasGuardadas) tareas = JSON.parse(tareasGuardadas);
    if (idGuardado) contadorId = parseInt(idGuardado);
};
```

**Detalle importante:** Las tareas se guardan con el email del usuario como clave. Por ejemplo:
- Usuario `juan@mail.com` tiene sus tareas en `tareas_juan@mail.com`
- Usuario `maria@mail.com` tiene sus tareas en `tareas_maria@mail.com`

Esto hace que cada usuario tenga sus propias tareas separadas.

#### 2. agregarTarea(texto, fecha)
**Que hace?** Crea una nueva tarea y la guarda.

```javascript
const agregarTarea = (texto, fecha) => {
    // 1. Crear objeto tarea
    tareas.push({
        id: contadorId++,  // Asigna ID y aumenta el contador
        texto,
        fecha
    });

    // 2. Guardar en LocalStorage
    guardarTareas();

    // 3. Actualizar la pantalla
    mostrarTareas();
};
```

**Ejemplo:**
```javascript
agregarTarea('Comprar pan', '15/11/2025');
// Resultado: [{ id: 1, texto: 'Comprar pan', fecha: '15/11/2025' }]
```

#### 3. eliminarTarea()
**Que hace?** Elimina la tarea seleccionada.

```javascript
const eliminarTarea = () => {
    if (tareaAEliminar) {
        // filter crea un nuevo array SIN la tarea que queremos eliminar
        tareas = tareas.filter(t => t.id !== tareaAEliminar);

        guardarTareas();
        mostrarTareas();
        cerrarModal();
    }
};
```

**Como funciona `filter`?**
```javascript
// Supongamos que tareas es:
[
    { id: 1, texto: 'Tarea 1' },
    { id: 2, texto: 'Tarea 2' },
    { id: 3, texto: 'Tarea 3' }
]

// Si tareaAEliminar = 2, filter crea:
[
    { id: 1, texto: 'Tarea 1' },
    { id: 3, texto: 'Tarea 3' }
]
// (Se elimino la tarea con id: 2)
```

#### 4. filtrarTareas(texto)
**Que hace?** Busca tareas que contengan el texto escrito.

```javascript
const filtrarTareas = (texto) => {
    const textoLower = texto.toLowerCase().trim();
    return textoLower ?
        tareas.filter(t => t.texto.toLowerCase().includes(textoLower)) :
        tareas;
};
```

**Ejemplo:**
```javascript
// Tareas actuales:
[
    { id: 1, texto: 'Comprar pan' },
    { id: 2, texto: 'Estudiar JavaScript' },
    { id: 3, texto: 'Hacer ejercicio' }
]

filtrarTareas('comprar');
// Resultado: [{ id: 1, texto: 'Comprar pan' }]

filtrarTareas('a');
// Resultado: [
//   { id: 1, texto: 'Comprar pan' },
//   { id: 2, texto: 'Estudiar JavaScript' },
//   { id: 3, texto: 'Hacer ejercicio' }
// ]
```

#### 5. mostrarTareas(tareasFiltradas)
**Que hace?** Muestra las tareas en la pantalla como una tabla.

```javascript
const mostrarTareas = (tareasFiltradas = tareas) => {
    const listaTareas = document.getElementById('listaTareas');
    if (!listaTareas) return;

    // map() transforma cada tarea en HTML
    // join('') une todo en un solo texto
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
```

**Como funciona paso a paso:**
1. Obtiene el elemento `<tbody id="listaTareas">`
2. Para cada tarea, crea una fila `<tr>` con sus datos
3. `map()` convierte cada tarea en HTML
4. `join('')` une todas las filas en un solo texto
5. `innerHTML` reemplaza el contenido del tbody

#### 6. validarCampo(elemento, error)
**Que hace?** Verifica que un campo no este vacio y muestra error si lo esta.

```javascript
const validarCampo = (elemento, error) => {
    const valido = elemento.value.trim() !== '';
    elemento.classList.toggle('error', !valido);
    error.classList.toggle('mostrar', !valido);
    return valido;
};
```

**Explicacion:**
- `elemento.value.trim()` obtiene el texto sin espacios al inicio/final
- `!== ''` verifica que no sea vacio
- `classList.toggle()` agrega o quita la clase segun la condicion
- Si es invalido, agrega clase `error` al input y `mostrar` al mensaje

#### 7. formatearFecha(fecha)
**Que hace?** Convierte fecha de formato `YYYY-MM-DD` a `DD/MM/YYYY`.

```javascript
const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split('-');
    return `${day}/${month}/${year}`;
};
```

**Ejemplo:**
```javascript
formatearFecha('2025-11-15');
// Resultado: '15/11/2025'
```

**Como funciona:**
1. `split('-')` divide el texto por cada `-`
2. Resultado: `['2025', '11', '15']`
3. Destructuring: `year = '2025'`, `month = '11'`, `day = '15'`
4. Template literal: reorganiza en nuevo formato

---

## Como funciona la autenticacion?

### Flujo completo de registro:

1. Usuario llena formulario en `register.html`
2. Click en "Registrarse"
3. JavaScript valida los campos:
   - Nombre no vacio
   - Email formato correcto
   - Contrasena minimo 6 caracteres
4. Verifica que el email no este registrado
5. Crea objeto usuario: `{ nombre, email, password }`
6. Guarda en LocalStorage en la lista de usuarios
7. Crea sesion con `guardarSesion(usuario)`
8. Redirige a `tarea-list.html`

### Flujo completo de login:

1. Usuario llena formulario en `login.html`
2. Click en "Iniciar Sesion"
3. JavaScript valida los campos
4. Busca usuario con `buscarUsuario(email, password)`
5. Si existe:
   - Guarda sesion con `guardarSesion(usuario)`
   - Redirige a `tarea-list.html`
6. Si no existe:
   - Muestra error "Email o contrasena incorrectos"

### Como funciona la sesion:

Una "sesion" es simplemente guardar en LocalStorage quien esta usando la app:

```javascript
// GUARDAR SESION
localStorage.setItem('usuarioActual', JSON.stringify(usuario));

// VERIFICAR SESION
const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
if (!usuario) {
    // No hay sesion, redirigir al login
    window.location.href = 'login.html';
}

// CERRAR SESION
localStorage.removeItem('usuarioActual');
window.location.href = 'login.html';
```

---

## Como funciona el sistema de tareas?

### Flujo para crear una tarea:

1. Usuario hace click en "Nueva Tarea"
2. Abre `tarea-form.html`
3. `verificarSesion()` confirma que hay usuario logueado
4. Usuario escribe descripcion y selecciona fecha
5. Click en "Agregar Tarea"
6. JavaScript:
   - Valida campos con `validarFormulario()`
   - Formatea fecha con `formatearFecha()`
   - Crea tarea con `agregarTarea()`
   - Guarda en LocalStorage con clave especifica del usuario
   - Redirige a `tarea-list.html`

### Flujo para buscar tareas:

1. Usuario escribe en el campo de busqueda
2. Cada letra que escribe dispara el evento `input`
3. JavaScript:
   - Obtiene el texto escrito
   - Llama a `filtrarTareas(texto)`
   - `filter()` busca tareas que contengan ese texto
   - `mostrarTareas()` actualiza la tabla con resultados

### Flujo para eliminar una tarea:

1. Usuario hace click en boton "Eliminar"
2. Se ejecuta `mostrarModalEliminar(id)`
3. Guarda el ID en variable `tareaAEliminar`
4. Muestra el modal de confirmacion
5. Usuario hace click en "Eliminar" (boton del modal)
6. Se ejecuta `eliminarTarea()`
7. `filter()` crea nuevo array sin esa tarea
8. Guarda en LocalStorage
9. Actualiza la pantalla
10. Cierra el modal

---

## Glosario

### Terminos de HTML
- **Tag (etiqueta):** Codigo entre `<` y `>` como `<div>`, `<button>`
- **Atributo:** Informacion extra en un tag, como `id="miId"`
- **Input:** Campo donde el usuario escribe
- **Form:** Formulario que agrupa inputs
- **Button:** Boton clickeable
- **Table:** Tabla con filas y columnas

### Terminos de CSS
- **Clase:** Nombre que identifica uno o mas elementos, se escribe `.clase`
- **ID:** Identificador unico de un elemento, se escribe `#id`
- **Selector:** Forma de seleccionar elementos para aplicar estilos
- **Propiedad:** Caracteristica de estilo como `color`, `background`

### Terminos de JavaScript
- **Variable:** Caja donde guardas un valor, se crea con `let` o `const`
- **Funcion:** Bloque de codigo reutilizable
- **Evento:** Accion del usuario como click, escribir, etc.
- **Array:** Lista de elementos, se escribe `[1, 2, 3]`
- **Objeto:** Conjunto de datos relacionados, se escribe `{ nombre: 'Juan' }`
- **Callback:** Funcion que se ejecuta cuando pasa algo
- **Template literal:** Texto entre `` que puede incluir variables con `${}`

### Terminos del proyecto
- **DOM:** Representacion de la pagina que JavaScript puede modificar
- **LocalStorage:** Almacenamiento del navegador
- **Sesion:** Usuario actualmente logueado
- **CRUD:** Create (Crear), Read (Leer), Update (Actualizar), Delete (Eliminar)
- **Validacion:** Verificar que los datos sean correctos
- **Filtrar:** Buscar elementos que cumplan una condicion
- **Renderizar:** Mostrar datos en la pantalla

---

## Consejos para estudiar el codigo

1. **Empieza por el HTML:** Entiende la estructura antes de ver el JavaScript
2. **Usa console.log():** Imprime variables para ver su contenido
3. **Experimenta:** Cambia valores y ve que pasa
4. **Lee los comentarios:** Explican que hace cada seccion
5. **Prueba las funciones:** Abre la consola y ejecuta funciones manualmente
6. **Usa las DevTools:** F12 para ver errores, LocalStorage, etc.

### Ejemplo de experimentacion:
```javascript
// En la consola del navegador, prueba:
localStorage.getItem('usuarios'); // Ver usuarios registrados
JSON.parse(localStorage.getItem('usuarios')); // Ver como objetos
localStorage.clear(); // Borrar todo y empezar de nuevo
```

---

## Autor

Henry Antonio Mendoza Puerta

---

## Licencia

Este proyecto es de codigo abierto para propositos educativos.
