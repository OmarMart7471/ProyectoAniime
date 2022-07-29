/*
    Para el proceso de mostrar contenido por género se uso un proceso similar pero dividido en varias partes
*/

//seleccionamos el boton con el que se nos mostrarán los genéros
const btnAnimeGenres = document.querySelector("#animeGenres")
//hacemos variables que nos ayudarán posteriormente
let genreArrayList = []
let AnimePageGenreList = []
let AnimePageGenreListID = []
let actualAnimePageGenreList = []
let actualAnimePageGenreListIDs = []

//Este es el método que muesta la lista de contenido por genéro
const renderGenderList = (data) => {

    //con la url del fetch solicitamos los datos

    let genreList = data.data
    

    //creamos los elementos de html que nos mostrarán los géneros
    let divRowElement = document.createElement("div")
        divRowElement.setAttribute("class","row flex-row grow")
    let divColElement = document.createElement("div")
        divColElement.setAttribute("class","col-4")
    divRowElement.appendChild(divColElement)
    let divListGroupElement = document.createElement("div")
        divListGroupElement.setAttribute("id","list-example")
        divListGroupElement.setAttribute("class","list-group d-grid gap-3")
    divColElement.appendChild(divListGroupElement)

    //este ciclo recorrerá la lista de datos que tenemos de la API
    genreList.forEach(genre => {   

        //solicitamos los datos que usaremos para mostrar los botones
        let genreName = genre.name
        let genreID = genre.mal_id 
        let nResults = genre.count


        //este es el elemento que nos guardará los géneros 
        let aListElement = document.createElement("a")
        aListElement.setAttribute("href","#list-item-"+genreID)
        aListElement.innerText = genreName

        /*Este for se encargará de recorrer los datos en la lista ya predeterminada
        y los comparará con los de la entrada que es el forEach, tomará el dato de 
        la lista ya predeterminada y se preguntará si es el mismo dato que tiene 
        con el forEach
        
        si es así entonces se le agregará un borde azul al boton que nos informará que
        la página si maneja el genero de la lista, y en caso contrario dejará el elemento
        con un color gris informando así que solo existe género pero que no se maneja en la lista actual de la página*/
        for (let index = 0; index < actualAnimePageGenreList.length; index++) {
            let checkName = actualAnimePageGenreList[index];
            if (genreName==checkName) {
                aListElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                //aquí se rompe el ciclo para que el for no continúe con los demás elementos 
                index = actualAnimePageGenreList.length
                //console.log("genero actual "+genreName+" y "+checkName+" son iguales")
            }else{
                aListElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-white rounded-pill shadow-lg bg-secondary")
                //console.log("genero actual "+genreName+" y "+checkName+" son diferentes")
            }
            
        }
        //aqui se le agrega cuantos resultados tiene la api con respecto al género
        let spanResultsElement = document.createElement("span")
            spanResultsElement.setAttribute("class","badge bg-primary rounded-pill")
            spanResultsElement.innerText = nResults
        aListElement.appendChild(spanResultsElement)
        divListGroupElement.appendChild(aListElement)

    });
    
    //Scroll donde se mostrarán los datos
    let divColSElement = document.createElement("div")
        divColSElement.setAttribute("class","grid col-8 bg-secondary rounded")
    let divDataScrollELement = document.createElement("div")
        divDataScrollELement.setAttribute("data-bs-spy","scroll")
        divDataScrollELement.setAttribute("data-bs-target","#list-example")
        divDataScrollELement.setAttribute("data-bs-smooth-scroll","#true")
        divDataScrollELement.setAttribute("class","scrollspy-example")
        divDataScrollELement.setAttribute("tabindex","0")

    for (let index = 0; index < actualAnimePageGenreList.length; index++) {
        let genreTitle  = actualAnimePageGenreList[index]
        let h2Element = document.createElement("h2")
        let spaceContent = document.createElement("div")
        h2Element.setAttribute("class","font-bold text-center text-stone-50 text-uppercase fs-1 fw-bold bg-neutral-500 rounded border border-2 border-rose-500 mt-6")
            genreList.forEach(list => {
                let testName = list.name
                if (testName==genreTitle) {
                    let setScrollID = list.mal_id
                    h2Element.setAttribute("id","list-item-"+setScrollID)
                    spaceContent.setAttribute("class","grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6")
                    spaceContent.setAttribute("id","space-content-"+setScrollID)
                }
            })
        h2Element.innerText = genreTitle
        divDataScrollELement.appendChild(h2Element)
        divDataScrollELement.appendChild(spaceContent)
        /*let spaceContent = document.createElement("div")
        spaceContent.setAttribute("class","grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8")
        spaceContent.setAttribute("id","space-content-"+setScrollID)
        divDataScrollELement.appendChild(spaceContent)*/
    }
    divColSElement.appendChild(divDataScrollELement)
    divRowElement.appendChild(divColSElement)
    document.querySelector("#main").appendChild(divRowElement)//fin del elemento que nos mostrará los géneros
}

