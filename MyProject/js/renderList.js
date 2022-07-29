let animeResults = []
let mangaResults = []
let resultadosAnime = []
let resultadosManga = []

//extraemos las variables necesarias para usar mediante id
const animeList = document.getElementById("main")
const btnanime = document.getElementById("anime")

const renderPageMangaList = (data) =>{
    let mangas = data.data;
    console.log(mangas)
    //mangaResults.push(mangas)
    mangas.forEach(mangaElement => {
        let anime = {
            imagen: mangaElement.images.jpg.image_url,
            titulo: mangaElement.title,
            titulojapo: mangaElement.title_japanese
        }
        mangaResults.push(anime)
    });
}

//método que se encarga de procesar los datos del API
const renderList = (data) =>{

    //solicitamos los datos
    let animes = data.data;

    //animeResults.push(animes)
    
    animes.forEach(animeElement => {
        let anime = {
            imagen: animeElement.images.jpg.image_url,
            titulo: animeElement.title,
            titulojapo: animeElement.title_japanese
        }
        animeResults.push(anime)
    });

    //por cada dato extraido...
    animes.forEach((anime) => {
   
       //solicitamos las variables que usaremos para mostrar la lista
        let img = anime.images.jpg.image_url;
        let title = anime.title;
        let japaneseTitle = anime.title_japanese;
        let id = anime.mal_id

        //código que se irá a html para mostrar la lista
        //nota: se uso tailwind 
        let aELement = document.createElement("a")
        aELement.setAttribute("class","group border border-dark rounded border-3 bg-dark shadow-lg d-grid gap-3")
        let divElement = document.createElement("div")
        divElement.setAttribute("class","w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8")
                let imgElement = document.createElement("img")
                imgElement.setAttribute("src",img)
                imgElement.setAttribute("class","p-2 w-full h-full object-center object-cover group-hover:opacity-75 d-block mt-3")
                imgElement.setAttribute("href","#sidebar-"+id)
                imgElement.setAttribute("data-bs-toggle","offcanvas")
                imgElement.setAttribute("role","button")
                imgElement.setAttribute("aria-controls","sidebar")  
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
        document.querySelector("#main").appendChild(aELement)


            let offcanvasdivELement = document.createElement("div")
                offcanvasdivELement.setAttribute("class","offcanvas offcanvas-start text-bg-dark bg-dark drop-shadow-2xl")

                offcanvasdivELement.setAttribute("tabindex","-1")
                offcanvasdivELement.setAttribute("id","sidebar-"+id)
            offcanvasdivELement.setAttribute("aria-labelledby","sidebar-label")

                let offcanvasHeaderdivELement = document.createElement("div")
                    offcanvasHeaderdivELement.setAttribute("class","offcanvas-header mw-100 justify-center mt-4")
                offcanvasdivELement.appendChild(offcanvasHeaderdivELement)
                
                    let h5HeaderElement = document.createElement("h5")
                        h5HeaderElement.setAttribute("class","offcanvas-title fs-1 fw-bold text-center uppercase")
                        h5HeaderElement.setAttribute("id","sidebar-label")
                        h5HeaderElement.innerText = title
                    offcanvasHeaderdivELement.appendChild(h5HeaderElement)

                let offcanvasBodyElement = document.createElement("div")
                    offcanvasBodyElement.setAttribute("class","offcanvas-body p-3")
                    offcanvasBodyElement.setAttribute("id","anime-body-"+id)
                
                offcanvasdivELement.appendChild(offcanvasBodyElement)

            document.querySelector("#main").appendChild(offcanvasdivELement)
    });
};

const renderMangalist = () =>{
    fetch(`https://api.jikan.moe/v4/manga`)
    .then((response) => response.json())
    .then((data) => renderPageMangaList(data));
}

//fetch que nos mostrara al inicio los animes  
const startFetch = () =>{
    fetch(`https://api.jikan.moe/v4/anime`)
    .then((response) => response.json())
    .then((data) => renderList(data));
}

