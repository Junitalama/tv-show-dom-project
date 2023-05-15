//level 350
function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then(function (response) {
      return response.json();
    })
    .then((result) => {
      makePageForEpisodes(result);
    });
}


//level 100
//showing all episodes

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
  image.src = episode.image.medium;

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
allEpisodes = getAllEpisodes();
searchEle = document.querySelector("#search")
searchEle.addEventListener("input", searchEpisode);

function searchEpisode(){
  const searchInput = searchEle.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter(episode => {
      if (episode.name.toLowerCase().includes(searchInput) || episode.summary.toLowerCase().includes(searchInput)){
      return episode;
      }
  })
document.querySelector("#num").innerText = filteredEpisodes.length;
makePageForEpisodes(filteredEpisodes);
}

//level 300
//select bar

let selectEle = document.getElementById("selector");
let optionEle = document.createElement("option")
optionEle.innerText= "Select Episodes";
selectEle.appendChild(optionEle);

allEpisodes.forEach(el => {
let options = document.createElement("option");
options.value = el.name;
options.innerText = `S${el.season.toString().padStart(2, "0")}E${el.number.toString().padStart(2, "0")} - ${el.name} `;

selectEle.appendChild(options);
});
selectEle.addEventListener("change", dropDownMenu);

function dropDownMenu() {
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
}



//footer

let footerEle= document.getElementById("footer");
const footerLink = document.createElement("a");
footerLink.href = "https://www.tvmaze.com/"
footerLink.textContent = "data from tvmaze.com";
footerEle.appendChild(footerLink);

window.onload = setup;




