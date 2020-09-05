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

function refreshPage(){
    location.reload();
}
// search page ----------------------------------------------------------------------------------------------------------------------
function showSearchPage(){
    document.getElementById("homepage").style.display="none";
    document.getElementById("resultPage").style.display="none";
    document.getElementById("searchresults").style.display="flex";
    document.getElementById("close").style.display="block";
}
function getSearchResults(){
    const searchValue = document.getElementById("searchbar").value;
    getTvShows(searchValue);
}

function getTvShows(search){
    console.log(search);
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
        htmlcode += "<div id='resultButton' class='results' onclick='showResult("+show.id+")'>";
        htmlcode += "<img class='searchPicture' src='"+show.image_thumbnail_path+"'/>";
        htmlcode += "<p class='searchResultName'>"+show.name+"</p>";
        // htmlcode +="<button id='resultButton' class='results' onclick='showResult("+show.id+")'><img class='searchPicture' src='"+show.image_thumbnail_path+"'/>"+show.name+"</button>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        
    }
    data.forEach(addResult);
    document.getElementById("searchresults").innerHTML = htmlcode;
}
function closeSearchPage(){
    document.getElementById("homepage").style.display="block";
    document.getElementById("resultPage").style.display="none";
    document.getElementById("searchresults").style.display="none";
    document.getElementById("close").style.display="none";
    document.getElementById("searchbar").value = '';
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
    let htmlimagecode ='';
    let htmlcode = "";
    let htmldescriptioncode = "";
    let htmlBelowButtons = '';
    htmlcode += "<h2 class ='episodeSeason'>Season "+randomEpisode.season+" Episode "+randomEpisode.episode+"</h2>";
    htmlcode += "<h1 class='episodeName'>"+randomEpisode.name+"</h1>";
    htmlcode += "<div class='date-title'>";
    htmlcode += " <h3 class='showTitle'>"+data.name+"</h3> ";
    let dateList = randomEpisode.air_date.split(" ");
    htmlcode += " <p class='episodeDate'>   |    "+dateList[0]+"</p>";
    htmlcode += "</div>";
    htmlcode += "<div class='ratings-country-season'>";
    htmlcode += "<p class='rating'><b>Rating:</b> "+data.rating+"</p>";
    htmlcode += "<p class='country'>"+data.country+"</p>";
    htmlcode += "<p class='seasons'>"+episodes[episodes.length-1].season+" Seasons</p>";
    htmlcode += "</div>";

    htmlBelowButtons += "<p class='network'><b>Network:</b> "+data.network+"</p>";
    let genres = '';
    for(g=0;g<data.genres.length;g++){
        if(g != data.genres.length - 1){
            genres += data.genres[g];
            genres +=", ";
        } else {
            genres += data.genres[g];
        }
    }
    htmlBelowButtons += "<p class='genres'><b>Genres:</b> "+genres+"</p>";

    htmldescriptioncode += "<p class='descriptionTitle'>TV Show Description:</p>";
    htmldescriptioncode += "<p class='showDescription'>"+data.description+"</p>";

    if (data.image_path == "https://static.episodate.com"){
        document.getElementById("resultContent").className = "resultContent-blankPhoto";
    } else{
        document.getElementById("resultContent").className = "resultContent";
        htmlimagecode += "<img src='"+data.image_path+"'/>";
    }
    

    document.getElementById("randomepisode").innerHTML = htmlcode;
    document.getElementById("belowButtons").innerHTML = htmlBelowButtons;
    document.getElementById("description").innerHTML = htmldescriptioncode;
    document.getElementById("showPicture").innerHTML = htmlimagecode;
}

function shuffleButton(){
    const showID = document.getElementById("shuffleButton").value;
    getResult(showID);
}

// main functions ------------------------------------------------------------------------------------------------------------
getPopularShows();
document.getElementById("searchbar").addEventListener("click",showSearchPage);
document.getElementById("header").addEventListener('click',refreshPage);
document.getElementById("close").addEventListener('click',closeSearchPage);






