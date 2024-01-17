const APIkey = "AIzaSyASRVTIz4SSVmUIFEnAiuaJqLwH8XwuyVg"; //Youtube API
console.log("Api key Youtube", APIkey);
const searchInput = $("#search-input"); //search button
const searchQuery = searchInput.val();
const iframeContainer = $("#testing-video-iframe");

var QUERY_URL = `https://www.googleapis.com/youtube/v3/search?key=${APIkey}&q=${searchQuery}`;

fetch(QUERY_URL)
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

function youtubeIFrame(vidID) {
  const iframe = `<iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${vidID}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>`;

  iframeContainer.append(iframe);
}
