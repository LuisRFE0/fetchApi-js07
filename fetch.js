
const api = document.querySelector('#api');

api.addEventListener('click', obtenerDatos);
verificarAcceso();

/**
 * Obtiene los datos de la api mediante el endpoint
 */
function obtenerDatos() {
    desabilitarBoton();
    document.getElementById("spinner").style.display = "block";
    fetch('https://reqres.in/api/users?delay=3')
        .then(respuesta => respuesta.json())
        .then(resultado => {
            insertarLocalStorage(resultado.data)
            document.getElementById("spinner").style.display = "none";
            location.reload();

        })
        .catch(error => console.log(error))
}


/**
 * Se reciben los datos de la api para guardarlos en localStorage
 * @param {datos de la api} datos 
 */
function insertarLocalStorage(datos) {
    const tiempoInicio = { tiempoInicio: new Date().getTime() }
    datos.unshift(tiempoInicio);
    const personasTexto = JSON.stringify(datos);
    localStorage.setItem('personas', personasTexto);

}



/**
 * Verifica el tiempo de acceso valido del localStorage
 */
function verificarAcceso() {
    const personasLocal = localStorage.getItem('personas');
    const personas = JSON.parse(personasLocal);
    const tiempoValido = new Date().getTime() - personas[0].tiempoInicio;


    if ((tiempoValido / 1000) < 60) {

        api.setAttribute('disabled', '');
        personas.shift();
        mostrarHTML(personas);

    } else {
        const contenido = document.querySelector('#contenido2');
        const alerta = document.createElement('h2');
        alerta.textContent = 'Por favor presiona el boton ';
        contenido.appendChild(alerta);
    }
}


// Mientras el localStorage este activo el boton estara desabilitado
function desabilitarBoton() {
    api.setAttribute('disabled', '');
}



function mostrarHTML(datos) {
    const contenido = document.querySelector('#contenido');
    datos.forEach(element => {

        const card = document.createElement('DIV');
        card.classList.add('card', 'mx-3', 'mt-2', 'mb-2', 'contenedor-card');

        const imgCard = document.createElement('IMG');
        imgCard.classList.add('card-img', 'imagen');
        imgCard.src = element.avatar;

        const cardBody = document.createElement('DIV');
        cardBody.classList.add('card-body');

        const id = document.createElement('h2');
        id.classList.add('card-title');
        id.textContent = element.id;

        const titulo = document.createElement('h2');
        titulo.classList.add('card-title');
        titulo.textContent = element.first_name;

        const apellido = document.createElement('h5');
        apellido.classList.add('card-title');
        apellido.textContent = element.last_name;

        const email = document.createElement('p');
        email.classList.add('card-text');
        email.textContent = `Email: ${element.email}`;

        cardBody.appendChild(id);
        cardBody.appendChild(titulo);
        cardBody.appendChild(apellido);
        cardBody.appendChild(email);
        card.appendChild(imgCard);
        card.appendChild(cardBody);

        contenido.appendChild(card);

    });


}

