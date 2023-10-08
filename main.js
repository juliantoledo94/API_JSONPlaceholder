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
        const {name, email, id} = usuarios;
        
        return {name, email, id}
    }))
   
}

//paso 5 (modal) traer la informacion por el atributo de la url.

const getUsuariosInfoFromApi = (id) =>{
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(data =>{
        const{address, phone, website} = data;
        console.log(address, phone, website)
        return {address ,phone, website}
    })
}

const pageContent = document.querySelector("#content")





const createCard = ({name, email, id}) =>`
    <div class="row container m-1">
        <div class="col-sm-6 mb-3 mb-sm-0 container">
            <div class="card" >
                <div class="card-body" user-id="${id}">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${email}</p>
                </div>
            </div>
        </div>

    </div>
`

// pasos para la modal 1 -> la busco del html
const modal = document.querySelector(".modal")


modal.querySelector(".delete").addEventListener("click", ()=>{
    modal.classList.remove("is-active")
});



const renderPage = async () =>{
    const firstPage = await getUsuariosFromApi("users");
    const template = firstPage
    .map(usuario => createCard(usuario))
    .join("")
    pageContent.innerHTML = template
}

//paso 6 construimos el bloque de informacion que va a ir en la modal.

const renderModal = (userInfo) =>{
    console.log(userInfo)
    const {address ,phone, website} = userInfo
    const titleName = modal.querySelector(".modal-card-body-telefono");
    const emailElement = modal.querySelector(".modal-card-body-website");
    const addresList = modal.querySelector(".modal-card-body-address");
    titleName.innerHTML= "Telefono: " + phone;
    emailElement.innerHTML= "Sitio web: " + website;

    const addressItems =`
    DOMICILIO
    <li><strong>Street:</strong> ${address.street}</li>
    <li><strong>suite:</strong> ${address.suite}</li>
    <li><strong>city:</strong> ${address.city}</li>
    <li><strong>zipcode:</strong> ${address.zipcode}</li>
    `
    addresList.innerHTML = addressItems
}


const render = async () =>{
    await renderPage();

    // paso 2 una vez que se renderiza la pagina puedo empezar a trabajar en ella 
    // paso 3 me busco todas las cards (esto sin un for each que las trabaje de a una da error)
    const cards = document.querySelectorAll(".card-body")
    // paso 4 trabajo cada card con el for each y les agrego el atributo para abrirlas
    cards.forEach(card =>{
        card.addEventListener("click", async (event)=>{
            //paso 7 buscamos el id y traemos la informacion de la api para renderizarlo en la modal
            const id = +event.currentTarget.getAttribute("user-id");
            console.log(id)
            const userInfo = await getUsuariosInfoFromApi(id)
            modal.classList.add("is-active")
            renderModal(userInfo)
        })
    })
    
}

render();