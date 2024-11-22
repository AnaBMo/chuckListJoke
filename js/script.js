/* -------------------------------------------------------------
1. Manejador de click en el botón "Obtener Chiste"
    El botón al mismo tiempo 
        - muestra el chiste
        - lo guarda en localStore
-------------------------------------------------------------- */
const obtenerChiste = document.getElementById('fetchJoke');

fetchJoke.addEventListener('click', () => {
    fetch(`https://api.chucknorris.io/jokes/random`)
        .then((response) => {
            console.log('🟢 Respuesta:', response);
            if (!response.ok) {
                throw new Error('No ha sido posible acceder al enlace.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('🟦 API devuelve el chiste ok? ', data.value);
            mostrarChiste(data.value);
            guardarChiste(data.value); 
        })
        .catch((error) => {
            console.error('🔴 Fallo fetch:', error);
            obtenerChiste.innerText = 'No se han podido obtener los datos.';
        });
});

/* -------------------------------------------------------------
2. Una función para renderizar la lista de chistes en el DOM
    - añadir cada chiste a la lista de HTML
    - poder borrar cada chiste individualmente
-------------------------------------------------------------- */
const mostrarChiste = (chiste) => {
    console.log('🟡Función muestra chiste ok? ', chiste);

    const listaChistes = document.getElementById('jokeList');

    const contenedorChiste = document.createElement('li');
    contenedorChiste.classList.add('chiste');
    contenedorChiste.innerHTML = `
        <p>${chiste}</p>
        <button class="eliminar-chiste">Eliminar</button> 
    `;                           //crear el botón en HTML para eliminar chiste individual
    listaChistes.appendChild(contenedorChiste);

    // poder borrar cada chiste individualmente
    const botonEliminar = contenedorChiste.querySelector('.eliminar-chiste'); // querySelector selecciona por clase
    botonEliminar.addEventListener('click', () => {
        eliminarChiste(chiste);
        listaChistes.removeChild(contenedorChiste);
    });
};

/* -------------------------------------------------------------
3. Una función para guardar la lista de chistes en localStorage
-------------------------------------------------------------- */
const guardarChiste = (chiste) => {

    const contador = parseInt(localStorage.getItem('chistesContador') || '0', 10); // si no ponemos parseInt da el fallo comentado abajo
    const clave = `chiste_${contador}`;

    localStorage.setItem(clave, chiste); // almacenamos clave-valor en localStore 
    localStorage.setItem('chistesContador', contador + 1); // se incrementa con un contador y se actualiza en localStore

    console.log(`🟧 Chiste guardado: ${clave} => ${chiste}`);
};



/* -------------------------------------------------------------
4. Una función para cargar la lista de chistes desde localStorage
-------------------------------------------------------------- */
const cargarChistes = () => {
    const listaChistes = document.getElementById('jokeList');
    listaChistes.innerHTML = ''; // lista vacía

    // se recorre localStore para ir mostrando los chistes almacenados llamando a la clave almacenada en la función anterior ¿?
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);

        if (clave.startsWith('chiste_')) {
            const chiste = localStorage.getItem(clave);
            mostrarChiste(chiste);
        }
    }
};

/* -------------------------------------------------------------
5. Una función para eliminar un chiste específico del localStorage
-------------------------------------------------------------- */
const eliminarChiste = (chiste) => {
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);

        // Comparar el valor del chiste para encontrar su clave
        if (localStorage.getItem(clave) === (chiste)) {
            localStorage.removeItem(clave);
            console.log(` ⚫Chiste eliminado: ${clave}`); 
            break;
        }
    }
};

/* NOTA: hay fallos en el punto 3 (chiste guardado)- PARECE RELACIONADO CON EL CONTADOR y poner parseInt o no hacerlo. */