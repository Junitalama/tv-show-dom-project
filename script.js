//level 400

const allShows = getAllShows()
function setup() {
makePageForShow(allShows);
};

function makePageForShow(shows){
  let showsEle = document.getElementById("show_div");
  showsEle.innerHTML = "";
  for (let show of shows){
  const divEle = document.createElement ("div");
  divEle.className = "show_card";
    
  const firstDiv = document.createElement("div")
  firstDiv.className = "first"
  const showName =document.createElement("h1");
  showName.innerText = show.name;
  firstDiv.append(showName);

  const image = document.createElement("img");
  image.className = "image_1";
  if(show.image){
  image.src = show.image.medium;}
  firstDiv.append(image);

  const secondDiv = document.createElement("div")
  secondDiv.className = "second";
  const showSummary = document.createElement("p");
  showSummary.className = "summary";
  showSummary.innerHTML = show.summary;
  secondDiv.append(showSummary);

  const thirdDiv = document.createElement("div")
   thirdDiv.className = "third";
   const ratingEle = document.createElement("P");
   ratingEle.innerText = `Rated : ${show.rating.average}`
   thirdDiv.appendChild(ratingEle);

   const genreEle = document.createElement("p");
   genreEle.innerText = `Genres : ${show.genres}`;
   thirdDiv.appendChild(genreEle);

   const statusEle = document.createElement("p");
   statusEle.innerText = `Status : ${show.status}`;
   thirdDiv.appendChild(statusEle);

   const runTimeEle = document.createElement("p");
   runTimeEle.innerText = `Runtime : ${show.runtime}`;
   thirdDiv.appendChild(runTimeEle);


divEle.append(firstDiv,secondDiv,thirdDiv);
showsEle.appendChild(divEle);
    }

}


window.onload = setup;

allShows.sort(function (a, b) {
    return a.name.localeCompare(b.name); 
  });

 
let showEle = document.getElementById("select-show");
let optionEle = document.createElement("option");
optionEle.innerText = "Select a show";
showEle.appendChild(optionEle);

function showsList() {
  allShows.forEach((show) => {
    let option = document.createElement("option");
    option.innerText = show.name;
    showEle.appendChild(option);
  });
}
showsList();


showEle.addEventListener("change", selectAShow);
function selectAShow() {
  const showName = showEle.value;
  const selectedShow = allShows.filter((show) => showName === show.name);
  const showId = selectedShow[0].id;
  

  
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      makePageForShow(result);
      let showsEle = document.getElementById("show_div");
      showsEle.innerHTML = "";
      makePageForEpisodes(result);
      selectMenu(result);
      searchBar(result);
    })
    .catch((error) => {
      console.log(error);
    });
}
//

//showing all episodes
headerEle = document.getElementById("header");
imgEle = document.createElement("img");
imgEle.src = "https://iptvwire.com/wp-content/uploads/2022/07/how-to-watch-live-tv-on-firestick-free.png"
imgEle.className = "tv_img";
pEle = document.createElement("p");
pEle.innerText = "tvZone";
pEle.className = "welcome";

headerEle.append(imgEle, pEle);

//level 100
function makePageForEpisodes(episodeList) {
  let rootElem = document.getElementById("root");
 // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
 rootElem.innerHTML = "";
  for(let episode of episodeList) {
  let divEle = document.createElement("div");
  divEle.className = "card";

  const episodeName =document.createElement("h1");
  episodeName.innerText = `${episode.name} - S${(String(episode.season).padStart(2,'0'))}E${String(episode.number).padStart(2,'0')}`;
  const lineEle = document.createElement("div");
  lineEle.className = "l";
  

  const image = document.createElement("img");
  if(episode.image){
  image.src = episode.image.medium;}

  const episodeSummary = document.createElement("p");
  episodeSummary.innerHTML = episode.summary;

divEle.append(
  episodeName,
  lineEle,
  image,
  episodeSummary,
  );
  rootElem.append(divEle)
};

}
//window.onload = setup;

//level 200
//search bar
//allEpisodes = getAllEpisodes();
function searchBar(allEpisodes){
searchEle = document.querySelector("#search")
searchEle.addEventListener("input", function searchEpisode(){
  const searchInput = searchEle.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(episode => {
    if (episode.name.toLowerCase().includes(searchInput) || episode.summary.toLowerCase().includes(searchInput)){
    return episode;
  }
  })
document.querySelector("#num").innerText = filteredEpisodes.length;
makePageForEpisodes(filteredEpisodes);
})
}

//level 300
//select bar
function selectMenu (allEpisodes){
let selectEle = document.getElementById("selector");
selectEle.innerHTML = "";
let optionEle = document.createElement("option")
optionEle.innerText= "Select Episodes";
selectEle.appendChild(optionEle);

allEpisodes.forEach(el => {
  let options = document.createElement("option");
  options.value = el.name;
  options.innerText = `S${el.season.toString().padStart(2, "0")}E${el.number.toString().padStart(2, "0")} - ${el.name} `;
  selectEle.appendChild(options);
});
selectEle.addEventListener("change", function dropDownMenu() {
  let selectedEpisode = selectEle.value;

  const filterEpisodes = allEpisodes.filter((episode) => {
    if (
      episode.name.includes(
        selectedEpisode || episode.summary.includes(selectedEpisode)
      )
    ) {
      return episode;
    } else if (selectedEpisode == optionEle.innerText) {
      return allEpisodes;
    }
  });
  
  document.getElementById("num").innerText = filterEpisodes.length;
  makePageForEpisodes(filterEpisodes);
})
}




//footer
let footerEle= document.getElementById("footer");
const footerLink = document.createElement("a");
footerLink.href = "https://www.tvmaze.com/"
footerLink.textContent = "data from tvmaze.com";
footerEle.appendChild(footerLink);


