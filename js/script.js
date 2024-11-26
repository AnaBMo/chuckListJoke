/* *************************************************************
             MODIFICADO TRAS CORRECCIONES EN CLASE
************************************************************** */

/* -------------------------------------------------------------
1. Evento de click en el botón "Obtener Chiste"
    El botón al mismo tiempo 
        - muestra el chiste
        - lo guarda en localStore
-------------------------------------------------------------- */
const fetchJokeButton = document.getElementById('fetchJoke'); // recomendable poner Btn en el nombre para recordar que va un evento en el botón
const jokeList = document.getElementById('jokeList');

// cargar chistes del localStore
// para traer algo de localStore sin fallos, se usa el método JSON.parse()
let jokes = JSON.parse(localStorage.getItem('jokes')) || []; // trae el conjunto de chistes y, si no existe, arranca con array vacío

// evento para obtener chistes desde el botón --> fetch llama a la API
fetchJokeButton.addEventListener('click', () => {
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
            let joke = data.value; // recomendable para usar la variable en lugar de llamar a data.value
            console.log('⬜ data.value dentro de varible', joke);
            jokes.push(joke); // cada chiste iría al array vacío 
            localStorage.setItem('jokes',  JSON.stringify(jokes)); // el array ya con los chistes dentro se actualiza en localStorage 
                // para meter algo en localStore sin fallos se usa el método JSON.stringify()
            
            renderJokes(jokes); // llamo a la función para pintar o renderizar los chistes. Aquí hay que ponerle el array vacío de arriba
        })
        .catch((error) => {
            console.error('🔴 Fallo fetch:', error);
            renderJokes.innerText = 'No se han podido obtener los datos.';
        });
});

/* -------------------------------------------------------------
2. Una función para renderizar la lista de chistes en el DOM
    - añadir cada chiste a la lista de HTML
    - poder borrar cada chiste individualmente
-------------------------------------------------------------- */
function renderJokes (jokesArray) {
    console.log('🟡Función muestra chiste ok? ', jokesArray);
    jokeList.innerHTML = '';

    // recorrer para crear el botón de eliminar en cada chiste
    for (let i = 0; i < jokesArray.length; i++) {
        let li = document.createElement('li');
        li.textContent = jokesArray[i];

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        // después de crear el botón en el DOM, se le programa directamente la funcionalidad
        // la idea del filtro es que devuelva de nuevo la lista SIN el chiste eliminado
        
        deleteButton.addEventListener('click', () => {
            let jokeToDelete = jokesArray[i]; // Guardamos el chiste que se eliminará
            console.log('🗑️ Chiste eliminado:', jokeToDelete); // Mostramos el chiste eliminado en la consola

            jokes = jokesArray.filter((j) => {
                return j !== jokeToDelete;
            }); // Filtramos la lista para eliminar el chiste
            localStorage.setItem('jokes', JSON.stringify(jokes)); // Actualizamos el localStorage
            renderJokes(jokes); // Re-renderizamos la lista actualizada 
             
        }) 
        // renderizar cada chiste y botones eliminar
        li.appendChild(deleteButton);
        jokeList.appendChild(li);
    }
};

//localStorage.clear();

/* -------------------------------------------------------------
LOS PUNTOS 3, 4 y 5 SE HAN HECHO EN CLASE DENTRO DEL EVENTO CLICK 
Y QUEDA MÁS SENCILLO.
-------------------------------------------------------------- */

/* -------------------------------------------------------------
3. Una función para guardar la lista de chistes en localStorage
-------------------------------------------------------------- */
/* const guardarChiste = (chiste) => {

    const contador = parseInt(localStorage.getItem('chistesContador') || '0', 10); // si no ponemos parseInt da el fallo comentado abajo
    const clave = `chiste_${contador}`;

    localStorage.setItem(clave, chiste); // almacenamos clave-valor en localStore 
    localStorage.setItem('chistesContador', contador + 1); // se incrementa con un contador y se actualiza en localStore

    console.log(`🟧 Chiste guardado: ${clave} => ${chiste}`);
};
 */


/* -------------------------------------------------------------
4. Una función para cargar la lista de chistes desde localStorage
-------------------------------------------------------------- */
/* const cargarChistes = () => {
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
}; */

/* -------------------------------------------------------------
5. Una función para eliminar un chiste específico del localStorage
-------------------------------------------------------------- */
/* const eliminarChiste = (chiste) => {
    for (let i = 0; i < localStorage.length; i++) {
        const clave = localStorage.key(i);

        // Comparar el valor del chiste para encontrar su clave
        if (localStorage.getItem(clave) === (chiste)) {
            localStorage.removeItem(clave);
            console.log(` ⚫Chiste eliminado: ${clave}`); 
            break;
        }
    }
}; */

/* -------------------------------------------------------------
6. Una función para eliminar todos los chistes del localStore
-------------------------------------------------------------- */