//lista con la que obtendremos los generos especificos de la página en un array 
function renderGenderAnimeList (data) {

    //iniciamos solicitando los datos de la página
    let list = data.data
    //con un forEach se recorren todos los elementos
    list.forEach(pageElement => {
        //por cada elemento que vayamos recorriendo solicitaremos el genero del mismo
        //y nos lo guardará en un array ya que el mismo atributo de género cuenta con otros atributos
        let genderElement = pageElement.genres
        /*Ahora por cada array que reciba extraeremos unicamente el nombre del género que 
        generará la lista*/
        genderElement.forEach(genderArray =>{
            //se extrae el nombre
            let g = genderArray.name
            //guardamos ese nombre en un array mediante el push
            AnimePageGenreList.push(g)
        })
    });


    /*Y tenemos una lista de los géneros que maneja la página
    sin embargo, tendremos elementos repetidos por lo que guardaremos
    la lista de géneros sin repetir  con el siguiente ciclo*/

    //a la lista que ya tenemos hecha...
    AnimePageGenreList.forEach(element => {

        //seleccionamos el elemento actual
        let elemento = element;
 
        /*Si el dato de la lista donde vamos a guardar es diferente  
         del elemento actual entonces guardamos mediante el push
         en caso contrario no se guarda el elemento repetido en la 
         nueva lista*/
        if (!actualAnimePageGenreList.includes(element)) {
            actualAnimePageGenreList.push(elemento);
        }
    });

}

const renderAnimeGenderList = (data) =>{

    let pageList = data.data

    for (let index = 0; index < pageList.length; index++) {
        
        let actualGenres = []
        let actualGenresIDs = []
        let img = pageList[index].images.jpg.image_url
        let title = pageList[index].title
        let japaneseTitle = pageList[index].title_japanese;


        let genreslistIndex = pageList[index].genres

        genreslistIndex.forEach(genresIndex => {
            let genres = genresIndex.name
            actualGenres.push(genres)
        });

        genreslistIndex.forEach(genresIDIndex => {
            let genresIDs = genresIDIndex.mal_id
            actualGenresIDs.push(genresIDs)
        });


        console.log("generos del elemento "+index+" :"+actualGenres)
        
        for (let n = 0; n < actualAnimePageGenreList.length; n++) {
            
            for (let m = 0; m < actualGenres.length; m++) {
                
                if (actualAnimePageGenreList[n]==actualGenres[m]) {
                    console.log("El elemento "+index+" tiene el género "+actualGenres[m]+"["+actualGenresIDs[m]+"]"+" y se encuentra dentro de la lista")

                    let aELement = document.createElement("a")
                        aELement.setAttribute("class","group border border-dark rounded border-3 bg-dark shadow-lg d-grid gap-3")
                    let divElement = document.createElement("div")
                        divElement.setAttribute("class","w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8")
                    let imgElement = document.createElement("img")
                        imgElement.setAttribute("src",img)
                        imgElement.setAttribute("class","p-2 w-full h-full object-center object-cover group-hover:opacity-75")
                    divElement.appendChild(imgElement)
                    aELement.appendChild(divElement)
                    let h3Element = document.createElement("h3")
                        h3Element.setAttribute("class","p-2 mt-4 text-sm text-white text-center")
                        h3Element.innerText = title
                    aELement.appendChild(h3Element)
                    let pELement = document.createElement("p")
                        pELement.setAttribute("class","p-2 mt-1 text-lg font-medium text-white text-center")
                        pELement.innerText = japaneseTitle
                    aELement.appendChild(pELement)
                document.querySelector("#space-content-"+actualGenresIDs[m]).appendChild(aELement)

                }
                
            }
            
        }
    }
    
}

const clearMain = () =>{
    mainBlock.setAttribute("class","")
}

//evento que está al pendiente de cuando se pulsa al boton
btnAnimeGenres.addEventListener("click",function(){
    clearContent()
    clearMain()
    searchAnimePageGenreFecth()
    animeGenresFetch()
    fetchForAnimeLGenreList()
})

//este fetch hace la consulta de los géneros dados por el API   
const animeGenresFetch = () => {
    fetch(`https://api.jikan.moe/v4/genres/anime`)
    .then((response) => response.json())
    .then((data) => renderGenderList(data));

}

//Este fetch hace la consulta de los géneros que maneja la página
/*Recordemos que el API nos brinda una lista de géneros sin embargo
las listas con las que el api interactúa son 25 por lo que no todos
los generos mostrados en la API son los que aparecen en la página
así que mediante este método sacaremos la lista que nos maneja
la página*/
const searchAnimePageGenreFecth = () => {
    fetch(`https://api.jikan.moe/v4/anime`)
    .then((response) => response.json())
    .then((data) =>  renderGenderAnimeList(data));

}

const fetchForAnimeLGenreList = () =>{
    fetch(`https://api.jikan.moe/v4/anime`)
    .then((response) => response.json())
    .then((data) =>  renderAnimeGenderList(data));
}

