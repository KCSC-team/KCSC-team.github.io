import membersList from "../data/membersData.js";
var members = membersList();

const statusBar = document.querySelector(".status-container");
const statusBarOverlay = statusBar.querySelector(".content-nav-overlay");
const statusList = statusBar.querySelectorAll(".op-btn");
const categoryContainer = document.querySelector(".category-container");
const selecter = document.querySelector(".selected");
const selectorValue = selecter.querySelector("p");
const selecterBtn = selecter.querySelector("i");
const optionsList = categoryContainer.querySelector("ul");
const memberTeam = document.querySelector(".members-type-container");
const teamList = memberTeam.querySelectorAll(".op-btn");
const membersTeamOverlay = memberTeam.querySelector(".members-tab-overlay");
const yearList = categoryContainer.querySelectorAll("ul > li");
const memberContainer = document.querySelector(
  ".members-container-all .members-container"
);
const currentYear = new Date().getFullYear();
const App = {
  initState: false,
  init: {
    type: "ALL",
    year: 1,
    role: "",
  },
  categoryShow(info) {
    if (info) {
      let formData = {
        ...JSON.parse(localStorage.getItem("filters")),
        role: info,
      };
      localStorage.setItem("filters", JSON.stringify(formData));
    } else {
      let formData = {
        ...JSON.parse(localStorage.getItem("filters")),
        role: "CTFER",
      };
      localStorage.setItem("filters", JSON.stringify(formData));
    }

    memberTeam.style.display = "flex";
    selecter.classList.add("active");
    categoryContainer.classList.add("active");
    selecterBtn.style.transform = "rotate(90deg)";
  },
  categoryHidden() {
    selectorValue.innerText = "YEARS";
    let formData = {
      ...JSON.parse(localStorage.getItem("filters")),
      role: "",
      year: 1,
    };
    this.slideLeft(membersTeamOverlay);
    localStorage.setItem("filters", JSON.stringify(formData));
    memberTeam.style.display = "none";
    selecter.classList.remove("active");
    categoryContainer.classList.remove("active");
    selecterBtn.style.transform = "rotate(0)";
  },

  categoryActive() {
    selecter.classList.add("active");
    categoryContainer.classList.add("active");
    selecterBtn.style.transform = "rotate(90deg)";
  },
  categoryUnActive() {
    selecter.classList.remove("active");
    categoryContainer.classList.remove("active");
    selecterBtn.style.transform = "rotate(0deg)";
  },

  slideRight(e) {
    e.style.left = "50%";
  },

  slideLeft(e) {
    e.style.left = "0";
  },

  render({ type }) {
    if (type === "ALL") {
      members.forEach((item) => {});
    }
  },

  renderTemplate(item) {
    return `<div class="member" data-aos="fade-up">
              <div class="member-avt">
                <img src="${item.img}">
              </div>
              <div class="menber-info">
                <div class="name">${item.name}</div>
                <div class="role">${item.role}</div>
                <div class="member-slogan">
                  <p>${item.slogan}</p>
                </div>
              </div>
      </div>`;
  },
  renderAllMems() {
    return Array.from(members).map((item) => {
      return this.renderTemplate(item);
    });
  },

  renderCTF(year) {
    const _this = this;
    if (year != 1) {
      return members.reduce((array, item) => {
        let to;
        if (item.to != "") {
          to = "now" ? currentYear : parseInt(item.to);
        } else {
          to = 2021;
        }
        let from = parseInt(item.from);
        if (item.team === "CTF" && from <= year && year <= to) {
          array.push(_this.renderTemplate(item));
        }
        return array;
      }, []);
    } else {
      return members.reduce((array, item) => {
        if (item.team === "CTF") {
          array.push(_this.renderTemplate(item));
        }
        return array;
      }, []);
    }
  },

  renderMedia(year) {
    const _this = this;
    if (year != 1) {
      return members.reduce((array, item) => {
        let to;
        if (item.to != "") {
          to = "now" ? currentYear : parseInt(item.to);
        } else {
          to = 2021;
        }
        let from = parseInt(item.from);
        if (item.team === "Media" && from <= year && year <= to) {
          array.push(_this.renderTemplate(item));
        }
        return array;
      }, []);
    } else {
      return members.reduce((array, item) => {
        if (item.team === "Media") {
          array.push(_this.renderTemplate(item));
        }
        return array;
      }, []);
    }
  },

  refreshAOS() {
    setTimeout(() => {
      if (window.AOS) {
        window.AOS.refresh();
      }
    }, 100);
  },

  handleStatus() {
    statusList.forEach((item) => {
      item.onclick = () => {
        statusList.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        let formData = {
          ...JSON.parse(localStorage.getItem("filters")),
          type: item.innerText,
        };
        localStorage.setItem("filters", JSON.stringify(formData));
        if (item.innerText === "ALL") {
          memberContainer.innerHTML = this.renderAllMems().join("");
          this.slideLeft(statusBarOverlay);
          this.categoryHidden();
        } else {
          memberContainer.innerHTML = this.renderCTF(1).join("");
          this.categoryShow();
          this.slideRight(statusBarOverlay);
        }
        this.refreshAOS();
      };
    });
  },

  CustomRender() {
    const { type, year, role } = JSON.parse(localStorage.getItem("filters"));
    if (role === "CTFER") {
      memberContainer.innerHTML = this.renderCTF(year).join("");
    } else if (role === "MEDIA") {
      memberContainer.innerHTML = this.renderMedia(year).join("");
    }
    this.refreshAOS();
  },

  handleYearSelector() {
    yearList.forEach((item) => {
      item.onclick = () => {
        let value = item.querySelector("p").innerHTML;
        let formData = {
          ...JSON.parse(localStorage.getItem("filters")),
          year: parseInt(value),
        };
        localStorage.setItem("filters", JSON.stringify(formData));
        this.CustomRender();
        selectorValue.innerText = value;
        this.categoryUnActive();
      };
    });
  },

  handleType() {
    teamList.forEach((item) => {
      item.onclick = () => {
        teamList.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        if (item.innerText === "MEDIA") {
          memberContainer.innerHTML = App.renderMedia(1).join("");
          this.slideRight(membersTeamOverlay);
        } else {
          memberContainer.innerHTML = App.renderCTF(1).join("");
          this.slideLeft(membersTeamOverlay);
        }
        let formData = {
          ...JSON.parse(localStorage.getItem("filters")),
          role: item.innerText,
        };
        localStorage.setItem("filters", JSON.stringify(formData));
        this.CustomRender();
        
        
        
        
        
        
      };
    });
  },

  handleSelecter() {
    selecter.onclick = () => {
      selecter.classList.toggle("active");
      if (selecter.classList.contains("active")) {
        this.categoryActive();
      } else {
        this.categoryUnActive();
      }
    };
  },

  checkLocalStorage() {
    if (localStorage.getItem("filters")) {
    } else {
      localStorage.setItem("filters", JSON.stringify(this.init));
    }
    const { type, year, role } = JSON.parse(localStorage.getItem("filters"));
    if (type != "ALL") {
      this.slideRight(statusBarOverlay);
      if (role === "MEDIA") {
        this.categoryActive();
        this.categoryShow(role);
        this.slideRight(membersTeamOverlay);
        memberContainer.innerHTML = App.renderMedia(1).join("");
      } else if (role === "CTFER") {
        this.categoryActive();
        this.categoryShow(role);
        this.slideLeft(membersTeamOverlay);
        memberContainer.innerHTML = App.renderCTF(1).join("");
      }
    } else {
      memberContainer.innerHTML = App.renderAllMems().join("");
    }
  },
  start() {
    this.checkLocalStorage();
    App.handleStatus();
    App.handleSelecter();
    App.handleType();
    App.handleYearSelector();
    setTimeout(() => {
      if (window.AOS) {
        window.AOS.refresh();
      }
    }, 500);
  },
};

App.start();
window.onbeforeunload = () => {
  let init = {
    type: "ALL",
    year: 1,
    role: "",
  };
  localStorage.setItem("filters", JSON.stringify(init));
};
