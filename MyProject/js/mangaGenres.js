const btnMangaGenres = document.querySelector("#mangaGenres")
let MangaPageGenreList = []
let actualMangaPageGenreList = []

const renderMangaGenderList = (data) =>{

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
        
        for (let n = 0; n < actualMangaPageGenreList.length; n++) {
            
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

btnMangaGenres.addEventListener("click",function(){
    clearContent()
    clearMain()
    searchMangaPageGenreFecth()
    mangaGenresFetch()
    fetchForMangaGenreList()
})

const mangaGenresFetch = () => {
    fetch(`https://api.jikan.moe/v4/genres/manga`)
    .then((response) => response.json())
    .then((data) => renderGenderList(data));
}

//lista con la que obtendremos los generos especificos de la página en un array 
function renderGenderMangaList (data) {

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
            MangaPageGenreList.push(g)
        })
    });


    /*Y tenemos una lista de los géneros que maneja la página
    sin embargo, tendremos elementos repetidos por lo que guardaremos
    la lista de géneros sin repetir  con el siguiente ciclo*/

    //a la lista que ya tenemos hecha...
    MangaPageGenreList.forEach(element => {

        //seleccionamos el elemento actual
        let elemento = element;
 
        /*Si el dato de la lista donde vamos a guardar es diferente  
         del elemento actual entonces guardamos mediante el push
         en caso contrario no se guarda el elemento repetido en la 
         nueva lista*/
        if (!actualMangaPageGenreList.includes(element)) {
            actualMangaPageGenreList.push(elemento);
        }
    });

}

const searchMangaPageGenreFecth = () => {
    fetch(`https://api.jikan.moe/v4/manga`)
    .then((response) => response.json())
    .then((data) =>  renderGenderMangaList(data));
}

const fetchForMangaGenreList = () =>{
    fetch(`https://api.jikan.moe/v4/manga`)
    .then((response) => response.json())
    .then((data) =>  renderMangaGenderList(data));
}