const renderAditionalAnimeContent = (data) =>{

    let animesData = data.data;

    animesData.forEach((animeData)=>{

        let embed = "https://www.youtube.com/embed/"
        let video = animeData.trailer.youtube_id
        let sipnosis = animeData.synopsis
        let episodios = animeData.episodes
        let tipo = animeData.type
        let rating = animeData.rating
        let puntuacion = animeData.score
        let themes = animeData.themes
        let actualID = animeData.mal_id

        let themesList = []

        themes.forEach((theme)=>{
            let actualTheme = theme.name
            themesList.push(actualTheme)
        })

        if (video!=null) {
            let iframeELement = document.createElement("iframe")
            iframeELement.setAttribute("class","w-full aspect-[4/3] p-2")
            iframeELement.setAttribute("src",embed+video)
            document.querySelector("#anime-body-"+actualID).appendChild(iframeELement)
            
        }

        let divAnimeInfoELement = document.createElement("div")
        divAnimeInfoELement.setAttribute("class","grid gap-3 grid-cols-1 content-center")
        document.querySelector("#anime-body-"+actualID).appendChild(divAnimeInfoELement)

        let aTypeListElement = document.createElement("a")
        aTypeListElement.setAttribute("id","type-"+tipo)
        aTypeListElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
        aTypeListElement.innerText = "TIPO:"
        let spanTypeResultsElement = document.createElement("span")
            spanTypeResultsElement.setAttribute("class","badge bg-info rounded-pill")
            spanTypeResultsElement.innerText = tipo
        aTypeListElement.appendChild(spanTypeResultsElement)
        divAnimeInfoELement.appendChild(aTypeListElement)

        let aScoreElement = document.createElement("a")
            aScoreElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
            aScoreElement.innerText= "PUNTUACIÓN:"
        let spanScoreElement = document.createElement("span")
            spanScoreElement.setAttribute("class","badge bg-warning rounded-pill")
            spanScoreElement.innerText = puntuacion+"/10"
        aScoreElement.appendChild(spanScoreElement)
        divAnimeInfoELement.appendChild(aScoreElement)

        let aRatingElement = document.createElement("a")
            aRatingElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
            aRatingElement.innerText= "RATING:"
        let spanRatinglement = document.createElement("span")
            spanRatinglement.setAttribute("class","badge bg-success rounded-pill")
            spanRatinglement.innerText = rating
        aRatingElement.appendChild(spanRatinglement)
        divAnimeInfoELement.appendChild(aRatingElement)

        let aEpisodesElement = document.createElement("a")
            aEpisodesElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
            aEpisodesElement.innerText= "EPISODIOS:"
        let spanEpisodesElement = document.createElement("span")
            spanEpisodesElement.setAttribute("class","badge bg-danger rounded-pill")
            spanEpisodesElement.innerText = episodios
        aEpisodesElement.appendChild(spanEpisodesElement)
        divAnimeInfoELement.appendChild(aEpisodesElement)

        let divAnimeSipnosisELement = document.createElement("div")
        divAnimeSipnosisELement.setAttribute("class","grid gap-3 grid-cols-1 content-center")
        document.querySelector("#anime-body-"+actualID).appendChild(divAnimeSipnosisELement)

        let h2SipnosisElement = document.createElement("h2")
            h2SipnosisElement.setAttribute("class","fs-3 fw-bolder text-warning text-center gap-4")
            h2SipnosisElement.innerText = "SIPNOSIS (english) :"
        divAnimeInfoELement.appendChild(h2SipnosisElement)

        let pSipnosisElement = document.createElement("p")
            pSipnosisElement.setAttribute("class","p-5 first-letter:float-left first-letter:mr-4 first-letter:text-7xl break-words text-justify font-serif")
            pSipnosisElement.innerText = sipnosis
        divAnimeInfoELement.appendChild(pSipnosisElement)

        if (themesList.length!=0) {

            let divAnimeThemesELement = document.createElement("div")
                divAnimeThemesELement.setAttribute("class","grid gap-3 grid-cols-1 content-center")
            document.querySelector("#anime-body-"+actualID).appendChild(divAnimeThemesELement)

            let h2ThemesTitleElement = document.createElement("h2")
                h2ThemesTitleElement.setAttribute("class","fs-3 fw-bolder text-green-400 text-center gap-4")
                h2ThemesTitleElement.innerText = "SUBGÉNEROS:"
            divAnimeThemesELement.appendChild(h2ThemesTitleElement)

            let divSubgenresElements =  document.createElement("div")
                divSubgenresElements.setAttribute("class","grid gap-3 grid-cols-1 content-center")
            divAnimeThemesELement.appendChild(divSubgenresElements)
            themesList.forEach(themeElement =>{
                let aThemeElement =document.createElement("a")
                    aThemeElement.setAttribute("class","list-group-item d-flex p-1 justify-content-center align-items-center p-3 border-red-500 text-slate-50 font-semibold rounded-pill shadow-lg bg-amber-500")
                    aThemeElement.innerText = themeElement
                divSubgenresElements.appendChild(aThemeElement)
            })
        }

        

    })
}

const innerAnimeAditionalContent = () =>{
    fetch(`https://api.jikan.moe/v4/anime`)
    .then((response) => response.json())
    .then((data) => renderAditionalAnimeContent(data)); 
}

//funcion de mostrar la lista de animes al iniciar la página
startFetch();
renderMangalist()
innerAnimeAditionalContent()
console.log(animeResults)
console.log(mangaResults)

//en caso que le demos click al boton anime nos volverá a cargar la lista
btnanime.onclick = function(){
    restoreMain()
    clearContent();
    startFetch();
    innerAnimeAditionalContent()
}








