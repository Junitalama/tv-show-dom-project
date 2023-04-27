//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
 // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
episodeList.forEach(episode => {
  let divEle = document.createElement("div");
  divEle.className = "card";

  const episodeName =document.createElement("h1");
  episodeName.innerText = episode.name;

  const title = document.createElement("h3");
  title.innerText = `S0${episode.season}E0${episode.number}`;

  const image = document.createElement("img");
  image.src = episode.image["medium"];

  const episodeSummary = document.createElement("p");
  episodeSummary.innerHTML = episode.summary;

  divEle.append(
    episodeName,
    title,
    image,
    episodeSummary
);
  rootElem.append(divEle)
});
}


window.onload = setup;
