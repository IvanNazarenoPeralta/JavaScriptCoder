const usuarios = [
    { nombre: 'prueba', mail: 'prueba@mail.com', pass: '1569' },
    { nombre: 'ivan', mail: 'peralta@mail.com', pass: 'qwerty123' },
    { nombre: 'lionel', mail: 'messi@mail.com', pass: 'qwerty321' },
    { nombre: 'elprofe', mail: 'profe@mail.com', pass: 'lala1' }
];

const mailLogin = document.getElementById('mailLogin');
const passLogin = document.getElementById('passwordLogin');
const recordar = document.getElementById('recordarme');
const btnLogin = document.getElementById('login');
const modalEl = document.getElementById('modalLogin');
const modal = new bootstrap.Modal(modalEl);
const nombreUsuario = document.getElementById('nombreUsuario');
const toggles = document.querySelectorAll('.toggles');
const formSimulador = document.getElementById('formSimulador');
const capitalInput = document.getElementById('capital');
const diasInput = document.getElementById('dias');
const resultadoDiv = document.getElementById('resultado');
const infoTasaDiv = document.getElementById('infoTasa');
const infoPoliticaDiv = document.getElementById('infoPolitica');

const tasa = 34.45;

function validarUsuario(userDB, user, pass) {
    const encontrado = userDB.find(userDB => userDB.mail === user);
    return encontrado && encontrado.pass === pass ? encontrado : false;
}

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass,
    };
    storage.setItem('usuario', JSON.stringify(usuario));
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.nombre}</span>`;
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    return JSON.parse(storage.getItem('usuario'));
}

function estaLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        presentarInfo(toggles, 'd-none');
        mostrarOpciones();
    } else {
        presentarInfo(toggles, 'd-none');
    }
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function mostrarOpciones() {
    document.getElementById('infoTasa').classList.remove('d-none');
    document.getElementById('infoPolitica').classList.remove('d-none');
}

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos para el ingreso');
    } else {
        const data = validarUsuario(usuarios, mailLogin.value, passLogin.value);
        if (!data) {
            alert('Usuario y/o contraseña incorrectos');
        } else {
            if (recordar.checked) {
                guardarDatos(data, localStorage);
            } else {
                guardarDatos(data, sessionStorage);
            }
            modal.hide();
            estaLogueado(recuperarUsuario(localStorage) || recuperarUsuario(sessionStorage));
        }
    }
});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

window.onload = () => {
    estaLogueado(recuperarUsuario(localStorage) || recuperarUsuario(sessionStorage));
};

formSimulador.addEventListener('submit', (e) => {
    e.preventDefault();

    const capital = parseFloat(capitalInput.value);
    const dias = parseFloat(diasInput.value);

    if (capital >= 1000 && dias >= 30) {
        const resultado = (capital * dias);
        const rendimiento = (resultado * ((tasa / 100) / 365));
        resultadoDiv.innerHTML = `
            <p>En base a su capital, el rendimiento esperado para la cantidad de días seleccionado es de $${resultado.toFixed(2)}.</p>
            <p>Al final de los ${dias} días seleccionados, se le acreditará $${(capital + rendimiento).toFixed(2)} a su cuenta.</p>
        `;
    } else {
        resultadoDiv.innerHTML = '<p>Por favor revise nuestra política de inversión.</p>';
    }
});