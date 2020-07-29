/* VARIABLES */
const FormularioSession = document.getElementById('FormSession');
const MensajeError = document.querySelector('div.CajaMSGLobo');
const MensajeErrorMobil = document.querySelector('div.MSGErroCell');



/* EVENTOS */
FormularioSession.addEventListener('submit', IniciarSesison);


/* FUNCIONES */

function IniciarSesison(e) {

    const Nombre = document.getElementById('dreyna').value;

    /* AGREGAR USUARIO AL LOCALSTORAGE INMEDIATO */
    AgregarUserStorage(Nombre);


    /* VALIDACION DE NOMBRE */
    if (Nombre == '  ') {

        e.preventDefault();

        MensajeError.style.display = 'block';

        setTimeout(function() {
            MensajeError.style.display = 'none';
        }, 4000);

        /* MENSAJE ERROR MOBIL */

        MensajeErrorMobil.style.display = 'block';
        setTimeout(function() {
            MensajeErrorMobil.style.display = 'none';
        }, 3000);

    }

}

/* AGREGAR USUARIO AL LOCAL STORAGE */

function AgregarUserStorage(Nombre) {
    let Usuario;

    Usuario = VerificarLocalStorage();
    localStorage.setItem('Usuario', Nombre);

}

/* VERIFICAR SI LOCALSTORAGE ESTA VACIO O NO */

function VerificarLocalStorage() {
    let NameUser;

    if (localStorage.getItem('Usuario') === null) {
        NameUser = '';
    } else {
        NameUser = localStorage.getItem('Usuario');
    }

    return NameUser;
}