var APIkey = "AIzaSyASRVTIz4SSVmUIFEnAiuaJqLwH8XwuyVg"; //Youtube API
console.log("Api key Youtube", APIkey);
var searchInput = $("#search-input"); //search button
const searchQuery = "cat videos";

var QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${APIkey}&q=${searchQuery}`;

fetch(QUERY_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // Parse the response and retrieve the titles of the videos
    data.items.forEach((item) => {
      const videoTitle = item.id.videoId;
      console.log(videoTitle);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function youtubePrint() {
  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: "M7lc1UVf-VE",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var done = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
      setTimeout(stopVideo, 6000);
      done = true;
    }
  }
  function stopVideo() {
    player.stopVideo();
  }
}
