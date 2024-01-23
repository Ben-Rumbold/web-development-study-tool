# Web-Development Study Tool


## Description

Our primary motivation was to provide an intuitive, visually clear and useful tool for students learning how to code. This project is created by eDX Bootcamp students hoping to improve the strenuous coding journey for current and future learners. To the best of our ability, we perfected a Website using YouTube and Wikipedia APIs, to supply users with sufficient information to their queries.
This journey taught us how to co-operate as a team and gave us the opportunity to understand the usage of GitHub in professional settings; especially branching. It also further developed our previous knowledge, learning from one another during pair programming practise and helped identify our individual strengths.

Programs: Visual Studio Code.
Languages: HTML5, CSS, JavaScript.
Frameworks: Bootstrap.
Libraries: jQuery.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Badges](#badges)
- [Tests](#tests)

## Installation

This is a freely accessible website to anyone possessing the link. 

## Usage

### Website UI:

![Open page view, desktop](/assets/images/open-page.jpg)
![Open page view, mobile](/assets/images/open-page-mobile-edit.jpg)

Engage with the website by exploring one of the four clickable cards, or find the answer to your specific questions using the search-bar.

![Search-bar results view, desktop](/assets/images/search-bar-results.jpg)
![Search-bar results view, mobile](/assets/images/search-bar-results-mobile-edit.jpg)

Although intended to be used for topics surrounding programming, the user can search anything!

![Webpage Showcase, desktop](/assets/images/Web%20Development%20Study%20Tool-showcase-GIF.gif)

## Credits

Ben Rumbold:
https://github.com/Ben-Rumbold

Adrian Tutuianu:
https://github.com/Adriantutuianu

Huseyin Altin:
https://github.com/6nhuseyin

Hannah Lassey:
https://github.com/HannahLas

Daria Sora:
https://github.com/DariaMS1

## License

MIT License

Copyright (c) 2024 Ben Rumbold

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Badges

![badmath](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![badmath](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![badmath](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![badmath](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![badmath](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)

## Tests

In order to test our website, click on: the sun and curved arrow symbols, the four cards (HTML, CSS, JavaScript, Frameworks), enter a query into the search bar, then click the resulting buttons underneath 'YouTube' and 'Wikipedia'.
Expected behaviour:
- Modals: when the website loads, a modal imitating cookie functions should appear. The user should have the options to click either 'Ok' or 'Cancel', both allowing you to navigate the webpage. Another modal will be present if the search input is activated when empty; this will tell the user an error occurred.

- Sun symbol: this is a button that toggles between 'light' and 'dark' theme displays; on click should change display colours.

- Curved arrow symbol: this button deletes the search-history list that appears when clicking inside the search-bar. The list should have functional buttons that search the website for the specific item when clicked. It displays the most recent searches at the top and does not repeat them in the list (re-searching items without emptying the search-history will not add or change the order of the list items).

- Cards: each card is a button that searches the specified content and displays them underneath the search-bar. The website has an animation function to pull you down to the results. These clicks will be stored and displayed in the history list.

- Search-bar: accepts any user input although undecipherable searches may result in: empty results, closest-relation results or uneven results (either API returns an outcome when the other doesn't). The animation function pulls you down to the results section, dependant on screen layout.

- Search-button: input should be pushed into the APIs either on the click of the search-button or at the press of the enter key.

- Wikipedia API: the articles returned should be relevant to the search input. The provided 'Read More' button should relocate the user to the intended article, on a separate tab, at the Wikipedia website.

- YouTube API: the videos returned from the API should be relevant to search input and the results should be randomised. When clicking inside the video frame, the video should start and pause with no errors. Due to the randomised function of the API, sometimes it returns unavailable videos (this is the only error that should occur when searching or playing the video). The video should play on the hosted website and not relocate the user to YouTube itself.

- Display animation: when search input goes through, attached to the joint Wikipedia and YouTube portion, an expansion should occur which displays the user's query.