document.getElementById("root").innerHTML = `
    <header>
        <img src="images/YouTube-Logo.png" alt="youtube logo" id="logo">
    </header>
    <div id="search">
        <input type="text" placeholder="Search here..." id="searchBox">
        <button id="searchButton">Search</button>
    </div>
    <div id="searchResults"></div>
`;

function displayResults(data) {
  document.getElementById("searchResults").innerHTML = "";
  var html = ``;
  html += `<div id="video">`;
  data.forEach((element) => {
    const htmlElement = `
        <hr>
        <a href="https://www.youtube.com/watch?v=${element.id.videoId}" target="_new" style="display:block">
            <div class="box">
                <div id="boxThumbnail"><img src=${element.snippet.thumbnails.medium.url} class="thumbnail"></div>
                <div id="boxContent">
                    <h3 id="videoTitle">${element.snippet.title}</h3>
                    <p id="channelName"><strong>${element.snippet.channelTitle}</strong></p>
                    <p id="videoDescreption">${element.snippet.description}</p>
                </div>
            </div>
        </a>`;
    html += htmlElement;
  });
  html += `</div>`;
  document.getElementById("searchResults").innerHTML = html;
}

async function getResponse(searchQuery) {
  const apiKey = "AIzaSyCvvcPQsUcvvadIJEbAmvv22ySLXbk9YvvWWK5Gj5U";
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=20&q=${searchQuery}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  displayResults(data.items);
}

document.getElementById("searchButton").addEventListener("click", function () {
  let searchQuery = document.getElementById("searchBox").value;
  if (searchQuery != null) getResponse(searchQuery);
});
