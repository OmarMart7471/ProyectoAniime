
const buscar = (event) =>{

    clearContent();

    let input = event.currentTarget.value

    let inputLower = input.toLowerCase()

    let animeNameMap = animeResults.map(animetitle=>animetitle.titulo)

    let animeNameMapLower = []

    animeNameMap.forEach(element=>{
        let toLower = element.toLowerCase()
        animeNameMapLower.push(toLower)
    })

    let mangaNameMap = mangaResults.map(mangatitle=>mangatitle.titulo)

    let mangaNameMapLower = []

    mangaNameMap.forEach(element=>{
        let toLower = element.toLowerCase()
        mangaNameMapLower.push(toLower)
    })

    let resultsInAnime = animeNameMapLower.filter(resultado=>resultado.includes(inputLower))
    let resultsInManga = mangaNameMapLower.filter(resultado=>resultado.includes(inputLower))
    console.log(resultsInAnime)
    console.log(resultsInManga)

    
    for (let v = 0; v < mangaResults.length; v++) {
        let mElement = mangaResults[v].titulo
        let mMinus = mElement.toLowerCase()
        for (let n = 0; n < resultsInManga.length; n++) {
            let toLowerMangaResult = resultsInManga[n]
            if (toLowerMangaResult==mMinus) {
                let aMangaSearchELement = document.createElement("a")
                    aMangaSearchELement.setAttribute("class","group border border-dark rounded border-3 bg-dark shadow-lg d-grid gap-3")
                let divMangaElement = document.createElement("div")
                    divMangaElement.setAttribute("class","w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8")
                let imgMangaElement = document.createElement("img")
                    imgMangaElement.setAttribute("src",mangaResults[v].imagen)
                    imgMangaElement.setAttribute("class","p-2 w-full h-full object-center object-cover group-hover:opacity-75 d-block mt-3")
                divMangaElement.appendChild(imgMangaElement)
                aMangaSearchELement.appendChild(divMangaElement)
                let h3MangaElement = document.createElement("h3")
                    h3MangaElement.setAttribute("class","p-2 mt-4 text-sm text-white text-center")
                    h3MangaElement.innerText = mangaResults[v].titulo
                aMangaSearchELement.appendChild(h3MangaElement)
                let pMangaELement = document.createElement("p")
                    pMangaELement.setAttribute("class","p-2 mt-1 text-lg font-medium text-white text-center")
                    pMangaELement.innerText = mangaResults[v].titulojapo
                aMangaSearchELement.appendChild(pMangaELement)
                document.querySelector("#main").appendChild(aMangaSearchELement)
            }
            
        }
        
    }

    for (let index = 0; index < animeResults.length; index++) {
        let element = animeResults[index].titulo
        let minus = element.toLowerCase()
        for (let i = 0; i < resultsInAnime.length; i++) {
            let toLowerElement = resultsInAnime[i];
            
            if (toLowerElement==minus) {
                let aAnimeSearchELement = document.createElement("a")
                    aAnimeSearchELement.setAttribute("class","group border border-dark rounded border-3 bg-dark shadow-lg d-grid gap-3")
                let divAnimeElement = document.createElement("div")
                    divAnimeElement.setAttribute("class","w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8")
                let imgAnimeElement = document.createElement("img")
                    imgAnimeElement.setAttribute("src",animeResults[index].imagen)
                    imgAnimeElement.setAttribute("class","p-2 w-full h-full object-center object-cover group-hover:opacity-75 d-block mt-3")
                divAnimeElement.appendChild(imgAnimeElement)
                aAnimeSearchELement.appendChild(divAnimeElement)
                let h3AnimeElement = document.createElement("h3")
                    h3AnimeElement.setAttribute("class","p-2 mt-4 text-sm text-white text-center")
                    h3AnimeElement.innerText = animeResults[index].titulo
                aAnimeSearchELement.appendChild(h3AnimeElement)
                let pAnimeELement = document.createElement("p")
                    pAnimeELement.setAttribute("class","p-2 mt-1 text-lg font-medium text-white text-center")
                    pAnimeELement.innerText = animeResults[index].titulojapo
                aAnimeSearchELement.appendChild(pAnimeELement)
                document.querySelector("#main").appendChild(aAnimeSearchELement)
            }
            
        }  
    }

    

    if (input=="") {
        startFetch();
        innerAnimeAditionalContent()
    }
}
document.querySelector("#buscar").addEventListener("keyup",buscar)