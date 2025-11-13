// 1. Funciones de validacion
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validarPassword = (password) => {
    return password.length >= 6;
};

const validarNombre = (nombre) => {
    return nombre.trim().length > 0;
};

// 2. Funciones de LocalStorage
const guardarUsuario = (usuario) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

const buscarUsuario = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.find(u => u.email === email && u.password === password);
};

const usuarioExiste = (email) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.some(u => u.email === email);
};

const guardarSesion = (usuario) => {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
};

const obtenerSesion = () => {
    return JSON.parse(localStorage.getItem('usuarioActual'));
};

const cerrarSesion = () => {
    localStorage.removeItem('usuarioActual');
    window.location.href = '../../index.html';
};

// 3. Verificar proteccion de rutas
const verificarSesion = () => {
    const usuario = obtenerSesion();
    if (!usuario) {
        window.location.href = '../../page/auth/login.html';
    }
    return usuario;
};

// 4. Manejo de formularios
if (document.getElementById('formLogin')) {
    const form = document.getElementById('formLogin');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validar
        let valido = true;

        if (!validarEmail(email)) {
            emailInput.classList.add('error');
            errorEmail.classList.add('mostrar');
            valido = false;
        } else {
            emailInput.classList.remove('error');
            errorEmail.classList.remove('mostrar');
        }

        if (!validarPassword(password)) {
            passwordInput.classList.add('error');
            errorPassword.classList.add('mostrar');
            valido = false;
        } else {
            passwordInput.classList.remove('error');
            errorPassword.classList.remove('mostrar');
        }

        if (!valido) return;

        // Buscar usuario
        const usuario = buscarUsuario(email, password);

        if (usuario) {
            guardarSesion(usuario);
            window.location.href = '../tarea/tarea-list.html';
        } else {
            alert('Email o contrasena incorrectos');
        }
    });
}

if (document.getElementById('formRegister')) {
    const form = document.getElementById('formRegister');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorPassword = document.getElementById('errorPassword');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validar
        let valido = true;

        if (!validarNombre(nombre)) {
            nombreInput.classList.add('error');
            errorNombre.classList.add('mostrar');
            valido = false;
        } else {
            nombreInput.classList.remove('error');
            errorNombre.classList.remove('mostrar');
        }

        if (!validarEmail(email)) {
            emailInput.classList.add('error');
            errorEmail.classList.add('mostrar');
            valido = false;
        } else {
            emailInput.classList.remove('error');
            errorEmail.classList.remove('mostrar');
        }

        if (!validarPassword(password)) {
            passwordInput.classList.add('error');
            errorPassword.classList.add('mostrar');
            valido = false;
        } else {
            passwordInput.classList.remove('error');
            errorPassword.classList.remove('mostrar');
        }

        if (!valido) return;

        // Verificar si existe
        if (usuarioExiste(email)) {
            alert('Este email ya esta registrado');
            return;
        }

        // Guardar usuario
        const usuario = { nombre, email, password };
        guardarUsuario(usuario);
        guardarSesion(usuario);

        window.location.href = '../tarea/tarea-list.html';
    });
}
