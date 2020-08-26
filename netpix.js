// this file is for netpix javascript
function getPopularShows(){
    const fetchPromise = fetch("https://www.episodate.com/api/most-popular?page=1",
    {
        headers:{
            "Accept":"application/json",
        },
    });

    const streamPromise = fetchPromise.then((response)=>response.json());
    console.log(streamPromise);
    streamPromise.then((data)=>insertPopular(data.tv_shows));
};

function insertPopular(data){
    console.log(data);
    let htmlcode ="";
    const addTvShow =(show) =>{
        htmlcode += "<div class='column'>";
        htmlcode += "<div class='popularTvShow'>";
        htmlcode += "<div class='pMiddle'>";
        htmlcode += "<img class='popular-img' src='"+show.image_thumbnail_path+"'>";
        htmlcode += "</div>";
        htmlcode += "</div>";
        htmlcode += "</div>";

    }
    data.forEach(addTvShow);
    document.getElementById("popularshows").innerHTML=htmlcode;
}
getPopularShows();