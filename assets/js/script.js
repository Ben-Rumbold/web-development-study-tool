const youtubeAPIkey = "AIzaSyASRVTIz4SSVmUIFEnAiuaJqLwH8XwuyVg"; //Youtube API
const searchInputEl = $("#search-input"); // search input element
const searchQuery = searchInputEl.val(); // search input value
const searchBtnEl = $("#search-btn"); // search button element
const youtubeIframeContainer = $("#youtube-iframe");
const wikiContainer = $("#wiki-container");

searchBtnEl.click(function (event) {
  // ----- search input value test -----
  event.preventDefault();
  const searchQuery = searchInputEl.val();
  console.log(`User has inputted: "${searchQuery}"`);

  // ---------- search youtube section ----------
  var youtubeQueryUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIkey}&q=${searchQuery}`;

  fetch(youtubeQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Parse the response and retrieve the title of the videos
      const videoId = data.items[0].id.videoId;
      const videoURL = `https://youtube.com/watch?v=${videoId}`;
      console.log(videoURL);
      youtubeIFrame(videoId); //call function
      //   const test = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${APIkey}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // function to create Youtube Iframe
  function youtubeIFrame(vidID) {
    const iframe = `<iframe
         width="500"
         height="300"
         class="p-4"
         src="https://www.youtube.com/embed/${vidID}"
         title="YouTube video player"
         frameborder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         allowfullscreen
       ></iframe>`;

    youtubeIframeContainer.append(iframe);
  }

  // ---------- search wiki function ----------
  function searchWiki() {
    var wikiQueryUrl = `https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${encodeURIComponent(
      searchQuery
    )}`;
    // console.log(wikiQueryUrl); // test
    fetch(wikiQueryUrl)
      .then((wikiResponse) => wikiResponse.json())
      .then((wikiData) => {
        displayWikiResults(wikiData.query.search);
      })
      .catch((wikiError) => alert("Error" + wikiError));
  }

  // ---------- display wiki results ----------
  function displayWikiResults(wikiResults) {
    wikiContainer.empty(); // Clear the content of the container

    $.each(wikiResults, function (index, result) {
      const wikiResultElement = $("<div>").addClass("wikiElContainer");
      wikiResultElement.html(
        `<h3>${result.title}</h3><p>${result.snippet}</p><a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" class="btn btn-outline-success" role="button">Read More</a>`
      );
      wikiContainer.append(wikiResultElement);
    });
  }

  searchWiki();
});

//daria feature//