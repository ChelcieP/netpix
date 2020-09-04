// home page ------------------------------------------------------------------------------------------------------------
function getPopularShows(){
    const fetchPromise = fetch("https://www.episodate.com/api/most-popular?page=1",
    {
        headers:{
            "Accept":"application/json",
        },
    });

    const streamPromise = fetchPromise.then((response)=>response.json());
    // console.log(streamPromise);
    streamPromise.then((data)=>insertPopular(data.tv_shows));
};

function insertPopular(data){
    let htmlcode ="";
    const addTvShow =(show) =>{
        htmlcode += "<button class='column' onclick='showResult("+show.id+")'>"; 
        // make sure the homepage display is none.
        htmlcode += "<div class='popularTvShow'>";
        htmlcode += "<div class='pMiddle'>";
        htmlcode += "<img class='popular-img' src='"+show.image_thumbnail_path+"'>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</button>";
    }
    data.forEach(addTvShow);
    document.getElementById("popularshows").innerHTML=htmlcode;
}
// search page ----------------------------------------------------------------------------------------------------------------------
function showSearchPage(){
    document.getElementById("homepage").style.display="none";
    document.getElementById("resultPage").style.display="none";
    document.getElementById("searchresults").style.display="block";
}
function getSearchResults(){
    const searchValue = document.getElementById("searchbar").value;
    getTvShows(searchValue);
}

function getTvShows(search){
    const fetchPromise = fetch("https://www.episodate.com/api/search?q="+search,
    {
        headers:{
            "Accept":"application/json",
        },
    });
    const streamPromise = fetchPromise.then((response)=>response.json());
    streamPromise.then((data)=>insertSearchResults(data.tv_shows));
}

function insertSearchResults(data){
    let htmlcode = "";
    const addResult = (show) =>{
        htmlcode +="<div class='searchColumn'>";
        htmlcode +="<div class='searchTvShow'>";
        htmlcode +="<div class='pMiddle'>";
        htmlcode +="<button id='resultButton' class='results' onclick='showResult("+show.id+")'>"+show.name+"</button>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        
    }
    data.forEach(addResult);
    document.getElementById("searchresults").innerHTML = htmlcode;
}

//results page ----------------------------------------------------------------------------------------------------------------------------------------------------------------
function showResult(showId){
    document.getElementById("searchresults").style.display="none";
    document.getElementById("resultPage").style.display="block";
    document.getElementById("homepage").style.display="none";

    document.getElementById("shuffleButton").value = showId;
    getResult(showId);
}
function getResult(showId){
    const fetchPromise = fetch("https://www.episodate.com/api/show-details?q="+showId,
    {
        headers:{
            "Accept":"application/json",
        },
    });
    const streamPromise = fetchPromise.then((response)=>response.json());
    streamPromise.then((data)=>insertResult(data.tvShow));
    
}

function insertResult(data){
    console.log(data);
    const episodes = data.episodes;
    const randomEpisodeNumber = Math.floor(Math.random()*episodes.length);
    const randomEpisode = episodes[randomEpisodeNumber];
    let htmlcode = "";
    let htmldescriptioncode = "";
    htmlcode += "<h2 class ='showTitle'>"+data.name+"</h2>";
    htmlcode += "<h1 class='episodeName'>"+randomEpisode.name+"</h1>";
    htmlcode += " <p class='episodeDate'>"+randomEpisode.air_date+"</p>";
    htmlcode += " <h3 class='episodeSeason'>Season "+randomEpisode.season+" Episode "+randomEpisode.episode+"</h3> ";
    htmldescriptioncode += "<p class='descriptionTitle'>TV Show Description:</p>";
    htmldescriptioncode += "<p class='showDescription'>"+data.description+"</p>";

    document.getElementById("randomepisode").innerHTML = htmlcode;
    document.getElementById("description").innerHTML = htmldescriptioncode;
}

function shuffleButton(){
    const showID = document.getElementById("shuffleButton").value;
    getResult(showID);
}

// main functions ------------------------------------------------------------------------------------------------------------
getPopularShows();
document.getElementById("searchbar").addEventListener("click",showSearchPage);
document.getElementById("searchbar").addEventListener("keyup",getSearchResults);






