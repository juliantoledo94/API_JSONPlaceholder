/*
Crear una página index.html para mostrar una lista de usuarios.
Utilizar la API JSONPlaceholder (https://jsonplaceholder.typicode.com/users) para obtener una lista de usuarios.
Mostrar el nombre y el correo electrónico de cada usuario en la página principal.
Cuando se hace clic en un usuario, abrir un modal con más detalles del usuario, como la dirección y el número de teléfono.
 
*/

const getUsuariosFromApi = () =>{
    return fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(response => response.json())
    .then( data => data.map((usuarios)=> {
        const {name, email} = usuarios;
        console.log(name, email)
        return {name, email}
    }))
    /*
    .then(data => {
        const nombres = data.map(usuario => usuario.name);
        console.log(nombres); // Imprime un array con los nombres
        return nombres; // Si deseas devolver los nombres para usarlos en otro lugar
    });
    * */
}

getUsuariosFromApi();