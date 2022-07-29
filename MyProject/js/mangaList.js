//seleccionamos el id y el boton
const mainBlock = document.querySelector("#main")
const btnManga = document.getElementById("manga")

//método que limpia el contenido del main
const clearContent = () =>{
    mainBlock.innerHTML="";
}

const renderAditionalMangaContent = (data) =>{

    let mangasData = data.data;

   mangasData.forEach((mangaData)=>{

        //let title = mangaData.title
        let images = mangaData.images.webp.image_url
        let actualID = mangaData.mal_id
        let sipnosisManga = mangaData.synopsis
        let capitulos = mangaData.chapters
        let volumenes  = mangaData.volumes
        let diaInicio = mangaData.published.prop.from.day
        let mesInicio = mangaData.published.prop.from.month
        let anioInicio = mangaData.published.prop.from.year
        let fechaInicio = diaInicio+"/"+mesInicio+"/"+anioInicio
        let diaFin = mangaData.published.prop.to.day
        let mesFin = mangaData.published.prop.to.month
        let anioFin = mangaData.published.prop.to.year
        let fechaTermino = diaFin+"/"+mesFin+"/"+anioFin
        let puntaje = mangaData.score
        let actualElementAuthors = []
        let autores = mangaData.authors
        let actualElementThemes = []
        let mangaThemes = mangaData.themes
        let actualElementDemographics = []
        let mangaDemographics = mangaData.demographics

        //obtenemos las listas de los elementos que son un arreglo

        autores.forEach(autor=>{
            actualElementAuthors.push(autor.name)
        })

        mangaDemographics.forEach(demo=>{
            actualElementDemographics.push(demo.name)
        })

        mangaThemes.forEach(theme=>{
            actualElementThemes.push(theme.name)
        })

        let imageDiv = document.createElement("div")
            imageDiv.setAttribute("class","flex justify-center object-none object-center p-3")
        document.querySelector("#anime-body-"+actualID).appendChild(imageDiv)
       
        let imgElement = document.createElement("img")
            imgElement.setAttribute("src",images)
            imgElement.setAttribute("class","group-hover:opacity-75 d-block rounded-lg")
        imageDiv.appendChild(imgElement)

        let divAnimeInfoELement = document.createElement("div")
        divAnimeInfoELement.setAttribute("class","grid gap-3 grid-cols-1 content-center")
        document.querySelector("#anime-body-"+actualID).appendChild(divAnimeInfoELement)
        
        if (capitulos!=null) {
            let aChaptersElement = document.createElement("a")
                aChaptersElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aChaptersElement.innerText = "CAPITULOS:"
            let spanChaptersResultsElement = document.createElement("span")
                spanChaptersResultsElement.setAttribute("class","badge bg-info rounded-pill")
                spanChaptersResultsElement.innerText = capitulos
            aChaptersElement.appendChild(spanChaptersResultsElement)
            divAnimeInfoELement.appendChild(aChaptersElement)
        }else{
            let aChaptersElement = document.createElement("a")
                aChaptersElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aChaptersElement.innerText = "CAPITULOS:"
            let spanChaptersResultsElement = document.createElement("span")
                spanChaptersResultsElement.setAttribute("class","badge bg-info rounded-pill")
                spanChaptersResultsElement.innerText = "En emisión/Sin registro"
            aChaptersElement.appendChild(spanChaptersResultsElement)
            divAnimeInfoELement.appendChild(aChaptersElement)
        }

        if (volumenes!=null) {
            let aVolumesElement = document.createElement("a")
                aVolumesElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aVolumesElement.innerText = "VOLUMENES:"
            let spanVolumesResultElement = document.createElement("span")
                spanVolumesResultElement.setAttribute("class","badge bg-success rounded-pill")
                spanVolumesResultElement.innerText = volumenes
            aVolumesElement.appendChild(spanVolumesResultElement)
            divAnimeInfoELement.appendChild(aVolumesElement)
        }else{
            let aVolumesElement = document.createElement("a")
                aVolumesElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aVolumesElement.innerText = "VOLUMENES:"
            let spanVolumesResultElement = document.createElement("span")
                spanVolumesResultElement.setAttribute("class","badge bg-success rounded-pill")
                spanVolumesResultElement.innerText = "En emisión/Sin registro"
            aVolumesElement.appendChild(spanVolumesResultElement)
            divAnimeInfoELement.appendChild(aVolumesElement)
        }

        if (fechaInicio!="null/null/null") {
            let aStartDateElement = document.createElement("a")
                aStartDateElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aStartDateElement.innerText = "FECHA DE INICIO:"
            let spanStartDateREsultElement = document.createElement("span")
                spanStartDateREsultElement.setAttribute("class","badge bg-secondary rounded-pill")
                spanStartDateREsultElement.innerText = fechaInicio
            aStartDateElement.appendChild(spanStartDateREsultElement)
            divAnimeInfoELement.appendChild(aStartDateElement)
        }else{
            let aStartDateElement = document.createElement("a")
                aStartDateElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aStartDateElement.innerText = "FECHA DE INICIO:"
            let spanStartDateREsultElement = document.createElement("span")
                spanStartDateREsultElement.setAttribute("class","badge bg-secondary rounded-pill")
                spanStartDateREsultElement.innerText = "Sin registro"
            aStartDateElement.appendChild(spanStartDateREsultElement)
            divAnimeInfoELement.appendChild(aStartDateElement)
        }

        if (fechaTermino!="null/null/null") {
            let aEndDateElement = document.createElement("a")
                aEndDateElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aEndDateElement.innerText = "FECHA DE TERMINO:"
            let spanEndDateREsultElement = document.createElement("span")
                spanEndDateREsultElement.setAttribute("class","badge bg-danger rounded-pill")
                spanEndDateREsultElement.innerText = fechaTermino
            aEndDateElement.appendChild(spanEndDateREsultElement)
            divAnimeInfoELement.appendChild(aEndDateElement)
        }else{
            let aEndDateElement = document.createElement("a")
                aEndDateElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aEndDateElement.innerText = "FECHA DE TERMINO:"
            let spanEndDateREsultElement = document.createElement("span")
                spanEndDateREsultElement.setAttribute("class","badge bg-danger rounded-pill")
                spanEndDateREsultElement.innerText = "Sin registro o en emisión"
            aEndDateElement.appendChild(spanEndDateREsultElement)
            divAnimeInfoELement.appendChild(aEndDateElement)
        }

        let aScoreElement = document.createElement("a")
                aScoreElement.setAttribute("class","list-group-item d-flex list-group-item-action justify-content-between align-items-center text-bg-dark p-3 border border-2 border-primary rounded-pill shadow-lg bg-dark")
                aScoreElement.innerText = "PUNTUACIÓN:"
        let spanScoreResultElement = document.createElement("span")
            spanScoreResultElement.setAttribute("class","badge bg-primary rounded-pill")
            spanScoreResultElement.innerText = puntaje+"/10"
        aScoreElement.appendChild(spanScoreResultElement)
        divAnimeInfoELement.appendChild(aScoreElement)

        let divMangaSipnosisElement = document.createElement("div")
        divMangaSipnosisElement.setAttribute("class","grid gap-3 grid-cols-1 content-center p-3")
        document.querySelector("#anime-body-"+actualID).appendChild(divMangaSipnosisElement)

        let h2SipnosisElement = document.createElement("h2")
            h2SipnosisElement.setAttribute("class","fs-3 fw-bolder text-warning text-center gap-4")
            h2SipnosisElement.innerText = "SIPNOSIS (english) :"
        divAnimeInfoELement.appendChild(h2SipnosisElement)

        let pSipnosisElement = document.createElement("p")
            pSipnosisElement.setAttribute("class","p-5 first-letter:float-left first-letter:mr-4 first-letter:text-7xl break-words text-justify font-serif")
            pSipnosisElement.innerText = sipnosisManga
        divAnimeInfoELement.appendChild(pSipnosisElement)

        if (actualElementAuthors.length!=0) {
            let divMangaAutorsElement  = document.createElement("div")
                divMangaAutorsElement .setAttribute("class","grid gap-3 grid-cols-1 content-center")
            document.querySelector("#anime-body-"+actualID).appendChild(divMangaAutorsElement )

            let h2AutorsElement = document.createElement("h2")
                h2AutorsElement.setAttribute("class","fs-3 fw-bolder text-green-400 text-center gap-4")
                h2AutorsElement.innerText = "AUTORES:"
            divMangaAutorsElement .appendChild(h2AutorsElement)

            let divAutorsElements =  document.createElement("div")
                divAutorsElements.setAttribute("class","grid gap-3 grid-cols-1 content-center p-3")
            divMangaAutorsElement .appendChild(divAutorsElements)
            actualElementAuthors.forEach(autorName =>{
                let aAutorELement =document.createElement("a")
                    aAutorELement.setAttribute("class","list-group-item d-flex p-1 justify-content-center align-items-center p-3 border-red-500 text-slate-50 font-semibold rounded-pill shadow-lg bg-amber-500")
                    aAutorELement.innerText = autorName
                divAutorsElements.appendChild(aAutorELement)
            })
        }

        if (actualElementDemographics.length!=0) {
            let divMangaDemoElement  = document.createElement("div")
                divMangaDemoElement .setAttribute("class","grid gap-3 grid-cols-1 content-center p-3")
            document.querySelector("#anime-body-"+actualID).appendChild(divMangaDemoElement )

            let h2DemoElement = document.createElement("h2")
                h2DemoElement.setAttribute("class","fs-3 fw-bolder text-cyan-400 text-center gap-4")
                h2DemoElement.innerText = "DEMOGRAFÍA:"
            divMangaDemoElement .appendChild(h2DemoElement)

            let divDemoElements =  document.createElement("div")
                divDemoElements.setAttribute("class","grid gap-3 grid-cols-1 content-center")
            divMangaDemoElement .appendChild(divDemoElements)
            actualElementDemographics.forEach(demoName =>{
                let aAutorELement =document.createElement("a")
                    aAutorELement.setAttribute("class","list-group-item d-flex p-1 justify-content-center align-items-center p-3 border-2 border-rose-500 text-slate-50 font-semibold rounded-pill shadow-lg bg-red-600")
                    aAutorELement.innerText = demoName
                divDemoElements.appendChild(aAutorELement)
            })
        }

        if (actualElementThemes.length!=0) {
            let divMangaThemeElement  = document.createElement("div")
                divMangaThemeElement .setAttribute("class","grid gap-3 grid-cols-1 content-center p-3")
            document.querySelector("#anime-body-"+actualID).appendChild(divMangaThemeElement )

            let h2ThemeElement = document.createElement("h2")
                h2ThemeElement.setAttribute("class","fs-3 fw-bolder text-violet-300 text-center gap-4")
                h2ThemeElement.innerText = "SUBGÉNEROS:"
            divMangaThemeElement .appendChild(h2ThemeElement)

            let divThemesElements =  document.createElement("div")
                divThemesElements.setAttribute("class","grid gap-3 grid-cols-1 content-center")
            divMangaThemeElement .appendChild(divThemesElements)
            actualElementThemes.forEach(themeName =>{
                let aThemeELement =document.createElement("a")
                    aThemeELement.setAttribute("class","list-group-item d-flex p-1 justify-content-center align-items-center p-3 border-2 border-violet-50 text-slate-50 font-semibold rounded-pill shadow-lg bg-indigo-600")
                    aThemeELement.innerText = themeName
                divThemesElements.appendChild(aThemeELement)
            })
        }

    })
}


//cuando le demos click al boton manga...
btnManga.onclick = function(){
    restoreMain()
    clearContent();
    mangaFecth();
    innerMangaAditionalContent();
}

//fetch correspondiente a la lista del manga
//usando el método renderList para mostrar la lista dentro del main
const mangaFecth = () =>{
    fetch(`https://api.jikan.moe/v4/manga`)
    .then((response) => response.json())
    .then((data) => renderList(data)); 
}

const innerMangaAditionalContent = () =>{
    fetch(`https://api.jikan.moe/v4/manga`)
    .then((response) => response.json())
    .then((data) => renderAditionalMangaContent(data));
}

const restoreMain = () =>{
    mainBlock.setAttribute("class","grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8")
}