import membersList from "../data/membersData.js";
var members = membersList();

const statusBar = document.querySelector(".status-container");
const statusBarOverlay = statusBar.querySelector(".content-nav-overlay");
const statusList = statusBar.querySelectorAll(".op-btn");

const memberTeam = document.querySelector(".members-type-container");
const teamList = memberTeam.querySelectorAll(".op-btn");
const membersTeamOverlay = memberTeam.querySelector(".members-tab-overlay");

const categoryContainer = document.querySelector(".category-container");
const selecter = document.querySelector(".selected");
const selectorValue = selecter.querySelector("p");
const genList = categoryContainer.querySelectorAll("ul > li");

const memberContainer = document.querySelector(
  ".members-container-all .members-container"
);

const App = {
  init: {
    status: "ADVISOR",
    role: "All",
    gen: "Gen",
  },

  slideRight(e) {
    e.style.left = "50%";
  },

  slideLeft(e) {
    e.style.left = "0";
  },

  showFilters() {
    memberTeam.style.display = "flex";
    categoryContainer.style.display = "block";
  },

  hideFilters() {
    memberTeam.style.display = "none";
    categoryContainer.style.display = "none";
  },

  renderTemplate(item) {
    return `<div class="member" data-aos="fade-up">
              <div class="member-avt">
                <img src="${item.img}" onerror="this.src='/asset/img/members/default.png'">
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

  render() {
    const filters = JSON.parse(localStorage.getItem("filters")) || this.init;
    let filteredMembers = [];

    if (filters.status === "ADVISOR") {
      filteredMembers = members.filter((m) => m.team === "Advisor");
    } else if (filters.status === "FOUNDER") {
      filteredMembers = members.filter((m) => m.team === "Founder");
    } else {
      filteredMembers = members.filter((m) => {
        if (m.team === "Advisor") return false;
        if (m.team === "Founder") return false;
        const isGenMatch = filters.gen === "Gen" || m.gen == filters.gen;

        let isRoleMatch = false;
        if (filters.role === "All") {
          isRoleMatch = true;
        } else if (filters.role === "CTFER") {
          isRoleMatch =
            m.team === "CTF" ||
            m.team === "KCSC" ||
            (m.team === "Former" && !m.role.toLowerCase().includes("media"));
        } else if (filters.role === "MEDIA") {
          isRoleMatch =
            m.team === "Media" ||
            (m.team === "Former" && m.role.toLowerCase().includes("media"));
        }

        return isGenMatch && isRoleMatch;
      });
    }

    memberContainer.innerHTML = filteredMembers
      .map((m) => this.renderTemplate(m))
      .join("");
    this.refreshAOS();
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
        statusList.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        const status = item.innerText;

        let formData = JSON.parse(localStorage.getItem("filters")) || this.init;

        if (status === "ADVISOR" || status === "FOUNDER") {
          this.hideFilters();
        } else {
          this.showFilters();
          formData.gen = "Gen";
          selectorValue.innerText = "Gen";
          
          formData.role = "All";
          teamList.forEach(btn => btn.classList.remove('active'));
          if (membersTeamOverlay) membersTeamOverlay.style.opacity = '0';
        }

        formData.status = status;
        localStorage.setItem("filters", JSON.stringify(formData));

        this.render();
      };
    });
  },

  handleType() {
    teamList.forEach((item) => {
      item.onclick = () => {
        teamList.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        if (membersTeamOverlay) membersTeamOverlay.style.opacity = '1';

        const role = item.innerText;

        let formData = JSON.parse(localStorage.getItem("filters")) || this.init;
        formData.role = role;
        localStorage.setItem("filters", JSON.stringify(formData));

        this.render();
      };
    });
  },

  handleGenSelector() {
    genList.forEach((item) => {
      item.onclick = () => {
        const gen = item.querySelector("p").innerText;
        selectorValue.innerText = gen;

        let formData = JSON.parse(localStorage.getItem("filters")) || this.init;
        formData.gen = gen;
        localStorage.setItem("filters", JSON.stringify(formData));

        this.render();
        categoryContainer.classList.remove("active");
      };
    });
  },

  handleSelecter() {
    selecter.onclick = () => {
      categoryContainer.classList.toggle("active");
    };
  },

  start() {
    localStorage.setItem("filters", JSON.stringify(this.init));
    let filters = this.init;

    statusList.forEach((btn) => {
      if (btn.innerText === filters.status) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (filters.status === "ADVISOR" || filters.status === "FOUNDER") {
      this.hideFilters();
    } else {
      this.showFilters();

      teamList.forEach((btn) => {
        if (btn.innerText === filters.role) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      if (filters.role === "All") {
        if (membersTeamOverlay) membersTeamOverlay.style.opacity = '0';
      } else {
        if (membersTeamOverlay) membersTeamOverlay.style.opacity = '1';
      }

      selectorValue.innerText = filters.gen;
    }

    this.handleStatus();
    this.handleType();
    this.handleGenSelector();
    this.handleSelecter();
    this.render();
  },
};

App.start();

