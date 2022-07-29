/*
El proceso para mostrar las tendencias es exactamente el mismo 
simplemente se cambia directamente el url del fetch y nuevamente
limpiamos el main
*/

const btnTopAnime = document.getElementById("topAnime")
const topAnimeFetch = () => {
    fetch(`https://api.jikan.moe/v4/top/anime`)
    .then((response) => response.json())
    .then((data) => renderList(data)); 
}
btnTopAnime.onclick = function(){
    restoreMain()
    clearContent()
    topAnimeFetch()
    innerTopAnimeAditionalContent()
}

const btnTopManga = document.querySelector("#topManga")
const topMangaFetch = () => {
    fetch(`https://api.jikan.moe/v4/top/manga`)
    .then((response) => response.json())
    .then((data) => renderList(data)); 
}

btnTopManga.addEventListener("click",function(){
    restoreMain()
    clearContent()
    topMangaFetch()
    innerTopMangaAditionalContent()
})

const innerTopAnimeAditionalContent = () =>{
    fetch(`https://api.jikan.moe/v4/top/anime`)
    .then((response) => response.json())
    .then((data) => renderAditionalAnimeContent(data)); 
}

const innerTopMangaAditionalContent = () =>{
    fetch(`https://api.jikan.moe/v4/top/manga`)
    .then((response) => response.json())
    .then((data) => renderAditionalMangaContent(data)); 
}