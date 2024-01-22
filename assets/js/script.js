// ---------- list of variables ----------
const youtubeAPIkey1 = "AIzaSyASRVTIz4SSVmUIFEnAiuaJqLwH8XwuyVg";
const youtubeAPIkey2 = "AIzaSyBxle4CUQQLstgRRUR5PaflgXcKff1tmI0";
const youtubeAPIkey3 = "AIzaSyCADYUZwbWtM8CDem8pnhmgeQzyc-f76Q8";
const bodyEl = $("body"); // body element
const headerEl = $("header"); // header element
const darkmodeBtnEl = $(".dark-mode-icon"); // both moon and sun icon
const resetBtnEl = $(".reset-icon"); // both black and white reset icon element
const sunBlackEl = $("#sun-black"); // sun icon
const moonWhiteEl = $("#moon-white"); // moon icon
const resetBlackEl = $("#reset-black"); // black reset icon
const resetWhiteEl = $("#reset-white"); // white reset icon
const cardElements = $(".card"); // all card elements
const inputContainerEl = $(".input-container"); // input container
const searchInputEl = $("#search-input"); // search input element
const searchBtnEl = $("#search-btn"); // search button element
const outerDropdownEl = $(".outer-dropdown"); // dropdown container
const innerDropdownEl = $(".inner-dropdown");
const contentContainerEl = $(".content-container"); // input container
const youtubeIframeContainer = $("#youtube-iframe"); // youtube container
const wikiContainer = $("#wiki-container"); // wiki container
const footerEl = $("footer"); // footer element
let searchQuery; // initialise search query
let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []; // initialise search history
let isDark = false; // boolean isDark (gets toggled)
let year = dayjs().format("YYYY"); // create year variable
$("#current-year").text(year); // parse year into footer

