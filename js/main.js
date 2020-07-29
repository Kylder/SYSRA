/* --------------------------- */
/* ---------/VARAIBLES/------- */
/* --------------------------- */

/* VARAIBLES USER*/
const NameUserP = document.getElementById('UserName');

/* VARAIBLES BOTONES  */
const BotonAgregarNotas = document.getElementById('ClickAgregarTarea');
const BotonVerNotas = document.getElementById('ClickVerTarea');
const BotonVolverNotas = document.getElementById('ClickVolverTarea');

/*  VARIABLES FORMULARIO INSERTAR NOTAS */
const FormularioNotas = document.getElementById('FormularioNotas');
const CuadroNotas = document.querySelector('div.AgregaNota');
const NotaEnviada = document.querySelector('div.NotaEnviada');
const NotaVacia = document.querySelector('div.NotaError');

/* VARAIBLES RECUADRO DE NOTAS */
const GuardarNotasCuadro = document.getElementById('CuadroGuardarNotas');
const LimpiarNotas = document.getElementById('Limpiar');

/* VARIABLES CAMBIO DE PAGINA NOTAS */
const Seccion1 = document.querySelector('div.seccion1');
const Seccion2 = document.querySelector('div.seccion2');

let ClicksCuadro = 0;

/* --------------------------- */
/* ---------/EVENTOS/--------- */
/* --------------------------- */

/* EVENTO CARGA DE PAGINA  */
document.addEventListener('DOMContentLoaded', ImprimirUser);
document.addEventListener('DOMContentLoaded', ImprimirNotas);

/* EVENTOS DE BOTON */
BotonAgregarNotas.addEventListener('click', AbrirCuadroNotas);
BotonVerNotas.addEventListener('click', VerCuadroNotas);
BotonVolverNotas.addEventListener('click', VolverNotas);

/* EVENTOS FORMULARIO */
FormularioNotas.addEventListener('submit', EnvioNota);
GuardarNotasCuadro.addEventListener('click', ListoNota);
LimpiarNotas.addEventListener('click', LimpiarTodo);

/* --------------------------- */
/* ---------/FUNCIONES/------- */
/* --------------------------- */

/* IMPRIMIR EN PAGINA OFICIAL EL USUARIO */
function ImprimirUser() {
    var Obtener = localStorage.getItem('Usuario');
    NameUserP.innerText = Obtener;
}

function AbrirCuadroNotas() {
    CuadroNotas.style.display = 'block';
    ClicksCuadro++;
    if (ClicksCuadro == 2) {
        CuadroNotas.style.display = 'none';
        ClicksCuadro = 0;
    }
}


/* ENVIAR NOTAS */
function EnvioNota(e) {
    e.preventDefault();
    const Nota = document.getElementById('Nota').value;

    /* VALIDACION INPUT */
    if (Nota != '') {

        NotaEnviada.style.display = 'block'

        setTimeout(function() {
            NotaEnviada.style.display = 'none';
        }, 1200);

        let CrearTemplet = `
        <li>
        <p>${Nota}</p>
        <div class="OpcionNotas">
            <i class="far fa-check-circle Listo"></i>
            <i class="far fa-times-circle Borrar"></i>
        </div>
        </li>
        `;

        GuardarNotasCuadro.innerHTML += CrearTemplet;

        /* GUARDAR LOCAL STORAGE */
        GuardarLocalStorag(Nota);

    } else {
        e.preventDefault();

        NotaVacia.style.display = 'block'
        setTimeout(function() {
            NotaVacia.style.display = 'none'
        }, 1200);
    }


}

/* PASAR PAGINA SECCION */

function VerCuadroNotas() {
    Seccion1.style.display = 'none';
    Seccion2.style.display = 'block';
}

function VolverNotas() {
    Seccion1.style.animation = 'Seccion1 .8s ease 0s';
    Seccion1.style.display = 'block';
    Seccion2.style.display = 'none';

    /* DEVOLVER PAGINA NOTAS, CUADRO OFF */
    CuadroNotas.style.display = 'none';
    ClicksCuadro = 0;
}


/* DELEGATION TARIA LISTO */

function ListoNota(e) {

    if (e.target.classList.contains('Listo')) {
        var TextoTachado = e.target.parentElement.parentElement.firstChild.nextSibling;
        TextoTachado.style.textDecoration = "line-through";

    }

    if (e.target.classList.contains('Borrar')) {
        e.target.parentElement.parentElement.remove()
        const TextoNotas = e.target.parentElement.parentElement.firstChild.nextSibling.textContent;

        BorrarLocalStorage(TextoNotas);
    }
}

/* LIMPIAR NOTDAS */
function LimpiarTodo(e) {
    GuardarNotasCuadro.innerHTML = '';
    /*  while (e.target.parentElement.nextSibling.nextSibling.firstChild.nextSibling) {
         e.target.parentElement.nextSibling.nextSibling.firstChild.nextSibling.remove(e.target.parentElement.nextSibling.nextSibling.firstChild.nextSibling);
     } */

    VaciarLocalStorage();
}

/* ---------/FUNCIONES LOCAL STORAGE/------- */

function GuardarLocalStorag(Nota) {
    let Notas;

    Notas = VerificarLocalStorage();

    Notas.push(Nota);
    localStorage.setItem('MisNotas', JSON.stringify(Notas));
}

function VerificarLocalStorage() {
    let Verificar;

    if (localStorage.getItem('MisNotas') === null) {
        Verificar = [];
    } else {
        Verificar = JSON.parse(localStorage.getItem('MisNotas'));
    }
    return Verificar;
}

function ImprimirNotas() {
    let imprimir;
    imprimir = VerificarLocalStorage();

    imprimir.forEach(function(element) {

        let CrearTemplet = `
        <li>
        <p>${element}</p>
        <div class="OpcionNotas">
            <i class="far fa-check-circle Listo"></i>
            <i class="far fa-times-circle Borrar"></i>
        </div>
        </li>
        `;

        GuardarNotasCuadro.innerHTML += CrearTemplet;
    });
}

/* BORRA LOCALSTORAGE */

function BorrarLocalStorage(TextoNotas) {
    let BorraStorage;
    BorraStorage = VerificarLocalStorage();

    BorraStorage.forEach(function(element, index) {
        console.log(element === TextoNotas);
        if (element == TextoNotas) {
            BorraStorage.splice(index, 1);
        }
    });

    localStorage.setItem('MisNotas', JSON.stringify(BorraStorage));
}

/* VACIAR EL LOCAL STORAGE */

function VaciarLocalStorage() {
    localStorage.removeItem('MisNotas');
}