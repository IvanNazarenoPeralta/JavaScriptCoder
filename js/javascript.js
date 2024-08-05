const usuarios = [{
    nombre: 'prueba',
    mail: 'prueba@mail.com',
    pass: '1569'
},
{
    nombre:'ivan',
    mail:'peralta@mail.com',
    pass:'qwerty123'
} ,   
{
    nombre:'lionel',
    mail:'messi@mail.com',
    pass:'qwerty321'
},      
{
    nombre:'elprofe',
    mail:'profe@mail.com',
    pass:'lala1'
}];

const mailLogin = document.getElementById('mailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    nombreUsuario = document.getElementById('nombreUsuario'),
    toggles = document.querySelectorAll('.toggles');

function validarUsuario(userDB,user, pass){
    let encontrado = userDB.find(userDB => userDB.mail === user);
    if (encontrado && encontrado.pass  === pass) {
        return encontrado;
    } 
    return false;
}

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass,
    }
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
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}
function estaLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        presentarInfo(toggles, 'd-none');
        mostrarOpciones();
    } else  {
        presentarInfo (toggles, 'd-none');
    }
}
function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

btnLogin.addEventListener('click',(e) => {
    e.preventDefault();

    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos para el ingreso');
    } else {
        let data = validarUsuario(usuarios,mailLogin.value,passLogin.value);
        if (!data) {
            alert('Usuario y/o contraseña incorrectos');
        } else {
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            modal.hide()
            presentarInfo(toggles, 'd-none');
        }
    }
})

function mostrarOpciones() {
let tasa = 34.45;
 let opcion = prompt('ingrese una opcion: \n1- Conocé la tasa vigente. \n2- Simulador de plazo fijo. \n3- Politica de inversion. \n Presiona X para finalizar.');
    while(opcion != 'X' && opcion != 'x'){
        switch (opcion){
            case '1': 
                alert ('La tasa de interes en nuestros plazos fijos es de ' + tasa+'% anual. Esto es equivalente a un rendimiento diario de '+ tasa/365 + ' %');
                break;
            case '2': 
                let capital = parseFloat(prompt('ingrese la cantidad de dinero a invertir'));
                let dias = parseFloat(prompt('Ingrese la cantidad de dias que desea establecer el plazo fijo'));
                if(capital>=1000 && dias>=30){
                
                        let resultado = (capital*dias);
                        let resultado1 = (resultado*((tasa/100)/365));
                        alert ('En base a su capital, el rendimiento esperado para la cantidad de dias seleccionado es de $ '+ resultado1);
                        alert('Al final de los '+ dias+ ' dias seleccionados, se le acreditara $' +capital+resultado1 + ' a su cuenta.');}
                else{alert('Por favor revise nuestra politica de inversion.');}
                
                break;
            case '3':    
                alert('El monto minimo de inversion es de $1000 y el plazo minimo es de 30 dias.')
                break;
                default:
                    alert('elegiste una opcion invalida');
                    break;
        }        
         opcion = prompt('ingrese una opcion: \n1- Conocé la tasa vigente. \n2- simulador de plazo fijo. \n3- Politica de inversion.\n Presiona X para finalizar.');
    }
};

alert('Muchas gracias por utilizar nuestro simulador. Adios!')

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos para el ingreso');
    } else {
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);
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

btnLogout.addEventListener('click', (e) => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

window.onload = () => {
    estaLogueado(recuperarUsuario(localStorage) || recuperarUsuario(sessionStorage));
};