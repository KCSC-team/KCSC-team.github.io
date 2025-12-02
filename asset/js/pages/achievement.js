import list from "../data/achievementList.js";

const achievementList = list();
const root = document.querySelector(".container");

const rendering = () => {
  var container = achievementList.map((item) => {
    return `<div class='prize-tag'>
            <h2>
                ${item.year}
            </h2>
            <div class="prize-list">
                  
            </div>
        </div>`;
  });
  root.innerHTML = container.join("");

  var container = achievementList.forEach((item, index) => {
    var html = Array.from(item.info).map((curr) => {
      return `<div class="prize-item">
            <div class="p-container">
                <img src=${curr.link} alt="${curr.name}">
                <div class="info">
                    <h3 class="title">
                        ${curr.name}
                    </h3>
                    <div class="content">
                        ${curr.award}
                    </div>
                </div>
            </div>
        </div>`;
    });
    document.querySelectorAll(".prize-list")[index].innerHTML = html.join("");
  });
};

rendering();

