// CARGAR DATOS (GET)
// Esta función pide los datos al servidor y los muestra en pantalla
async function cargarDatos() {
    // Pedimos los datos al backend
    const respuesta = await fetch("http://localhost:5000/formularios");

    // Convertimos la respuesta en JSON (lista de formularios)
    const datos = await respuesta.json();

    // Cogemos el div donde vamos a mostrar los datos
    const lista = document.getElementById("lista");

    // Limpiamos lo que había antes
    lista.innerHTML = "";

    // Recorremos todos los formularios
    for (let item of datos) {

        // Creamos un bloque HTML para cada formulario
        lista.innerHTML += `
            <p><b>${item.nombre}</b></p>
            <p>${item.email}</p>
            <p>${item.asunto}</p>
            <p>${item.mensaje}</p>
            <hr>
        `;
    }
}

// ENVIAR DATOS (POST)
// Cuando se envía el formulario
document.getElementById("formulario").addEventListener("submit", async function(e) {
    // Evita que la página se recargue
    e.preventDefault();

    // Creamos un objeto con los datos del formulario
    const datos = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        asunto: document.getElementById("asunto").value,
        mensaje: document.getElementById("mensaje").value
    };

    // Enviamos los datos al backend
    await fetch("http://localhost:5000/formularios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    // Volvemos a cargar la lista para ver el nuevo mensaje
    cargarDatos();

    // Limpiamos el formulario
    document.getElementById("formulario").reset();
});

// CUANDO ABRE LA PÁGINA
// Cargamos los datos automáticamente al entrar
cargarDatos();