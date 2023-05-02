const allEpisodes = getAllEpisodes();
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

//level 100

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  for(let episode of episodeList) {
  let divEle = document.createElement("div");
  divEle.className = "card";

  const episodeName =document.createElement("h1");
  episodeName.innerText = episode.name;

  const title = document.createElement("h4");
  title.innerText = `S${(String(episode.season).padStart(2,'0'))}E${String(episode.number).padStart(2,'0')}`;
  const lineEle = document.createElement("div");
  lineEle.className = "l";
  title.appendChild(lineEle);

  const image = document.createElement("img");
  image.src = episode.image["medium"];

  const episodeSummary = document.createElement("p");
  episodeSummary.innerHTML = episode.summary;


  divEle.append(
    episodeName,
    title,
    image,
    episodeSummary,
    
    
);
  rootElem.append(divEle)
};
}
window.onload = setup;
//level 200

 document.querySelector("#search").addEventListener("input", searchText);

function searchText(){
  
  const searchInput = document.querySelector("#search").value.toLowerCase();
  const  filteredEpisodes = allEpisodes.filter(episode => {
      if (episode.name.toLowerCase().includes(searchInput) || episode.summary.toLowerCase().includes(searchInput)){
       return episode;
        
      }
  })
  
 
  
  allEpisodes.innerHTML = "";
  document.querySelector("#quantity").innerText = filteredEpisodes.length;
  filteredEpisodes.forEach(episode => makePageForEpisodes(episode));
}

//level 300

 selectEle = document.querySelector("#selector");
optionEle = document.createElement("option");
 optionEle.innerText = "Select episodes";
selectEle.appendChild(optionEle);

function optionList (list) {
    const selectList = [];

    for (let item of list){
      let listItem = {};
      listItem.name = item.name;
      listItem.episodeCode = `S${String(item.season).padStart(2, "0")}E${String(item.number).padStart(2, "0")}`;
      selectList.push(listItem);
    }
    return selectList;
}

const options = optionList(allEpisodes);

options.forEach(item => {
  let optionValue = document.createElement("option");
  optionValue.innerText = `${item.episodeCode} - ${item.name}`;

  document.querySelector("#selector").appendChild(optionValue);
})


