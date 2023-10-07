/*
Crear una página index.html para mostrar una lista de usuarios.
Utilizar la API JSONPlaceholder (https://jsonplaceholder.typicode.com/users) para obtener una lista de usuarios.
Mostrar el nombre y el correo electrónico de cada usuario en la página principal.
Cuando se hace clic en un usuario, abrir un modal con más detalles del usuario, como la dirección y el número de teléfono.
 
*/

const getUsuariosFromApi = (endpoint) =>{
    return fetch(`https://jsonplaceholder.typicode.com/${endpoint}`)
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


const pageContent = document.querySelector("#content")

const createCard = ({name, email}) =>`
    <div class="row container m-1" ">
        <div class="col-sm-6 mb-3 mb-sm-0 container">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${email}</p>
                </div>
            </div>
        </div>

    </div>
`

const renderPage = async () =>{
    const firstPage = await getUsuariosFromApi("users");
    const template = firstPage
    .map(usuario => createCard(usuario))
    .join("")
    pageContent.innerHTML = template
}


renderPage();