let youtubeApiKeyArr = [youtubeAPIkey1, youtubeAPIkey2, youtubeAPIkey3];
let keyIndex = 0;
// ---------- list of functions ----------
// to dark mode
function toDarkMode() {
  sunBlackEl.hide();
  resetBlackEl.hide();
  moonWhiteEl.show();
  resetWhiteEl.show();
  bodyEl.addClass("dark-body");
  headerEl.addClass("bg-dark text-light");
  headerEl.removeClass("border-bottom");
  cardElements.removeClass("bg-body-tertiary border-secondary-subtle");
  cardElements.addClass("bg-dark text-light border-dark-subtle");
  inputContainerEl.removeClass("bg-body-tertiary border-secondary-subtle");
  inputContainerEl.addClass("bg-dark border-dark-subtle");
  contentContainerEl.removeClass("bg-body-tertiary border-secondary-subtle");
  contentContainerEl.addClass("bg-dark text-light border-dark-subtle");
  footerEl.removeClass("border-top");
  footerEl.addClass("bg-dark text-light");
}
// to light mode
function toLightMode() {
  moonWhiteEl.hide();
  resetWhiteEl.hide();
  sunBlackEl.show();
  resetBlackEl.show();
  bodyEl.removeClass("dark-body");
  headerEl.removeClass("bg-dark text-light");
  headerEl.addClass("border-bottom");
  cardElements.removeClass("bg-dark text-light border-dark-subtle");
  cardElements.addClass("bg-body-tertiary border-secondary-subtle");
  inputContainerEl.removeClass("bg-dark border-dark-subtle");
  inputContainerEl.addClass("bg-body-tertiary border-secondary-subtle");
  contentContainerEl.removeClass("bg-dark text-light border-dark-subtle");
  contentContainerEl.addClass("bg-body-tertiary border-secondary-subtle");
  footerEl.removeClass("bg-dark text-light");
  footerEl.addClass("border-top");
}
// reset searh history
function resetSearchHistory() {
  searchHistory = [];
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  console.log("Search History:", searchHistory);
  console.log("Search History Reset!");
}
// search modal
function searchModal() {
  $("#searchModal").modal("show");
  // handle button clicks
  $("#okayBtn, #closeBtn").on("click", function () {
    $("#searchModal").modal("hide");
  });
}
// update search history (takes a callback)
function updateSearchHistory(query) {
  if (query && query.trim() !== "") {
    searchHistory.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    console.log("Search History:", searchHistory);
  }
}
// update dropdown
function updateDropdown() {
  updateSearchHistory(searchQuery);
  outerDropdownEl.empty();
  const startI = Math.max(searchHistory.length - 5, 0);
  for (let i = startI; i < searchHistory.length; i++) {
    const itemText = searchHistory[i];
    const newDropdownP = $("<p>").text(itemText).addClass("inner-dropdown");
    outerDropdownEl.prepend(newDropdownP);
  }
}
// wiki func
function wikiFunc(searchQuery) {
  function searchWiki() {
    // get wiki results
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

  // display wiki results
  function displayWikiResults(wikiResults) {
    wikiContainer.empty();
    $.each(wikiResults, function (index, result) {
      const wikiResultElement = $("<div>").addClass("wikiElContainer");
      wikiResultElement.html(
        `<h3>${result.title}</h3><p>${result.snippet}</p><a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank" class="btn btn-outline-success" role="button">Read More</a>`
      );
      wikiContainer.append(wikiResultElement);
    });
  }
  searchWiki();
}
// youtube func
function youtubeFunc(searchQuery) {
  // get youtube results
  function getYoutubeAPI(ytKey) {
    var youtubeQueryUrl = `https://www.googleapis.com/youtube/v3/search?key=${ytKey}&q=${searchQuery}`;
    fetch(youtubeQueryUrl)
      .then(function (response) {
        if (!response.ok && keyIndex < youtubeApiKeyArr.length) {
          keyIndex++;
          getYoutubeAPI(youtubeApiKeyArr[keyIndex]);
          console.log("hit");
          return;
        }
        return response.json();
      })
      .then(function (data) {
        console.log("Response data: ", data);
        if (data && data.items) {
          const getRandom = Math.floor(Math.random() * data.items.length);
          const randomVideo = data.items[getRandom];
          youtubeIFrame(randomVideo.id.videoId);
        }
      })

      .catch((error) => {
        console.error("API Error: ", error);
      });
  }

  // display youtube results
  function youtubeIFrame(vidID) {
    youtubeIframeContainer.empty();
    const youtubeResultElement = $("<div>").addClass("youtubeElContainer");
    youtubeResultElement.html(
      `<iframe
            class="youtube-video"
            src="https://www.youtube.com/embed/${vidID}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>`
    );
    youtubeIframeContainer.append(youtubeResultElement);
  }
  getYoutubeAPI(youtubeApiKeyArr[keyIndex]);
}
// search function
function searchFunc() {
  const searchQuery = searchInputEl.val();
  console.log(`User has inputted: ${searchQuery}`);
  if (searchQuery === "") {
    console.log("Empty String");
    searchModal();
  } else {
    wikiFunc(searchQuery);
    youtubeFunc(searchQuery);
    hideDropdown();
    updateDropdown(searchQuery);
    updateSearchHistory(searchQuery);
    console.log(`After search search history: ${searchHistory}`);
  }
}
// drop down show
function showDropdown() {
  outerDropdownEl.show();
}
// drop down hide
function hideDropdown() {
  outerDropdownEl.hide();
}

// ---------- list of events ----------
// on page load
$(document).ready(function () {
  $("#cookieModal").modal("show");
  // handle button clicks
  $("#okayBtn, #closeBtn").on("click", function () {
    $("#cookieModal").modal("hide");
  });
});
// on input click
searchInputEl.click(function () {
  console.log(`Input clicked`);
  updateDropdown();
  showDropdown();
});
// on click outside input or dropdown
$(document).on("click", function (event) {
  // Check if the clicked element is not the search input or the outer dropdown
  if (
    !searchInputEl.is(event.target) &&
    !outerDropdownEl.is(event.target) &&
    !darkmodeBtnEl.is(event.target) &&
    !resetBtnEl.is(event.target) &&
    outerDropdownEl.has(event.target).length === 0
  ) {
    hideDropdown();
  }
});
// on search btn click
searchBtnEl.click(function (event) {
  console.log(`Search button clicked`);
  event.preventDefault();
  searchFunc();
});
// on dropdown item click
outerDropdownEl.click(function (event) {
  const clickedDropdown = event.target.textContent;
  console.log(`Dropdown clicked: ${clickedDropdown}`);
  searchInputEl.val(clickedDropdown);
  searchFunc();
});
// on card click
cardElements.click(function () {
  const cardHeaderText = $(this).find("h3").text();
  console.log(`Card clicked: ${cardHeaderText}`);
  searchInputEl.val(cardHeaderText);
  searchFunc();
});
// dark mode btn click
darkmodeBtnEl.click(function () {
  console.log("dark mode btn clicked!");
  isDark = !isDark;
  if (isDark) {
    toDarkMode();
    console.log(`Dark mode on. isDark is ${isDark}`);
  } else {
    toLightMode();
    console.log(`Dark mode off. isDark is ${isDark}`);
  }
});
// reset btn click
resetBtnEl.click(function () {
  console.log("Reset button clicked!");
  resetSearchHistory();
});
