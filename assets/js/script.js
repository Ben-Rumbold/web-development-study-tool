// const youtubeAPIkey = "AIzaSyASRVTIz4SSVmUIFEnAiuaJqLwH8XwuyVg"; //Youtube API
const youtubeAPIkey = "AIzaSyCADYUZwbWtM8CDem8pnhmgeQzyc-f76Q8";
const searchInputEl = $("#search-input"); // search input element
const searchQuery = searchInputEl.val(); // search input value
const searchBtnEl = $("#search-btn"); // search button element
const youtubeIframeContainer = $("#youtube-iframe");
const wikiContainer = $("#wiki-container");

// modal function
$(document).ready(function () {
  $("#myModal").modal("show");

  // Handle button clicks
  $("#okayBtn, #closeBtn").on("click", function () {
    $("#myModal").modal("hide");
  });
});

searchBtnEl.click(function (event) {
  // ----- search input value test -----
  event.preventDefault();
  const searchQuery = searchInputEl.val();
  console.log(`User has inputted: "${searchQuery}"`);
  // ---------- search youtube section ----------
  //
  function getYoutubeAPI() {
    var youtubeQueryUrl = `https://www.googleapis.com/youtube/v3/search?key=${youtubeAPIkey}&q=${searchQuery}`;
    fetch(youtubeQueryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        // Parse the response and retrieve the title of the videos
        const videoId = data.items[0].id.videoId;
        // const getRandom = Math.floor(Math.random() * data.items.length);      //test, not currently working
        // const randomVideo = data.items[getRandom];                            //test, not currently working
        // console.log(randomVideo);                                             //test, not currently working
        const videoURL = `https://youtube.com/watch?v=${videoId}`;
        console.log(videoURL);
        youtubeIFrame(videoId); //call function
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  // function to create Youtube Iframe
  function youtubeIFrame(vidID) {
    // copied the wikipedia display attributes (displayWikiResults) and function structure
    youtubeIframeContainer.empty();
    const youtubeResultElement = $("<div>").addClass("youtubeElContainer");
    youtubeResultElement.html(
      `<iframe
          class=""
          src="https://www.youtube.com/embed/${vidID}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>`
    );
    youtubeIframeContainer.append(youtubeResultElement);
  }

  // ---------- search wiki function ----------
  function searchWiki() {
    var wikiQueryUrl = `https://en.wikipedia.org/w/api.php?&action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=1&srsearch=${encodeURIComponent(
      searchQuery
    )}`;
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
  //calling the functions//
  getYoutubeAPI();
  searchWiki();
});

// footer live year dayJS
$(function () {
  let year = dayjs().format("YYYY");
  $("#current-year").text(year);
});
